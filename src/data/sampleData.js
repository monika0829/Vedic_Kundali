export const BIRTH_DETAILS = {
  name: "Arjun Sharma",
  dateOfBirth: "1990-06-15",
  timeOfBirth: "06:30 AM",
  placeOfBirth: "New Delhi, India",
  latitude: 28.6139,
  longitude: 77.2090,
  timezone: "IST (UTC+5:30)",
};

export const CHART_DATA = {
  lagna: "Leo",
  moonSign: "Taurus",
  sunSign: "Gemini",
  nakshatra: "Rohini",
  houses: [
    { number: 1, sign: "Leo", planets: ["Su"], style: "center" },
    { number: 2, sign: "Virgo", planets: [], style: "top" },
    { number: 3, sign: "Libra", planets: ["Ve"], style: "left" },
    { number: 4, sign: "Scorpio", planets: ["Ma", "Ke"], style: "top" },
    { number: 5, sign: "Sagittarius", planets: ["Ju"], style: "left" },
    { number: 6, sign: "Capricorn", planets: ["Sa"], style: "top" },
    { number: 7, sign: "Aquarius", planets: [], style: "left" },
    { number: 8, sign: "Pisces", planets: [], style: "top" },
    { number: 9, sign: "Aries", planets: [], style: "left" },
    { number: 10, sign: "Taurus", planets: ["Mo"], style: "top" },
    { number: 11, sign: "Gemini", planets: ["Me"], style: "left" },
    { number: 12, sign: "Cancer", planets: ["Ra"], style: "top" },
  ],
};

export const PLANETS = [
  { name: "Sun", abbr: "Su", sign: "Leo", house: 1, degree: 0.0, nakshatra: "Magha", status: "Own Sign", color: "#f59e0b", statusType: "benefic" },
  { name: "Moon", abbr: "Mo", sign: "Taurus", house: 10, degree: 10.25, nakshatra: "Rohini", status: "Exalted", color: "#e2e8f0", statusType: "benefic" },
  { name: "Mars", abbr: "Ma", sign: "Scorpio", house: 4, degree: 22.5, nakshatra: "Jyeshtha", status: "Own Sign", color: "#ef4444", statusType: "malefic" },
  { name: "Mercury", abbr: "Me", sign: "Gemini", house: 11, degree: 15.75, nakshatra: "Ardra", status: "Own Sign", color: "#22c55e", statusType: "benefic" },
  { name: "Jupiter", abbr: "Ju", sign: "Sagittarius", house: 5, degree: 5.0, nakshatra: "Mula", status: "Own Sign", color: "#f97316", statusType: "benefic" },
  { name: "Venus", abbr: "Ve", sign: "Libra", house: 3, degree: 18.3, nakshatra: "Swati", status: "Own Sign", color: "#ec4899", statusType: "benefic" },
  { name: "Saturn", abbr: "Sa", sign: "Capricorn", house: 6, degree: 8.6, nakshatra: "Shravana", status: "Own Sign", color: "#6366f1", statusType: "malefic" },
  { name: "Rahu", abbr: "Ra", sign: "Cancer", house: 12, degree: 14.2, nakshatra: "Pushya", status: "Debilitated", color: "#8b5cf6", statusType: "shadow" },
  { name: "Ketu", abbr: "Ke", sign: "Scorpio", house: 4, degree: 14.2, nakshatra: "Anuradha", status: "Debilitated", color: "#a855f7", statusType: "shadow" },
];

export const DASHA_DATA = {
  currentMahadasha: "Moon",
  startDate: "2018-06-15",
  endDate: "2034-06-15",
  totalYears: 16,
  elapsedYears: 6,
  mahadashas: [
    { planet: "Ketu", startYear: 1990, endYear: 1997, years: 7, isPast: true },
    { planet: "Venus", startYear: 1997, endYear: 2017, years: 20, isPast: true },
    { planet: "Sun", startYear: 2017, endYear: 2023, years: 6, isPast: false, isCurrent: false },
    { planet: "Moon", startYear: 2023, endYear: 2033, years: 10, isPast: false, isCurrent: true },
    { planet: "Mars", startYear: 2033, endYear: 2040, years: 7, isPast: false },
    { planet: "Rahu", startYear: 2040, endYear: 2058, years: 18, isPast: false },
    { planet: "Jupiter", startYear: 2058, endYear: 2074, years: 16, isPast: false },
    { planet: "Saturn", startYear: 2074, endYear: 2093, years: 19, isPast: false },
    { planet: "Mercury", startYear: 2093, endYear: 2110, years: 17, isPast: false },
  ],
  antardashas: [
    { planet: "Moon", startYear: 2023, endYear: 2025, isCurrent: true },
    { planet: "Mars", startYear: 2025, endYear: 2026, isCurrent: false },
    { planet: "Rahu", startYear: 2026, endYear: 2028, isCurrent: false },
    { planet: "Jupiter", startYear: 2028, endYear: 2030, isCurrent: false },
    { planet: "Saturn", startYear: 2030, endYear: 2032, isCurrent: false },
    { planet: "Mercury", startYear: 2032, endYear: 2033, isCurrent: false },
  ],
};

export const OVERVIEW_DATA = {
  lagna: "Leo (Simha)",
  lagnaLord: "Sun",
  moonSign: "Taurus (Vrishabha)",
  sunSign: "Gemini (Mithuna)",
  nakshatra: "Rohini",
  tithi: "Dashami",
  karana: "Taitila",
  yoga: "Shubha",
  personalitySummary:
    "With Leo rising and Sun as the ascendant lord, you possess natural leadership qualities and a regal presence. The exalted Moon in the 10th house indicates strong emotional intelligence and public recognition. Mercury in the 11th house brings excellent communication skills and gains through intellect. Your combination suggests a charismatic personality with a blend of creativity, ambition, and practical wisdom.",
  strengths: ["Leadership", "Communication", "Emotional Intelligence", "Creativity"],
  challenges: ["Stubbornness", "Overthinking", "Impatience"],
};

export const CAREER_DATA = {
  tenthHouse: {
    sign: "Taurus",
    lord: "Venus",
    planetsInHouse: ["Moon (Exalted)"],
  },
  tenthLord: {
    planet: "Venus",
    placedIn: "3rd House (Libra)",
    status: "Own Sign",
  },
  keyCombinations: [
    "Exalted Moon in 10th house — Gajakesari Yoga: Public fame and career success",
    "Mercury in 11th house: Gains through communication and business",
    "Sun in ascendant: Authority and leadership roles",
    "Jupiter in 5th house: Teaching, counseling, and creative professions",
  ],
  suggestedPaths: [
    { path: "Business Leadership", match: 95, icon: "🏢" },
    { path: "Technology & Innovation", match: 88, icon: "💻" },
    { path: "Finance & Investment", match: 82, icon: "📊" },
    { path: "Creative Arts & Media", match: 78, icon: "🎨" },
    { path: "Government & Administration", match: 75, icon: "🏛️" },
  ],
  careerPeriods: [
    { period: "2024-2026", description: "Major breakthrough phase with Moon dasha", type: "growth" },
    { period: "2027-2029", description: "Stability and consolidation period", type: "stable" },
    { period: "2030-2033", description: "Peak career achievement window", type: "peak" },
  ],
};

export const LOVE_DATA = {
  seventhHouse: {
    sign: "Aquarius",
    lord: "Saturn",
    planetsInHouse: [],
  },
  seventhLord: {
    planet: "Saturn",
    placedIn: "6th House (Capricorn)",
    status: "Own Sign",
  },
  venusAnalysis: "Venus in the 3rd house in own sign (Libra) indicates a love for beauty, harmony, and artistic expression in relationships. You value communication and intellectual connection in partnerships.",
  relationshipStyle: "You seek a partner who is both a friend and a companion. Intellectual stimulation matters as much as emotional connection.",
  marriageTiming: [
    { period: "2025-2026", probability: "High", description: "Moon-Venus Antardasha — strong marriage indicator" },
    { period: "2027-2028", probability: "Medium", description: "Moon-Rahu period — unconventional meeting possible" },
  ],
  compatibility: {
    bestMatches: ["Gemini", "Libra", "Sagittarius", "Aries"],
    challenging: ["Scorpio", "Taurus"],
  },
};

export const HEALTH_DATA = {
  sixthHouse: {
    sign: "Capricorn",
    lord: "Saturn",
    planetsInHouse: ["Saturn"],
  },
  weakPlanets: [
    { planet: "Rahu", issue: "Stress and anxiety tendencies", severity: "moderate" },
    { planet: "Saturn", issue: "Joint and bone weakness", severity: "low" },
    { planet: "Ketu", issue: "Digestive sensitivity", severity: "moderate" },
  ],
  bodyAreas: [
    { area: "Heart & Spine", ruling: "Sun in Leo", risk: "low", icon: "❤️" },
    { area: "Throat & Neck", ruling: "Moon in Taurus", risk: "moderate", icon: "🫁" },
    { area: "Nervous System", ruling: "Mercury in Gemini", risk: "low", icon: "🧠" },
    { area: "Joints & Bones", ruling: "Saturn in Capricorn", risk: "moderate", icon: "🦴" },
    { area: "Digestive System", ruling: "Ketu in Scorpio", risk: "moderate", icon: "🫄" },
  ],
  remedies: [
    { practice: "Surya Namaskar (Sun Salutation)", benefit: "Strengthens heart and spine", icon: "🧘" },
    { practice: "Pranayama (Breathing exercises)", benefit: "Reduces stress and anxiety", icon: "🌬️" },
    { practice: "Chandra Meditation on Mondays", benefit: "Emotional balance", icon: "🌙" },
    { practice: "Regular walking in nature", benefit: "Bone and joint health", icon: "🚶" },
  ],
};

export const WEALTH_DATA = {
  secondHouse: {
    sign: "Virgo",
    lord: "Mercury",
    planetsInHouse: [],
  },
  eleventhHouse: {
    sign: "Gemini",
    lord: "Mercury",
    planetsInHouse: ["Mercury"],
  },
  wealthYogas: [
    {
      name: "Dhana Yoga",
      description: "Mercury as lord of 2nd and 11th houses placed in 11th house",
      strength: "Strong",
      icon: "💎",
    },
    {
      name: "Gajakesari Yoga",
      description: "Exalted Moon in Kendra from Jupiter",
      strength: "Very Strong",
      icon: "🐘",
    },
    {
      name: "Budhaditya Yoga",
      description: "Sun and Mercury combination in Kendra/Trikona",
      strength: "Moderate",
      icon: "☀️",
    },
  ],
  financialTimeline: [
    { period: "2024-2025", trend: "growing", description: "Steady income growth through career advancement" },
    { period: "2026-2028", trend: "peak", description: "Major financial gains through investments" },
    { period: "2029-2031", trend: "stable", description: "Consolidation and asset building" },
    { period: "2032-2034", trend: "growing", description: "New income streams emerge" },
  ],
  investmentTips: [
    "Technology stocks favor your Mercury-driven chart",
    "Real estate investments may prosper during Moon dasha",
    "Avoid speculative investments during Rahu antardasha",
    "Charitable giving enhances Jupiter's benefic influence",
  ],
};