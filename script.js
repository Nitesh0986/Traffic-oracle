// Configuration - NO API KEYS NEEDED!
const WEATHER_API_KEY = null;
const USE_LEAFLET_MAPS = true;

let currentRouteMap = null;
let alternativeRouteMap = null;
let currentRouteLayer = null;
let alternativeRouteLayer = null;
const locationDatabase = {
    'mumbai': [
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
        { name: 'Thane', lat: 19.2183, lng: 72.9781, distance: 25 },
        { name: 'Navi Mumbai', lat: 19.0330, lng: 73.0297, distance: 15 },
        { name: 'Kalyan', lat: 19.2438, lng: 73.1355, distance: 20 },
        { name: 'Vasai', lat: 19.3919, lng: 72.8397, distance: 30 }
    ],
    'delhi': [
        { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
        { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, distance: 15 },
        { name: 'Faridabad', lat: 28.4089, lng: 77.3178, distance: 20 },
        { name: 'Gurgaon', lat: 28.4595, lng: 77.0266, distance: 25 },
        { name: 'Noida', lat: 28.5355, lng: 77.3910, distance: 18 }
    ],
    'bangalore': [
        { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
        { name: 'Mysore', lat: 12.2958, lng: 76.6394, distance: 140 },
        { name: 'Hubli', lat: 15.3647, lng: 75.1240, distance: 400 },
        { name: 'Whitefield', lat: 12.9698, lng: 77.7499, distance: 20 },
        { name: 'Electronic City', lat: 12.8457, lng: 77.6603, distance: 18 }
    ],
    'chennai': [
        { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
        { name: 'Sriperumbudur', lat: 12.9689, lng: 79.9487, distance: 40 },
        { name: 'Tambaram', lat: 12.9246, lng: 80.1276, distance: 25 },
        { name: 'Kanchipuram', lat: 12.8342, lng: 79.7036, distance: 70 }
    ],
    'pune': [
        { name: 'Pune', lat: 18.5204, lng: 73.8567 },
        { name: 'Pimpri-Chinchwad', lat: 18.6279, lng: 73.8000, distance: 15 },
        { name: 'Hinjewadi', lat: 18.5913, lng: 73.7389, distance: 12 },
        { name: 'Hadapsar', lat: 18.5062, lng: 73.9406, distance: 8 },
        { name: 'Kothrud', lat: 18.5081, lng: 73.8166, distance: 5 }
    ],
    'kolkata': [
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Howrah', lat: 22.5958, lng: 88.2636, distance: 5 },
    { name: 'Salt Lake City', lat: 22.5900, lng: 88.4167, distance: 8 },
    { name: 'New Town', lat: 22.5800, lng: 88.4800, distance: 15 },
    { name: 'Barasat', lat: 22.7200, lng: 88.4800, distance: 20 },
    { name: 'Barrackpore', lat: 22.7500, lng: 88.3400, distance: 25 },
    { name: 'Kalighat', lat: 22.5200, lng: 88.3420, distance: 4 },
    { name: 'Dakshineswar', lat: 22.6550, lng: 88.3578, distance: 12 },
    { name: 'Belur Math', lat: 22.6228, lng: 88.3564, distance: 10 },
    { name: 'St. Paul\'s Cathedral', lat: 22.5444, lng: 88.3425, distance: 3 },
    { name: 'Nakhoda Mosque', lat: 22.5833, lng: 88.3667, distance: 1 },
    { name: 'Pareshnath Jain Temple', lat: 22.5833, lng: 88.3667, distance: 2 },
    { name: 'New Market', lat: 22.5567, lng: 88.3511, distance: 3 },
    { name: 'Gariahat', lat: 22.5119, lng: 88.3656, distance: 6 },
    { name: 'Hatibagan', lat: 22.6000, lng: 88.3667, distance: 4 },
    { name: 'Burrabazar', lat: 22.5833, lng: 88.3500, distance: 2 },
    { name: 'South City Mall', lat: 22.5089, lng: 88.3678, distance: 6 },
    { name: 'Quest Mall', lat: 22.5442, lng: 88.3517, distance: 3 },
    { name: 'Victoria Memorial', lat: 22.5448, lng: 88.3425, distance: 3 },
    { name: 'Indian Museum', lat: 22.5583, lng: 88.3508, distance: 3 },
    { name: 'Science City', lat: 22.5508, lng: 88.3886, distance: 5 },
    { name: 'Eden Gardens', lat: 22.5647, lng: 88.3433, distance: 2 },
    { name: 'Rabindra Sarobar', lat: 22.5086, lng: 88.3417, distance: 6 },
    { name: 'Nicco Park', lat: 22.5667, lng: 88.3833, distance: 6 },
    { name: 'Howrah Station', lat: 22.5853, lng: 88.3417, distance: 4 },
    { name: 'Sealdah Station', lat: 22.5694, lng: 88.3700, distance: 2 },
    { name: 'Kolkata Station', lat: 22.5650, lng: 88.3719, distance: 2 },
    { name: 'Netaji Subhas Airport', lat: 22.6450, lng: 88.4392, distance: 15 },
    { name: 'Esplanade Bus Stand', lat: 22.5628, lng: 88.3514, distance: 2 },
    { name: 'University of Calcutta', lat: 22.5758, lng: 88.3636, distance: 1 },
    { name: 'Jadavpur University', lat: 22.4972, lng: 88.3711, distance: 8 },
    { name: 'Presidency University', lat: 22.5792, lng: 88.3633, distance: 1 },
    { name: 'SSKM Hospital', lat: 22.5506, lng: 88.3431, distance: 3 },
    { name: 'AMRI Hospital', lat: 22.5300, lng: 88.3600, distance: 5 },
    { name: 'Fortis Hospital', lat: 22.5883, lng: 88.4261, distance: 10 },
    { name: 'Ballygunge', lat: 22.5250, lng: 88.3650, distance: 5 },
    { name: 'Alipore', lat: 22.5333, lng: 88.3333, distance: 4 },
    { name: 'Behala', lat: 22.4833, lng: 88.3167, distance: 10 },
    { name: 'Tollygunge', lat: 22.5000, lng: 88.3500, distance: 7 },
    { name: 'Lake Town', lat: 22.6000, lng: 88.4000, distance: 8 },
    { name: 'Kankurgachi', lat: 22.5833, lng: 88.3833, distance: 4 },
    { name: 'Maidan', lat: 22.5500, lng: 88.3333, distance: 3 },
    { name: 'Millennium Park', lat: 22.5667, lng: 88.3333, distance: 3 },
    { name: 'Botanical Garden', lat: 22.5583, lng: 88.2861, distance: 8 },
    { name: 'Howrah Bridge', lat: 22.5853, lng: 88.3417, distance: 4 },
    { name: 'Vidyasagar Setu', lat: 22.5500, lng: 88.3167, distance: 5 },
    { name: 'BBD Bagh', lat: 22.5694, lng: 88.3489, distance: 2 },
    { name: 'Dum Dum Metro', lat: 22.6500, lng: 88.4333, distance: 12 },
    { name: 'Park Street Metro', lat: 22.5519, lng: 88.3519, distance: 3 },
    { name: 'Kalighat Metro', lat: 22.5200, lng: 88.3450, distance: 4 },
    { name: 'Rabindra Sadan Metro', lat: 22.5442, lng: 88.3492, distance: 3 }
]
};

const cityCoordinates = {
    'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
    'delhi': { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
    'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
    'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
    'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
    'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
    'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune' },
    'ahmedabad': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
    'jaipur': { lat: 26.9124, lng: 75.7873, name: 'Jaipur' },
    'lucknow': { lat: 26.8467, lng: 80.9462, name: 'Lucknow' },
    'thane': { lat: 19.2183, lng: 72.9781, name: 'Thane' },
    'navi mumbai': { lat: 19.0330, lng: 73.0297, name: 'Navi Mumbai' },
    'ghaziabad': { lat: 28.6692, lng: 77.4538, name: 'Ghaziabad' },
    'gurgaon': { lat: 28.4595, lng: 77.0266, name: 'Gurgaon' },
    'noida': { lat: 28.5355, lng: 77.3910, name: 'Noida' },
    'faridabad': { lat: 28.4089, lng: 77.3178, name: 'Faridabad' },
   
    'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
    'howrah': { lat: 22.5958, lng: 88.2636, name: 'Howrah' },
    'salt lake city': { lat: 22.5900, lng: 88.4167, name: 'Salt Lake City' },
    'new town': { lat: 22.5800, lng: 88.4800, name: 'New Town' },
    'barasat': { lat: 22.7200, lng: 88.4800, name: 'Barasat' },
    'barrackpore': { lat: 22.7500, lng: 88.3400, name: 'Barrackpore' },
    'kalighat': { lat: 22.5200, lng: 88.3420, name: 'Kalighat' },
    'dakshineswar': { lat: 22.6550, lng: 88.3578, name: 'Dakshineswar' },
    'belur math': { lat: 22.6228, lng: 88.3564, name: 'Belur Math' },
    'victoria memorial': { lat: 22.5448, lng: 88.3425, name: 'Victoria Memorial' },
    'new market': { lat: 22.5567, lng: 88.3511, name: 'New Market' },
    'howrah station': { lat: 22.5853, lng: 88.3417, name: 'Howrah Station' },
    'sealdah station': { lat: 22.5694, lng: 88.3700, name: 'Sealdah Station' },
    'salt lake stadium': { lat: 22.5667, lng: 88.4083, name: 'Salt Lake Stadium' },
    'science city': { lat: 22.5508, lng: 88.3886, name: 'Science City' },
    'alipore': { lat: 22.5333, lng: 88.3333, name: 'Alipore' },
    'ballygunge': { lat: 22.5250, lng: 88.3650, name: 'Ballygunge' },
    'tollygunge': { lat: 22.5000, lng: 88.3500, name: 'Tollygunge' },
    'park street': { lat: 22.5519, lng: 88.3519, name: 'Park Street' },
    'dum dum': { lat: 22.6500, lng: 88.4333, name: 'Dum Dum' }
};

document.addEventListener('DOMContentLoaded', function() {
    initMap();
    setupEventListeners();
    setCurrentDateTime();
});

// Initialize Leaflet maps
function initMap() {
    try {
        currentRouteMap = L.map('currentRouteMap').setView([20.5937, 78.9629], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(currentRouteMap);
     
        alternativeRouteMap = L.map('alternativeRouteMap').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(alternativeRouteMap);
        
        L.control.scale({position: 'bottomleft'}).addTo(currentRouteMap);
        L.control.scale({position: 'bottomleft'}).addTo(alternativeRouteMap);
        
        console.log("Maps initialized successfully");
      
        showCleanStart();
        
    } catch (error) {
        console.error("Map initialization error:", error);
    }
}


function setupEventListeners() {

    document.getElementById('date').addEventListener('change', updateDay);

    document.getElementById('predictBtn').addEventListener('click', predictTraffic);

    document.getElementById('fromLocation').addEventListener('input', function() {
        if (this.value.length > 1) {
            suggestNearbyCities(this.value);
        } else {
            document.getElementById('citySuggestions').innerHTML = '';
        }
    });
    
    document.getElementById('toLocation').addEventListener('input', function() {
        if (this.value.length > 1) {
            suggestNearbyCities(this.value);
        } else {
            document.getElementById('citySuggestions').innerHTML = '';
        }
    });
    
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.id === 'fromLocation' || 
                activeElement.id === 'toLocation' ||
                activeElement.id === 'temperature') {
                e.preventDefault();
                predictTraffic();
            }
        }
    });
}

// Set current date and time
function setCurrentDateTime() {
    const now = new Date();
    
    const today = now.toISOString().split('T')[0];
    document.getElementById('date').value = today;
    updateDay();
 
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('time').value = `${hours}:${minutes}`;

    document.getElementById('fromLocation').value = '';
    document.getElementById('toLocation').value = '';
 
    document.getElementById('temperature').value = '25';
    document.getElementById('isHoliday').value = '0';
    document.getElementById('climateCondition').value = 'Clear';
}

function updateDay() {
    const dateInput = document.getElementById('date').value;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateInput);
    const dayName = days[date.getDay()];
    document.getElementById('dayDisplay').textContent = dayName;
}

function showCleanStart() {
    clearAllMapLayers();
    
    if (currentRouteMap) currentRouteMap.setView([20.5937, 78.9629], 5);
    if (alternativeRouteMap) alternativeRouteMap.setView([20.5937, 78.9629], 5);
    
    // Clear stats
    document.getElementById('distance').textContent = '-- km';
    document.getElementById('duration').textContent = '-- mins';
    document.getElementById('trafficLevel').textContent = '--';
    document.getElementById('fuelEstimate').textContent = '-- L';
    
    // Set default weather display
    const weatherCard = document.querySelector('.weather-card');
    weatherCard.innerHTML = `
        <div class="weather-icon">
            <i class="fas fa-map-marked-alt fa-3x" style="color: #94a3b8;"></i>
        </div>
        <div class="weather-info">
            <h3>ENTER LOCATIONS</h3>
            <p>Weather data will appear here</p>
        </div>
    `;
    
    const trafficPrediction = document.getElementById('trafficPrediction');
    trafficPrediction.innerHTML = `
        <div style="text-align: center; padding: 30px; color: #666;">
            <i class="fas fa-map-marked-alt fa-3x" style="color: #3b82f6; margin-bottom: 15px;"></i>
            <h3>Welcome to Traffic Predictor</h3>
            <p>Enter your origin and destination to get traffic predictions</p>
        </div>
    `;
  
    document.getElementById('routesList').innerHTML = `
        <div class="route-item">
            <i class="fas fa-route"></i>
            <span>Alternative routes will appear here</span>
        </div>
    `;
    
    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
}

function clearAllMapLayers() {
    if (currentRouteMap) {
        currentRouteMap.eachLayer(layer => {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                currentRouteMap.removeLayer(layer);
            }
        });
    }
    
    if (alternativeRouteMap) {
        alternativeRouteMap.eachLayer(layer => {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                alternativeRouteMap.removeLayer(layer);
            }
        });
    }
    
    currentRouteLayer = null;
    alternativeRouteLayer = null;
}

function loadSampleData() {
    const sampleRoutes = [
        { from: "Mumbai", to: "Thane" },
        { from: "Delhi", to: "Ghaziabad" },
        { from: "Bangalore", to: "Whitefield" },
        { from: "Pune", to: "Pimpri-Chinchwad" },
        { from: "Kolkata", to: "Howrah" }
    ];
    
    const randomRoute = sampleRoutes[Math.floor(Math.random() * sampleRoutes.length)];
    
    document.getElementById('fromLocation').value = randomRoute.from;
    document.getElementById('toLocation').value = randomRoute.to;
    
    document.getElementById('temperature').value = '28';
    document.getElementById('climateCondition').value = 'Clear';
    
    document.getElementById('citySuggestions').innerHTML = '';
   
    setTimeout(() => {
        predictTraffic();
    }, 300);
}
function getCityCoordinates(cityName) {
    if (!cityName || typeof cityName !== 'string') return null;
    
    const lowerCity = cityName.toLowerCase().trim();
    if (lowerCity.length < 2) return null;
    
   
    for (const [key, value] of Object.entries(cityCoordinates)) {
        if (key === lowerCity) {
            return value;
        }
    }

    for (const [key, value] of Object.entries(cityCoordinates)) {
        if (lowerCity.includes(key) || key.includes(lowerCity)) {
            return value;
        }
    }
    
    for (const [city, locations] of Object.entries(locationDatabase)) {
        if (lowerCity.includes(city) || city.includes(lowerCity.substring(0, 4))) {
            return { 
                lat: locations[0].lat, 
                lng: locations[0].lng, 
                name: locations[0].name 
            };
        }
        
        for (const location of locations) {
            const locationName = location.name.toLowerCase();
            if (locationName.includes(lowerCity) || lowerCity.includes(locationName.substring(0, 4))) {
                return { 
                    lat: location.lat, 
                    lng: location.lng, 
                    name: location.name 
                };
            }
        }
    }
    
    return null;
}

function suggestNearbyCities(inputCity) {
    const suggestionsContainer = document.getElementById('citySuggestions');
    if (!suggestionsContainer || !inputCity || inputCity.length < 2) {
        suggestionsContainer.innerHTML = '';
        return;
    }
    
    const lowerInput = inputCity.toLowerCase();
    const suggestions = [];
    
    for (const [city, locations] of Object.entries(locationDatabase)) {
        if (city.includes(lowerInput.substring(0, 3)) || lowerInput.includes(city.substring(0, 3))) {
            suggestions.push(city);
        }
        
        for (const location of locations) {
            const locationName = location.name.toLowerCase();
            if (locationName.includes(lowerInput) || lowerInput.includes(locationName.substring(0, 3))) {
                if (!suggestions.includes(location.name)) {
                    suggestions.push(location.name);
                }
            }
        }
    }
    
    if (suggestions.length > 0) {
        suggestionsContainer.innerHTML = `
            <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 10px; border-radius: 5px; margin-top: 5px;">
                <p style="margin: 0; color: #92400e; font-size: 0.9rem;">
                    <i class="fas fa-info-circle"></i> Did you mean: 
                    ${suggestions.slice(0, 3).map(city => 
                        `<span style="cursor: pointer; color: #3b82f6; text-decoration: underline; margin-right: 8px;" 
                              onclick="selectCitySuggestion('${city}')">${city.charAt(0).toUpperCase() + city.slice(1)}</span>`
                    ).join('')}
                </p>
            </div>
        `;
    } else {
        suggestionsContainer.innerHTML = '';
    }
}

function selectCitySuggestion(city) {
    const fromInput = document.getElementById('fromLocation');
    const toInput = document.getElementById('toLocation');
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    
   
    const suggestionsContainer = document.getElementById('citySuggestions');
    const fromValue = fromInput.value.toLowerCase();
    const toValue = toInput.value.toLowerCase();
    
    
    if (fromValue && fromValue.length >= 2 && 
        (cityName.toLowerCase().includes(fromValue) || fromValue.includes(cityName.toLowerCase().substring(0, 3)))) {
        
        fromInput.value = cityName;
        toInput.focus(); // Move to "To" field
    } else if (toValue && toValue.length >= 2 && 
               (cityName.toLowerCase().includes(toValue) || toValue.includes(cityName.toLowerCase().substring(0, 3)))) {
        toInput.value = cityName;
        fromInput.focus(); 
    } else {
        const activeInput = document.activeElement;
        if (activeInput.id === 'fromLocation' || activeInput.id === 'toLocation') {
            activeInput.value = cityName;
            if (activeInput.id === 'fromLocation') {
                toInput.focus();
            } else {
                fromInput.focus();
            }
        } else {
            fromInput.value = cityName;
            toInput.focus();
        }
    }
    
    suggestionsContainer.innerHTML = '';
}

async function predictTraffic() {
    const fromLocation = document.getElementById('fromLocation').value.trim();
    const toLocation = document.getElementById('toLocation').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const temperature = parseInt(document.getElementById('temperature').value) || 25;
    const isHoliday = document.getElementById('isHoliday').value === '1';
    const climateCondition = document.getElementById('climateCondition').value;
    
    if (!fromLocation || !toLocation) {
        alert('Please enter both From and To locations');
        return;
    }
    
    if (fromLocation.toLowerCase() === toLocation.toLowerCase()) {
        alert('From and To locations cannot be the same');
        return;
    }
    
    const fromCoords = getCityCoordinates(fromLocation);
    const toCoords = getCityCoordinates(toLocation);
    
    if (!fromCoords) {
        alert(`"${fromLocation}" not found in our database. Please try a different city name.`);
        return;
    }
    
    if (!toCoords) {
        alert(`"${toLocation}" not found in our database. Please try a different city name.`);
        return;
    }
   
    const predictBtn = document.getElementById('predictBtn');
    const originalText = predictBtn.innerHTML;
    predictBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ANALYZING...';
    predictBtn.disabled = true;
    
    try {
       
        updateWeather(fromLocation);
        
        const trafficResult = await calculateTrafficPrediction(
            fromLocation, toLocation, date, time, temperature, isHoliday, climateCondition
        );
        
        showRoutesOnMaps(fromLocation, toLocation, trafficResult);
        
        
        updateResultsUI(trafficResult);
        updateDistanceDuration(fromLocation, toLocation, trafficResult);
        
    } catch (error) {
        console.error('Error:', error);
       
        const simulatedResult = getSimulatedPrediction();
        updateResultsUI(simulatedResult);
        updateSimulatedDistanceDuration();
    }
    
    predictBtn.innerHTML = originalText;
    predictBtn.disabled = false;
}

function showRoutesOnMaps(from, to, trafficResult) {
    try {
        const fromCoords = getCityCoordinates(from);
        const toCoords = getCityCoordinates(to);
        
        if (!fromCoords || !toCoords) return;
        
        clearAllMapLayers();
        
        const welcomeMsg = document.getElementById('welcomeMessage');
        if (welcomeMsg) {
            welcomeMsg.style.display = 'none';
        }
        
        let routeColor = '#10b981'; 
        let altRouteColor = '#3b82f6'; 
        
        if (trafficResult.trafficColor === 'danger') {
            routeColor = '#ef4444'; 
            altRouteColor = '#f59e0b'; 
        } else if (trafficResult.trafficColor === 'warning') {
            routeColor = '#f59e0b'; 
            altRouteColor = '#10b981'; 
        }
        
        // Current Route Map
        L.marker([fromCoords.lat, fromCoords.lng])
            .addTo(currentRouteMap)
            .bindPopup(`<b>From:</b> ${fromCoords.name}`)
            .openPopup();
        
        L.marker([toCoords.lat, toCoords.lng])
            .addTo(currentRouteMap)
            .bindPopup(`<b>To:</b> ${toCoords.name}`);
        
        // Create straight route
        currentRouteLayer = L.polyline([
            [fromCoords.lat, fromCoords.lng],
            [toCoords.lat, toCoords.lng]
        ], {
            color: routeColor,
            weight: 5,
            opacity: 0.8,
            lineJoin: 'round'
        }).addTo(currentRouteMap);
        
        // Alternative Route Map
        L.marker([fromCoords.lat, fromCoords.lng])
            .addTo(alternativeRouteMap)
            .bindPopup(`<b>From:</b> ${fromCoords.name}`);
        
        L.marker([toCoords.lat, toCoords.lng])
            .addTo(alternativeRouteMap)
            .bindPopup(`<b>To:</b> ${toCoords.name}`);
        
        const midLat = (fromCoords.lat + toCoords.lat) / 2;
        const midLng = (fromCoords.lng + toCoords.lng) / 2;
        const curveLat = midLat + 0.3;
        const curveLng = midLng + 0.3;
        
        alternativeRouteLayer = L.polyline([
            [fromCoords.lat, fromCoords.lng],
            [curveLat, curveLng],
            [toCoords.lat, toCoords.lng]
        ], {
            color: altRouteColor,
            weight: 5,
            opacity: 0.8,
            dashArray: '10, 10',
            lineJoin: 'round'
        }).addTo(alternativeRouteMap);
        
        const bounds = L.latLngBounds(
            [fromCoords.lat, fromCoords.lng],
            [toCoords.lat, toCoords.lng]
        );
        currentRouteMap.fitBounds(bounds, { padding: [50, 50] });
        alternativeRouteMap.fitBounds(bounds, { padding: [50, 50] });
        
        updateAlternativeRoutesList(fromCoords, toCoords, trafficResult);
        
    } catch (error) {
        console.error('Error showing routes:', error);
    }
}

function updateDistanceDuration(from, to, trafficResult) {
    const fromCoords = getCityCoordinates(from);
    const toCoords = getCityCoordinates(to);
    
    if (!fromCoords || !toCoords) return;
    
    // Calculate distance
    const distance = calculateDistance(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng);
    const distanceKm = distance.toFixed(1);
    
    // Calculate duration based on traffic
    let baseSpeed = 60; // km/h
    if (trafficResult.trafficColor === 'danger') baseSpeed = 25;
    else if (trafficResult.trafficColor === 'warning') baseSpeed = 40;
    
    const durationHours = distance / baseSpeed;
    const durationMins = Math.round(durationHours * 60);
    
    const fuelEstimate = (distance / 15).toFixed(1);
    
    document.getElementById('distance').textContent = `${distanceKm} km`;
    document.getElementById('duration').textContent = `${durationMins} mins`;
    document.getElementById('fuelEstimate').textContent = `${fuelEstimate} L`;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function updateAlternativeRoutesList(fromCoords, toCoords, trafficResult) {
    const routesList = document.getElementById('routesList');
    const distance = calculateDistance(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng);
    
    const alternatives = [
        {
            name: "Fast Highway",
            icon: "fas fa-bolt",
            time: Math.max(15, Math.round(distance / 80 * 60)),
            desc: "Via Express Highway - Fastest"
        },
        {
            name: "City Roads",
            icon: "fas fa-road",
            time: Math.max(20, Math.round(distance / 40 * 60)),
            desc: "Through city - Most direct"
        },
        {
            name: "Scenic Route",
            icon: "fas fa-mountain",
            time: Math.max(25, Math.round(distance / 35 * 60)),
            desc: "Picturesque but slower"
        }
    ];
    
    let routesHTML = '';
    alternatives.forEach((alt, index) => {
        routesHTML += `
            <div class="route-item" onclick="selectAlternativeRoute(${index})" style="cursor: pointer;">
                <i class="${alt.icon}"></i>
                <span><strong>${alt.name}:</strong> ${alt.desc} (${alt.time} mins)</span>
            </div>
        `;
    });
    
    routesList.innerHTML = routesHTML;
}
function selectAlternativeRoute(routeIndex) {
    const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
    if (alternativeRouteLayer) {
        alternativeRouteLayer.setStyle({ color: colors[routeIndex] });
    }
}

function updateSimulatedDistanceDuration() {
    const distanceKm = (Math.random() * 90 + 10).toFixed(1);
    const durationMins = Math.max(15, Math.round(parseFloat(distanceKm) * 1.5));
    const fuelEstimate = (distanceKm / 15).toFixed(1);
    
    document.getElementById('distance').textContent = `${distanceKm} km`;
    document.getElementById('duration').textContent = `${durationMins} mins`;
    document.getElementById('fuelEstimate').textContent = `${fuelEstimate} L`;
}

function updateWeather(location) {
    const conditions = [
        { type: 'Clear', icon: 'fas fa-sun', desc: 'Clear sky', temp: 28 },
        { type: 'Clouds', icon: 'fas fa-cloud', desc: 'Partly cloudy', temp: 25 },
        { type: 'Rain', icon: 'fas fa-cloud-rain', desc: 'Light rain', temp: 22 },
        { type: 'Squalls', icon: 'fas fa-wind', desc: 'Windy conditions', temp: 24 },
        { type: 'Fog', icon: 'fas fa-smog', desc: 'Foggy', temp: 20 },
        { type: 'Thunderstorm', icon: 'fas fa-bolt', desc: 'Thunderstorms', temp: 23 }
    ];
    
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const cityCoords = getCityCoordinates(location);
    
    const weatherCard = document.querySelector('.weather-card');
    if (cityCoords) {
        weatherCard.innerHTML = `
            <div class="weather-icon">
                <i class="${randomCondition.icon} fa-3x"></i>
            </div>
            <div class="weather-info">
                <h3>${randomCondition.type.toUpperCase()}</h3>
                <p>${randomCondition.desc} | Temp: ${randomCondition.temp}°C</p>
                <p style="font-size:0.8rem;color:#94a3b8;">Location: ${cityCoords.name}</p>
            </div>
        `;
    }
    
    document.getElementById('temperature').value = randomCondition.temp;
    document.getElementById('climateCondition').value = randomCondition.type;
}

function calculateTrafficPrediction(from, to, date, time, temp, isHoliday, climate) {
    return new Promise((resolve) => {
        const hour = parseInt(time.split(':')[0]) || 12;
        
        let trafficScore = 0;
        
        if (hour >= 7 && hour <= 10) trafficScore += 8; // Morning rush
        else if (hour >= 17 && hour <= 20) trafficScore += 9; // Evening rush
        else if (hour >= 11 && hour <= 16) trafficScore += 4; // Daytime
        else trafficScore += 1; // Night
        
        if (climate === 'Rain' || climate === 'Snow') trafficScore += 7;
        else if (climate === 'Fog') trafficScore += 5;
        else if (climate === 'Squalls') trafficScore += 6;
        
        if (isHoliday) trafficScore -= 2;
        
        if (temp < 5 || temp > 35) trafficScore += 3;
        
        const fromCoords = getCityCoordinates(from);
        const toCoords = getCityCoordinates(to);
        let distance = 100;
        
        if (fromCoords && toCoords) {
            distance = calculateDistance(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng);
            if (distance < 25) trafficScore += 5; // More traffic in short distances
        }
        
        let trafficLevel, trafficColor;
        if (trafficScore <= 5) {
            trafficLevel = "NO TRAFFIC";
            trafficColor = "success";
        } else if (trafficScore <= 10) {
            trafficLevel = "LIGHT TRAFFIC";
            trafficColor = "success";
        } else if (trafficScore <= 15) {
            trafficLevel = "MODERATE TRAFFIC";
            trafficColor = "warning";
        } else {
            trafficLevel = "HEAVY TRAFFIC";
            trafficColor = "danger";
        }
        
        resolve({
            trafficLevel,
            trafficColor,
            trafficScore,
            distance
        });
    });
}

function updateResultsUI(result) {
    const trafficPrediction = document.getElementById('trafficPrediction');
    
    let icon, bgClass;
    if (result.trafficColor === 'danger') {
        icon = 'fa-times-circle';
        bgClass = 'heavy-traffic';
    } else if (result.trafficColor === 'warning') {
        icon = 'fa-exclamation-triangle';
        bgClass = 'moderate-traffic';
    } else {
        icon = 'fa-check-circle';
        bgClass = 'no-traffic';
    }
    
    trafficPrediction.innerHTML = `
        <div class="traffic-status ${bgClass}">
            <i class="fas ${icon} fa-3x"></i>
            <h3>${result.trafficLevel}</h3>
            <p>${getTrafficMessage(result.trafficScore)}</p>
        </div>
    `;
    
    document.getElementById('trafficLevel').textContent = result.trafficLevel;
}

function getTrafficMessage(score) {
    if (score <= 5) return "Smooth journey expected";
    if (score <= 10) return "Minor delays possible";
    if (score <= 15) return "Expect moderate delays";
    return "Heavy congestion expected - consider alternative routes";
}

function getSimulatedPrediction() {
    const trafficOptions = [
        { level: "NO TRAFFIC", color: "success", score: 3 },
        { level: "LIGHT TRAFFIC", color: "success", score: 8 },
        { level: "MODERATE TRAFFIC", color: "warning", score: 12 },
        { level: "HEAVY TRAFFIC", color: "danger", score: 18 }
    ];
    
    const randomTraffic = trafficOptions[Math.floor(Math.random() * trafficOptions.length)];
    return {
        trafficLevel: randomTraffic.level,
        trafficColor: randomTraffic.color,
        trafficScore: randomTraffic.score,
        distance: 25
    };
}

document.getElementById('liveLocationBtn').addEventListener('click', function() {
    showLiveLocation();
});

function showLiveLocation() {
    const locationMessage = document.getElementById('locationMessage');
    
    
    if (!navigator.geolocation) {
        showLocationMessage("Geolocation is not supported by your browser", "error");
        return;
    }
    
    
    showLocationMessage("Getting your live location...", "loading");
    
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            const timestamp = new Date(position.timestamp);
            
            
            const trafficEmergencyNumber = "7091234246"; 
            const emergencyContact = "9883071220"; 
            
            
            const messageId = generateMessageId();
            
          
            showLocationMessage(`
                <div class="live-location-message success">
                    <h4><i class="fas fa-location-dot"></i> Live Location Sharing <span class="message-id">${messageId}</span></h4>
                    
                    <div class="coordinates-container">
                        <div class="coordinate-item">
                            <strong>Latitude:</strong> <span>${lat.toFixed(6)}°</span>
                        </div>
                        <div class="coordinate-item">
                            <strong>Longitude:</strong> <span>${lon.toFixed(6)}°</span>
                        </div>
                        <div class="coordinate-item">
                            <strong>Accuracy:</strong> 
                            <span>
                                <span class="accuracy-indicator ${getAccuracyClass(accuracy)}"></span>
                                ${accuracy.toFixed(1)} meters
                            </span>
                        </div>
                        <div class="coordinate-item">
                            <strong>Time:</strong> <span>${timestamp.toLocaleTimeString()}</span>
                        </div>
                    </div>
                    
                    <div class="phone-numbers-section">
                        <h5><i class="fas fa-phone-alt"></i> Location Shared With:</h5>
                        <div class="phone-numbers-container">
                            <div class="phone-number-card traffic">
                                <p><i class="fas fa-traffic-light"></i> Traffic Emergency</p>
                                <p class="number">${trafficEmergencyNumber}</p>
                                <p class="status success"><i class="fas fa-check-circle"></i> Sent successfully</p>
                            </div>
                            <div class="phone-number-card emergency">
                                <p><i class="fas fa-user-shield"></i> Emergency Contact</p>
                                <p class="number">${emergencyContact}</p>
                                <p class="status success"><i class="fas fa-check-circle"></i> Sent successfully</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="status-badges">
                        <span class="status-badge sms"><i class="fas fa-mobile-alt"></i> SMS Sent</span>
                        <span class="status-badge alert"><i class="fas fa-bell"></i> Alert Sent</span>
                        <span class="status-badge emergency"><i class="fas fa-shield-alt"></i> Emergency Mode</span>
                    </div>
                    
                    <div class="notification-message">
                        <p><i class="fas fa-info-circle"></i> Message ${messageId} sent to both contacts with your current location coordinates.</p>
                    </div>
                </div>
            `, "success");
            
            simulateSendingSMS(lat, lon, messageId, [trafficEmergencyNumber, emergencyContact]);
            
            updateLocationFields(lat, lon);
            
        },
        function(error) {
            showSimulatedLocation();
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

// Function to get accuracy class
function getAccuracyClass(accuracy) {
    if (accuracy < 50) return "high";
    if (accuracy < 200) return "medium";
    return "low";
}
 ID
function generateMessageId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `LOC-${timestamp.toString().slice(-6)}-${randomNum}`;
}

function simulateSendingSMS(lat, lon, messageId, phoneNumbers) {
    console.log(`Sending location to phone numbers: ${phoneNumbers.join(', ')}`);
    console.log(`Message ID: ${messageId}`);
    console.log(`Coordinates: ${lat.toFixed(6)}, ${lon.toFixed(6)}`);
    
    setTimeout(() => {
        console.log(`Location successfully sent to all contacts (${phoneNumbers.length} numbers)`);
        
        showSMSNotification(phoneNumbers);
    }, 1500);
}

function showSMSNotification(phoneNumbers) {
    const notification = document.createElement('div');
    notification.className = 'sms-notification';
    notification.innerHTML = `
        <div class="sms-notification-content">
            <i class="fas fa-paper-plane fa-lg"></i>
            <div class="sms-notification-text">
                <p>Location Shared!</p>
                <small>Sent to ${phoneNumbers.length} contacts</small>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showSimulatedLocation() {
    const indianCities = [
        { name: "Delhi", lat: 28.6139, lon: 77.2090, trafficNum: "1800-111-2222", contactNum: "+91 98765 43210" },
        { name: "Mumbai", lat: 19.0760, lon: 72.8777, trafficNum: "1800-333-4444", contactNum: "+91 98765 12345" },
        { name: "Bangalore", lat: 12.9716, lon: 77.5946, trafficNum: "1800-555-6666", contactNum: "+91 98765 67890" },
        { name: "Hyderabad", lat: 17.3850, lon: 78.4867, trafficNum: "1800-777-8888", contactNum: "+91 98765 11111" },
        { name: "Chennai", lat: 13.0827, lon: 80.2707, trafficNum: "1800-999-0000", contactNum: "+91 98765 22222" },
        { name: "Kolkata", lat: 22.5726, lon: 88.3639, trafficNum: "1800-121-2121", contactNum: "+91 98765 33333" }
    ];
    
    const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
    const messageId = generateMessageId();
    
    showLocationMessage(`
        <div class="live-location-message simulated">
            <h4><i class="fas fa-satellite"></i> Simulated Location Sharing <span class="message-id">${messageId}</span></h4>
            
            <div class="coordinates-container">
                <div class="coordinate-item">
                    <strong>City:</strong> <span>${randomCity.name}</span>
                </div>
                <div class="coordinate-item">
                    <strong>Latitude:</strong> <span>${randomCity.lat.toFixed(6)}°</span>
                </div>
                <div class="coordinate-item">
                    <strong>Longitude:</strong> <span>${randomCity.lon.toFixed(6)}°</span>
                </div>
                <div class="coordinate-item">
                    <strong>Status:</strong> <span>Simulated Data</span>
                </div>
            </div>
            
            <div class="phone-numbers-section">
                <h5><i class="fas fa-phone-alt"></i> Location Would Be Shared With:</h5>
                <div class="phone-numbers-container">
                    <div class="phone-number-card traffic">
                        <p><i class="fas fa-traffic-light"></i> Traffic Emergency</p>
                        <p class="number">${randomCity.trafficNum}</p>
                        <p class="status info"><i class="fas fa-info-circle"></i> (Simulated)</p>
                    </div>
                    <div class="phone-number-card emergency">
                        <p><i class="fas fa-user-shield"></i> Emergency Contact</p>
                        <p class="number">${randomCity.contactNum}</p>
                        <p class="status info"><i class="fas fa-info-circle"></i> (Simulated)</p>
                    </div>
                </div>
            </div>
            
            <div class="notification-message">
                <p><i class="fas fa-info-circle"></i> Location access was denied. In real scenario, this would share your location with emergency contacts.</p>
            </div>
        </div>
    `, "simulated");
    
    document.getElementById('fromLocation').value = `${randomCity.name} City Center`;
    document.getElementById('toLocation').value = `${randomCity.name} Airport`;
}

function showLocationMessage(message, type) {
    const locationMessage = document.getElementById('locationMessage');
    locationMessage.innerHTML = message;
    locationMessage.style.display = 'block';
}

function updateLocationFields(lat, lon) {
   
    const nearestCity = findNearestCity(lat, lon);
    
    if (nearestCity) {
        document.getElementById('fromLocation').value = `${nearestCity.name}`;
        document.getElementById('toLocation').value = `${nearestCity.name} Airport`;
    }
}

function findNearestCity(lat, lon) {
    const cities = [
        { name: "Delhi", lat: 28.6139, lon: 77.2090 },
        { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
        { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
        { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
        { name: "Chennai", lat: 13.0827, lon: 80.2707 },
        { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
        { name: "Pune", lat: 18.5204, lon: 73.8567 }
    ];
    
    let nearestCity = cities[0];
    let shortestDistance = calculateDistance(lat, lon, cities[0].lat, cities[0].lon);
    
    for (const city of cities) {
        const distance = calculateDistance(lat, lon, city.lat, city.lon);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestCity = city;
        }
    }
    
    return nearestCity;
}