// Configuration
const GOOGLE_SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1';
const CURRENT_LOCATION_ID = 1; // Update this as you move through locations
const PLAYER_NUMBER = 1; // 1 or 2

// Function to write guess to Google Sheet
async function submitGuessToSheet(latitude, longitude) {
    // Using Google Apps Script Web App as intermediary
    // (Set up in step 3 below)
    
    const payload = {
        locationId: CURRENT_LOCATION_ID,
        playerNumber: PLAYER_NUMBER,
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch(
            'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent',
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        );
        console.log('Guess submitted:', payload);
    } catch (error) {
        console.error('Error submitting guess:', error);
    }
}

// Add click handler to your map
map.on('click', async function(event) {
    const lat = event.mapPoint.latitude;
    const lon = event.mapPoint.longitude;
    
    // Add waypoint to player's map
    addWaypoint(lat, lon);
    
    // Submit to sheet
    await submitGuessToSheet(lat, lon);
});

function addWaypoint(lat, lon) {
    const graphic = new esri.Graphic({
        geometry: new esri.Point({
            longitude: lon,
            latitude: lat
        }),
        symbol: {
            type: "simple-marker",
            color: [226, 119, 40],
            size: "12px"
        }
    });
    
    map.graphics.add(graphic);
}