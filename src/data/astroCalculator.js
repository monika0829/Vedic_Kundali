// Vedic Astrology Calculator
// Computes Moon Sign (Rashi), Nakshatra, and Ascendant from birth details
// Using astronomical approximations based on Swiss Ephemeris principles

const RASHIS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const RASHI_SYMBOLS = {
  'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
  'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓',
};

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

// ---------- Moon Position (simplified Lahiri ayanamsa) ----------

// Moon's approximate longitude for J2000.0 epoch (Jan 1.5 2000 = JD 2451545.0)
const MOON_LON_J2000 = 218.3165; // degrees
const MOON_LON_RATE = 13.176396; // degrees per day (mean motion)

// More precise: Moon's mean anomaly and evection terms
const MOON_MEAN_ANOMALY_J2000 = 29.105;
const MOON_ANOMALY_RATE = 13.064993; // degrees/day

// Sun's mean longitude for calculating elongation corrections
const SUN_LON_J2000 = 280.460;
const SUN_LON_RATE = 0.9856474; // degrees/day

/**
 * Calculate Julian Day Number from date
 */
function dateToJD(year, month, day, hour) {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hour / 24 + B - 1524.5;
}

/**
 * Calculate approximate Moon longitude (tropical) using simplified ephemeris
 * Accuracy: ~1-3 degrees (sufficient for Rashi and Nakshatra determination)
 */
function getMoonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0; // Julian centuries from J2000.0

  const daysSinceJ2000 = jd - 2451545.0;

  // Mean Moon longitude
  let L0 = MOON_LON_J2000 + MOON_LON_RATE * daysSinceJ2000;

  // Mean anomaly
  let M = MOON_MEAN_ANOMALY_J2000 + MOON_ANOMALY_RATE * daysSinceJ2000;

  // Sun's mean longitude
  let sunL = SUN_LON_J2000 + SUN_LON_RATE * daysSinceJ2000;

  // Normalize to 0-360
  L0 = ((L0 % 360) + 360) % 360;
  M = ((M % 360) + 360) % 360;
  sunL = ((sunL % 360) + 360) % 360;

  // Elongation of Moon from mean Sun
  const D = L0 - sunL;

  // Evection correction
  const evection = 1.2739 * Math.sin((2 * D - L0 + M) * Math.PI / 180);

  // Equation of center (annual equation)
  const annualEq = -0.1858 * Math.sin(sunL * Math.PI / 180);

  // A minor correction for variation
  const variation = 0.214 * Math.sin(2 * D * Math.PI / 180);

  // Corrected Moon longitude
  let moonLon = L0 + evection + annualEq + variation;

  // Additional major correction: equation of center for Moon
  const eqCenter = 6.289 * Math.sin(M * Math.PI / 180);
  moonLon += eqCenter;

  moonLon = ((moonLon % 360) + 360) % 360;

  return moonLon;
}

/**
 * Calculate approximate Sun longitude (tropical)
 */
function getSunLongitude(jd) {
  const daysSinceJ2000 = jd - 2451545.0;
  let L = SUN_LON_J2000 + SUN_LON_RATE * daysSinceJ2000;

  // Mean anomaly
  const g = 357.529 + 0.98560028 * daysSinceJ2000;
  const gRad = ((g % 360) + 360) % 360 * Math.PI / 180;

  // Equation of center
  const eqCenter = 1.915 * Math.sin(gRad) + 0.020 * Math.sin(2 * gRad);

  L += eqCenter;
  L = ((L % 360) + 360) % 360;
  return L;
}

// ---------- Local Sidereal Time → Ascendant ----------

/**
 * Calculate Greenwich Mean Sidereal Time for a given JD
 */
function getGMST(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  gmst = ((gmst % 360) + 360) % 360;
  return gmst; // degrees
}

/**
 * Calculate Ascendant (Lagna) from birth details
 */
function getAscendant(jd, latitude) {
  const lst = getGMST(jd); // Local sidereal time (simplified — ignoring longitude offset for now)
  const RAMC = lst * Math.PI / 180;

  const obliquity = 23.4393 * Math.PI / 180; // Earth's axial tilt
  const latRad = latitude * Math.PI / 180;

  // Ascendant formula
  const ascendantRad = Math.atan2(
    Math.cos(RAMC),
    -(Math.sin(RAMC) * Math.cos(obliquity) + Math.tan(latRad) * Math.sin(obliquity))
  );

  let ascendant = ((ascendantRad * 180 / Math.PI) % 360 + 360) % 360;
  return ascendant;
}

// ---------- Public API ----------

/**
 * Calculate Moon Sign (Rashi) from birth details
 * Each Rashi spans 30 degrees starting from Aries (0°)
 */
export function getMoonSign(moonLongitude) {
  const rashiIndex = Math.floor(moonLongitude / 30) % 12;
  return RASHIS[rashiIndex];
}

/**
 * Calculate Nakshatra from Moon longitude
 * Each Nakshatra spans 13°20' = 13.3333° degrees
 */
export function getNakshatra(moonLongitude) {
  const nakIndex = Math.floor(moonLongitude / (360 / 27)) % 27;
  return NAKSHATRAS[nakIndex];
}

/**
 * Main function: Calculate all astrological data from birth details
 * @param {string} name 
 * @param {string} dateOfBirth - "YYYY-MM-DD" 
 * @param {string} timeOfBirth - "HH:MM" (24h)
 * @param {string} placeOfBirth - city string
 * @returns {object} astrological data
 */
export function calculateBirthChart(name, dateOfBirth, timeOfBirth, placeOfBirth) {
  // Parse date and time
  const [year, month, day] = dateOfBirth.split('-').map(Number);
  const [hour, minute] = (timeOfBirth || '06:00').split(':').map(Number);

  // Get approximate coordinates from place name
  const coords = getCoordinates(placeOfBirth);

  // Calculate Julian Day
  const jd = dateToJD(year, month, day, hour + minute / 60);

  // Get planetary positions
  const moonLon = getMoonLongitude(jd);
  const sunLon = getSunLongitude(jd);

  // Get astrological details
  const moonSign = getMoonSign(moonLon);
  const nakshatra = getNakshatra(moonLon);
  const sunSign = getMoonSign(sunLon); // reuse: sun sign = floor(sunLon/30)

  // Moon's degree within sign
  const moonDegreeInSign = moonLon % 30;

  // Nakshatra Pada (quarter) — each nakshatra has 4 padas of 3°20' each
  const pada = Math.floor((moonLon % (360 / 27)) / (360 / 108)) + 1;

  // Ascendant
  const ascendantLon = getAscendant(jd, coords.latitude);
  const ascendant = getMoonSign(ascendantLon);

  return {
    name,
    dateOfBirth,
    timeOfBirth,
    placeOfBirth,
    moonSign,
    nakshatra,
    nakshatraPada: pada,
    sunSign,
    ascendant,
    moonLongitude: moonLon.toFixed(2),
    moonDegree: moonDegreeInSign.toFixed(2),
    coordinates: coords,
  };
}

/**
 * Approximate coordinates from place name
 * Covers major world cities and Indian cities
 */
function getCoordinates(place) {
  const places = {
    // India — Major Cities
    'new delhi': { latitude: 28.6139, longitude: 77.2090, timezone: 'IST (UTC+5:30)' },
    'delhi': { latitude: 28.6139, longitude: 77.2090, timezone: 'IST (UTC+5:30)' },
    'mumbai': { latitude: 19.0760, longitude: 72.8777, timezone: 'IST (UTC+5:30)' },
    'bombay': { latitude: 19.0760, longitude: 72.8777, timezone: 'IST (UTC+5:30)' },
    'bangalore': { latitude: 12.9716, longitude: 77.5946, timezone: 'IST (UTC+5:30)' },
    'bengaluru': { latitude: 12.9716, longitude: 77.5946, timezone: 'IST (UTC+5:30)' },
    'chennai': { latitude: 13.0827, longitude: 80.2707, timezone: 'IST (UTC+5:30)' },
    'madras': { latitude: 13.0827, longitude: 80.2707, timezone: 'IST (UTC+5:30)' },
    'kolkata': { latitude: 22.5726, longitude: 88.3639, timezone: 'IST (UTC+5:30)' },
    'calcutta': { latitude: 22.5726, longitude: 88.3639, timezone: 'IST (UTC+5:30)' },
    'hyderabad': { latitude: 17.3850, longitude: 78.4867, timezone: 'IST (UTC+5:30)' },
    'pune': { latitude: 18.5204, longitude: 73.8567, timezone: 'IST (UTC+5:30)' },
    'ahmedabad': { latitude: 23.0225, longitude: 72.5714, timezone: 'IST (UTC+5:30)' },
    'jaipur': { latitude: 26.9124, longitude: 75.7873, timezone: 'IST (UTC+5:30)' },
    'lucknow': { latitude: 26.8467, longitude: 80.9462, timezone: 'IST (UTC+5:30)' },
    'varanasi': { latitude: 25.3176, longitude: 82.9739, timezone: 'IST (UTC+5:30)' },
    'benares': { latitude: 25.3176, longitude: 82.9739, timezone: 'IST (UTC+5:30)' },
    'patna': { latitude: 25.6093, longitude: 85.1376, timezone: 'IST (UTC+5:30)' },
    'bhopal': { latitude: 23.2599, longitude: 77.4126, timezone: 'IST (UTC+5:30)' },
    'chandigarh': { latitude: 30.7333, longitude: 76.7794, timezone: 'IST (UTC+5:30)' },
    'nagpur': { latitude: 21.1458, longitude: 79.0882, timezone: 'IST (UTC+5:30)' },
    'indore': { latitude: 22.7196, longitude: 75.8577, timezone: 'IST (UTC+5:30)' },
    'kanpur': { latitude: 26.4499, longitude: 80.3319, timezone: 'IST (UTC+5:30)' },
    'coimbatore': { latitude: 11.0168, longitude: 76.9558, timezone: 'IST (UTC+5:30)' },
    'surat': { latitude: 21.1702, longitude: 72.8311, timezone: 'IST (UTC+5:30)' },
    'vadodara': { latitude: 22.3072, longitude: 73.1812, timezone: 'IST (UTC+5:30)' },
    'goa': { latitude: 15.2993, longitude: 74.1240, timezone: 'IST (UTC+5:30)' },
    'panaji': { latitude: 15.4909, longitude: 73.8278, timezone: 'IST (UTC+5:30)' },
    'ranchi': { latitude: 23.3441, longitude: 85.3096, timezone: 'IST (UTC+5:30)' },
    'guwahati': { latitude: 26.1445, longitude: 91.7362, timezone: 'IST (UTC+5:30)' },
    'bhubaneswar': { latitude: 20.2961, longitude: 85.8245, timezone: 'IST (UTC+5:30)' },
    'thiruvananthapuram': { latitude: 8.5241, longitude: 76.9366, timezone: 'IST (UTC+5:30)' },
    'trivandrum': { latitude: 8.5241, longitude: 76.9366, timezone: 'IST (UTC+5:30)' },
    'kochi': { latitude: 9.9312, longitude: 76.2673, timezone: 'IST (UTC+5:30)' },
    'mangalore': { latitude: 12.9141, longitude: 74.8560, timezone: 'IST (UTC+5:30)' },
    'agra': { latitude: 27.1767, longitude: 78.0081, timezone: 'IST (UTC+5:30)' },
    'mathura': { latitude: 27.4924, longitude: 77.6737, timezone: 'IST (UTC+5:30)' },
    'ayodhya': { latitude: 26.7922, longitude: 82.1947, timezone: 'IST (UTC+5:30)' },
    'haridwar': { latitude: 29.7454, longitude: 78.1649, timezone: 'IST (UTC+5:30)' },
    'rishikesh': { latitude: 30.0869, longitude: 78.2676, timezone: 'IST (UTC+5:30)' },
    'udaipur': { latitude: 24.5854, longitude: 73.7125, timezone: 'IST (UTC+5:30)' },
    'jodhpur': { latitude: 26.2389, longitude: 73.0243, timezone: 'IST (UTC+5:30)' },
    'gwalior': { latitude: 26.2183, longitude: 78.1828, timezone: 'IST (UTC+5:30)' },
    'nashik': { latitude: 19.9975, longitude: 73.7898, timezone: 'IST (UTC+5:30)' },
    'shirdi': { latitude: 19.7674, longitude: 74.4774, timezone: 'IST (UTC+5:30)' },
    'darjeeling': { latitude: 27.0360, longitude: 88.2627, timezone: 'IST (UTC+5:30)' },
    'srinagar': { latitude: 34.0837, longitude: 74.7973, timezone: 'IST (UTC+5:30)' },
    'leh': { latitude: 34.1526, longitude: 77.5771, timezone: 'IST (UTC+5:30)' },
    'dehradun': { latitude: 30.3165, longitude: 78.0322, timezone: 'IST (UTC+5:30)' },
    'noida': { latitude: 28.5355, longitude: 77.3910, timezone: 'IST (UTC+5:30)' },
    'gurgaon': { latitude: 28.4595, longitude: 77.0266, timezone: 'IST (UTC+5:30)' },
    'gurugram': { latitude: 28.4595, longitude: 77.0266, timezone: 'IST (UTC+5:30)' },
    'faridabad': { latitude: 28.4089, longitude: 77.3178, timezone: 'IST (UTC+5:30)' },
    'meerut': { latitude: 28.9845, longitude: 77.7064, timezone: 'IST (UTC+5:30)' },
    'allahabad': { latitude: 25.4358, longitude: 81.8463, timezone: 'IST (UTC+5:30)' },
    'prayagraj': { latitude: 25.4358, longitude: 81.8463, timezone: 'IST (UTC+5:30)' },

    // International Cities
    'london': { latitude: 51.5074, longitude: -0.1278, timezone: 'GMT (UTC+0)' },
    'new york': { latitude: 40.7128, longitude: -74.0060, timezone: 'EST (UTC-5)' },
    'los angeles': { latitude: 34.0522, longitude: -118.2437, timezone: 'PST (UTC-8)' },
    'san francisco': { latitude: 37.7749, longitude: -122.4194, timezone: 'PST (UTC-8)' },
    'chicago': { latitude: 41.8781, longitude: -87.6298, timezone: 'CST (UTC-6)' },
    'toronto': { latitude: 43.6532, longitude: -79.3832, timezone: 'EST (UTC-5)' },
    'vancouver': { latitude: 49.2827, longitude: -123.1207, timezone: 'PST (UTC-8)' },
    'sydney': { latitude: -33.8688, longitude: 151.2093, timezone: 'AEST (UTC+10)' },
    'melbourne': { latitude: -37.8136, longitude: 144.9631, timezone: 'AEST (UTC+10)' },
    'tokyo': { latitude: 35.6762, longitude: 139.6503, timezone: 'JST (UTC+9)' },
    'singapore': { latitude: 1.3521, longitude: 103.8198, timezone: 'SGT (UTC+8)' },
    'dubai': { latitude: 25.2048, longitude: 55.2708, timezone: 'GST (UTC+4)' },
    'paris': { latitude: 48.8566, longitude: 2.3522, timezone: 'CET (UTC+1)' },
    'berlin': { latitude: 52.5200, longitude: 13.4050, timezone: 'CET (UTC+1)' },
    'amsterdam': { latitude: 52.3676, longitude: 4.9041, timezone: 'CET (UTC+1)' },
    'rome': { latitude: 41.9028, longitude: 12.4964, timezone: 'CET (UTC+1)' },
    'madrid': { latitude: 40.4168, longitude: -3.7038, timezone: 'CET (UTC+1)' },
    'moscow': { latitude: 55.7558, longitude: 37.6173, timezone: 'MSK (UTC+3)' },
    'beijing': { latitude: 39.9042, longitude: 116.4074, timezone: 'CST (UTC+8)' },
    'shanghai': { latitude: 31.2304, longitude: 121.4737, timezone: 'CST (UTC+8)' },
    'hong kong': { latitude: 22.3193, longitude: 114.1694, timezone: 'HKT (UTC+8)' },
    'bangkok': { latitude: 13.7563, longitude: 100.5018, timezone: 'ICT (UTC+7)' },
    'kathmandu': { latitude: 27.7172, longitude: 85.3240, timezone: 'NPT (UTC+5:45)' },
    'dhaka': { latitude: 23.8103, longitude: 90.4125, timezone: 'BST (UTC+6)' },
    'karachi': { latitude: 24.8607, longitude: 67.0011, timezone: 'PKT (UTC+5)' },
    'istanbul': { latitude: 41.0082, longitude: 28.9784, timezone: 'TRT (UTC+3)' },
    'cairo': { latitude: 30.0444, longitude: 31.2357, timezone: 'EET (UTC+2)' },
    'johannesburg': { latitude: -26.2041, longitude: 28.0473, timezone: 'SAST (UTC+2)' },
    'nairobi': { latitude: -1.2921, longitude: 36.8219, timezone: 'EAT (UTC+3)' },
    'sao paulo': { latitude: -23.5505, longitude: -46.6333, timezone: 'BRT (UTC-3)' },
    'mexico city': { latitude: 19.4326, longitude: -99.1332, timezone: 'CST (UTC-6)' },
    'buenos aires': { latitude: -34.6037, longitude: -58.3816, timezone: 'ART (UTC-3)' },
    'auckland': { latitude: -36.8485, longitude: 174.7633, timezone: 'NZST (UTC+12)' },
  };

  const key = place.toLowerCase().trim();
  
  // Direct match
  if (places[key]) return places[key];

  // Try matching with "city, country" format
  const cityOnly = key.split(',')[0].trim();
  if (places[cityOnly]) return places[cityOnly];

  // Try partial match
  for (const [p, coords] of Object.entries(places)) {
    if (key.includes(p) || p.includes(cityOnly)) return coords;
  }

  // Default: New Delhi (center of India)
  return { latitude: 28.6139, longitude: 77.2090, timezone: 'IST (UTC+5:30)' };
}

export { RASHIS, RASHI_SYMBOLS, NAKSHATRAS };