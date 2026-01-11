import ee
import os
import json

# Initialize Earth Engine
service_account_info = json.loads(os.environ["EE_SERVICE_ACCOUNT_KEY"])

credentials = ee.ServiceAccountCredentials(
    service_account_info["client_email"],
    key_data=json.dumps(service_account_info)
)

ee.Initialize(credentials)


def calculate_ndvi(polygon):
    geometry = ee.Geometry.Polygon(polygon)

    # ✅ USE HARMONIZED DATASET (FIXES BAND MISMATCH)
    collection = (
        ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(geometry)
        .filterDate("2024-01-01", "2024-12-31")
        .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 15))
        # ✅ FORCE HOMOGENEOUS BANDS
        .select(["B4", "B8"])
    )

    # If no images, return 0
    if collection.size().getInfo() == 0:
        return 0.0

    image = collection.median()

    # NDVI
    ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")
    ndvi = ndvi.updateMask(ndvi.gt(0.3))

    stats = ndvi.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=10,
        maxPixels=1e9
    )

    ndvi_value = stats.get("NDVI")

    if ndvi_value is None:
        return 0.0


    return float(ndvi_value.getInfo())

def get_time_series_ndvi(polygon):
    geometry = ee.Geometry.Polygon(polygon)
    current_year = 2024 # Fixed for prototype consistency or use dynamic
    
    months = range(1, 13)
    time_series = []

    for month in months:
        start_date = f"{current_year}-{month:02d}-01"
        if month == 12:
            end_date = f"{current_year + 1}-01-01"
        else:
            end_date = f"{current_year}-{month + 1:02d}-01"
            
        collection = (
            ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
            .filterBounds(geometry)
            .filterDate(start_date, end_date)
            .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
            .select(["B4", "B8"])
        )
        
        if collection.size().getInfo() > 0:
            image = collection.median()
            ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")
            ndvi = ndvi.updateMask(ndvi.gt(0.1)) # Lower threshold for trends
            
            stats = ndvi.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=geometry,
                scale=20, # Coarser scale for speed
                maxPixels=1e9
            )
            val = stats.get("NDVI").getInfo()
            if val:
                 time_series.append({"month": f"{current_year}-{month:02d}", "ndvi": float(val)})
            else:
                 time_series.append({"month": f"{current_year}-{month:02d}", "ndvi": 0.0})
        else:
            time_series.append({"month": f"{current_year}-{month:02d}", "ndvi": 0.0})
            
    return time_series
