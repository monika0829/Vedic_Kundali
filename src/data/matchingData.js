// Ashtakoota Milan (36-point Kundali Matching System)
// Based on Moon Nakshatra of both partners

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

const RASHIS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const RASHI_SYMBOLS = {
  'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
  'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓',
};

const NAKSHATRA_LORDS = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
  'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus', 'Sun',
  'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
  'Jupiter', 'Saturn', 'Mercury',
];

const VASHYA_ANIMALS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

// Vashya groups by Rashi
function getVashya(rashi) {
  const rashiIdx = RASHIS.indexOf(rashi);
  if (rashiIdx < 4) return 'Human';       // Aries-Dragon
  if (rashiIdx < 6) return 'Wild';        // Leo, Virgo
  if (rashiIdx < 8) return 'Human';       // Libra, Scorpio
  if (rashiIdx === 8) return 'Wild';      // Sagittarius
  if (rashiIdx === 9) return 'Water';     // Capricorn
  if (rashiIdx === 10) return 'Human';    // Aquarius
  return 'Water';                         // Pisces
}

// Varna (1 point) — based on Moon sign
function calcVarna(rashi) {
  const idx = RASHIS.indexOf(rashi);
  if ([0, 3, 6, 9].includes(idx)) return 'Brahmin';
  if ([2, 5, 8, 11].includes(idx)) return 'Kshatriya';
  if ([1, 4, 7, 10].includes(idx)) return 'Vaishya';
  return 'Shudra';
}

function calcVarnaScore(rashi1, rashi2) {
  const v1 = calcVarna(rashi1);
  const v2 = calcVarna(rashi2);
  const order = { 'Brahmin': 4, 'Kshatriya': 3, 'Vaishya': 2, 'Shudra': 1 };
  if (order[v1] >= order[v2]) return { score: 1, max: 1, v1, v2 };
  return { score: 0, max: 1, v1, v2 };
}

// Vashya (2 points)
function calcVashyaScore(rashi1, rashi2) {
  const v1 = getVashya(rashi1);
  const v2 = getVashya(rashi2);
  if (v1 === v2) return { score: 2, max: 2, v1, v2 };
  // Some friendly combinations
  const friends = [
    ['Human', 'Wild'], ['Wild', 'Human'],
    ['Human', 'Water'], ['Water', 'Human'],
  ];
  if (friends.some(([a, b]) => (v1 === a && v2 === b))) return { score: 1, max: 2, v1, v2 };
  return { score: 0, max: 2, v1, v2 };
}

// Tara (3 points) — based on nakshatra distance
function calcTaraScore(nak1, nak2) {
  const idx1 = NAKSHATRAS.indexOf(nak1);
  const idx2 = NAKSHATRAS.indexOf(nak2);
  let rem = (idx2 - idx1 + 27) % 27;
  let taraNum = (rem % 9) + 1;
  const auspicious = [1, 2, 4, 6, 7, 9];
  const score = auspicious.includes(taraNum) ? 3 : 0;
  return { score, max: 3, taraNum };
}

// Yoni (4 points) — based on nakshatra animal
const YONI_ANIMALS = [
  'Horse', 'Elephant', 'Sheep', 'Serpent', 'Deer', 'Dog',
  'Cat', 'Rat', 'Buffalo', 'Lion', 'Mongoose', 'Cow',
  'Tiger', 'Monkey', 'Buffalo', 'Tiger', 'Deer', 'Cat',
  'Dog', 'Elephant', 'Mongoose', 'Monkey', 'Lion', 'Horse',
  'Cow', 'Serpent', 'Elephant',
];

const YONI_FRIENDLY = {
  'Horse': ['Horse', 'Elephant', 'Serpent'],
  'Elephant': ['Elephant', 'Horse', 'Mongoose'],
  'Sheep': ['Sheep', 'Cow', 'Monkey'],
  'Serpent': ['Serpent', 'Horse', 'Buffalo'],
  'Deer': ['Deer', 'Dog', 'Cow'],
  'Dog': ['Dog', 'Deer', 'Tiger'],
  'Cat': ['Cat', 'Rat', 'Tiger'],
  'Rat': ['Rat', 'Cat', 'Monkey'],
  'Buffalo': ['Buffalo', 'Serpent', 'Tiger'],
  'Lion': ['Lion', 'Monkey', 'Tiger'],
  'Mongoose': ['Mongoose', 'Elephant', 'Cow'],
  'Cow': ['Cow', 'Sheep', 'Deer'],
  'Tiger': ['Tiger', 'Dog', 'Lion'],
  'Monkey': ['Monkey', 'Lion', 'Sheep'],
};

function calcYoniScore(nak1, nak2) {
  const y1 = YONI_ANIMALS[NAKSHATRAS.indexOf(nak1)];
  const y2 = YONI_ANIMALS[NAKSHATRAS.indexOf(nak2)];
  if (y1 === y2) return { score: 4, max: 4, y1, y2 };
  if (YONI_FRIENDLY[y1]?.includes(y2) || YONI_FRIENDLY[y2]?.includes(y1)) return { score: 3, max: 4, y1, y2 };
  return { score: 1, max: 4, y1, y2 };
}

// Graha Maitri (5 points) — based on Moon sign lord friendship
const RASHI_LORDS = {
  'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
  'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
  'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter',
};

const LORD_FRIENDS = {
  'Sun': ['Moon', 'Mars', 'Jupiter'],
  'Moon': ['Sun', 'Mercury'],
  'Mars': ['Sun', 'Moon', 'Jupiter'],
  'Mercury': ['Sun', 'Venus'],
  'Jupiter': ['Sun', 'Moon', 'Mars'],
  'Venus': ['Mercury', 'Saturn'],
  'Saturn': ['Mercury', 'Venus'],
  'Rahu': ['Venus', 'Saturn'],
  'Ketu': ['Venus', 'Saturn'],
};

function calcGrahaMaitriScore(rashi1, rashi2) {
  const l1 = RASHI_LORDS[rashi1];
  const l2 = RASHI_LORDS[rashi2];
  if (l1 === l2) return { score: 5, max: 5, l1, l2 };
  if (LORD_FRIENDS[l1]?.includes(l2) && LORD_FRIENDS[l2]?.includes(l1)) return { score: 5, max: 5, l1, l2 };
  if (LORD_FRIENDS[l1]?.includes(l2) || LORD_FRIENDS[l2]?.includes(l1)) return { score: 3, max: 5, l1, l2 };
  // Neutral check
  const neutral = ['Mercury', 'Jupiter'];
  if (neutral.includes(l1) || neutral.includes(l2)) return { score: 2, max: 5, l1, l2 };
  return { score: 0, max: 5, l1, l2 };
}

// Gana (6 points) — Deva, Manushya, Rakshasa
const GANA_MAP = {
  'Ashwini': 'Deva', 'Bharani': 'Manushya', 'Krittika': 'Rakshasa', 'Rohini': 'Manushya',
  'Mrigashira': 'Deva', 'Ardra': 'Manushya', 'Punarvasu': 'Deva', 'Pushya': 'Deva',
  'Ashlesha': 'Rakshasa', 'Magha': 'Rakshasa', 'Purva Phalguni': 'Manushya', 'Uttara Phalguni': 'Manushya',
  'Hasta': 'Deva', 'Chitra': 'Rakshasa', 'Swati': 'Deva', 'Vishakha': 'Rakshasa',
  'Anuradha': 'Deva', 'Jyeshtha': 'Rakshasa', 'Mula': 'Rakshasa', 'Purva Ashadha': 'Manushya',
  'Uttara Ashadha': 'Manushya', 'Shravana': 'Deva', 'Dhanishta': 'Rakshasa', 'Shatabhisha': 'Rakshasa',
  'Purva Bhadrapada': 'Manushya', 'Uttara Bhadrapada': 'Manushya', 'Revati': 'Deva',
};

function calcGanaScore(nak1, nak2) {
  const g1 = GANA_MAP[nak1];
  const g2 = GANA_MAP[nak2];
  if (g1 === g2) return { score: 6, max: 6, g1, g2 };
  if ((g1 === 'Deva' && g2 === 'Manushya') || (g1 === 'Manushya' && g2 === 'Deva')) return { score: 5, max: 6, g1, g2 };
  if ((g1 === 'Deva' && g2 === 'Rakshasa') || (g1 === 'Rakshasa' && g2 === 'Deva')) return { score: 1, max: 6, g1, g2 };
  return { score: 3, max: 6, g1, g2 };
}

// Bhakoot (7 points) — based on Moon sign distance
function calcBhakootScore(rashi1, rashi2) {
  const idx1 = RASHIS.indexOf(rashi1);
  const idx2 = RASHIS.indexOf(rashi2);
  const dist = (idx2 - idx1 + 12) % 12;

  // Auspicious: 1/7 (5), 3/11 (5), 4/10 (5), 2/12 (4)
  if ([1, 7, 3, 11].includes(dist)) return { score: 7, max: 7, position: `${dist}/${12 - dist}` };
  if ([4, 10].includes(dist)) return { score: 7, max: 7, position: `${dist}/${12 - dist}` };
  if ([2, 12].includes(dist % 12 === 0 ? 12 : dist)) return { score: 4, max: 7, position: `${dist}/${12 - dist}` };
  if (dist === 6) return { score: 0, max: 7, position: '6/6 (Shadashtaka)' };
  if (dist === 0) return { score: 7, max: 7, position: 'Same sign' };
  return { score: 3, max: 7, position: `${dist}` };
}

// Nadi (8 points) — based on nakshatra group
const NADI_MAP = {
  'Ashwini': 'Aadi', 'Bharani': 'Aadi', 'Krittika': 'Aadi',
  'Rohini': 'Madhya', 'Mrigashira': 'Madhya', 'Ardra': 'Madhya',
  'Punarvasu': 'Antya', 'Pushya': 'Antya', 'Ashlesha': 'Antya',
  'Magha': 'Aadi', 'Purva Phalguni': 'Aadi', 'Uttara Phalguni': 'Aadi',
  'Hasta': 'Madhya', 'Chitra': 'Madhya', 'Swati': 'Madhya',
  'Vishakha': 'Antya', 'Anuradha': 'Antya', 'Jyeshtha': 'Antya',
  'Mula': 'Aadi', 'Purva Ashadha': 'Aadi', 'Uttara Ashadha': 'Aadi',
  'Shravana': 'Madhya', 'Dhanishta': 'Madhya', 'Shatabhisha': 'Madhya',
  'Purva Bhadrapada': 'Antya', 'Uttara Bhadrapada': 'Antya', 'Revati': 'Antya',
};

function calcNadiScore(nak1, nak2) {
  const n1 = NADI_MAP[nak1];
  const n2 = NADI_MAP[nak2];
  if (n1 === n2) return { score: 0, max: 8, n1, n2 }; // Same Nadi = Dosha
  return { score: 8, max: 8, n1, n2 };
}

// Mangal Dosha check (simplified)
function checkMangalDosha(rashi, nakshatra) {
  // Mars in 1st, 2nd, 4th, 7th, 8th, 12th from Moon causes Mangal Dosha
  const marsSign = 'Scorpio'; // Simplified — Mars placed in own sign
  const moonIdx = RASHIS.indexOf(rashi);
  const marsIdx = RASHIS.indexOf(marsSign);
  const dist = (marsIdx - moonIdx + 12) % 12;
  const doshaHouses = [0, 1, 3, 6, 7, 11];
  return doshaHouses.includes(dist);
}

// Main matching function
export function calculateMatch(person1, person2) {
  const rashi1 = person1.moonSign;
  const rashi2 = person2.moonSign;
  const nak1 = person1.nakshatra;
  const nak2 = person2.nakshatra;

  const varna = calcVarnaScore(rashi1, rashi2);
  const vashya = calcVashyaScore(rashi1, rashi2);
  const tara = calcTaraScore(nak1, nak2);
  const yoni = calcYoniScore(nak1, nak2);
  const grahaMaitri = calcGrahaMaitriScore(rashi1, rashi2);
  const gana = calcGanaScore(nak1, nak2);
  const bhakoot = calcBhakootScore(rashi1, rashi2);
  const nadi = calcNadiScore(nak1, nak2);

  const kootas = [
    { name: 'Varna', description: 'Spiritual compatibility & ego management', ...varna, weight: 1 },
    { name: 'Vashya', description: 'Mutual attraction & control', ...vashya, weight: 2 },
    { name: 'Tara', description: 'Health & well-being compatibility', ...tara, weight: 3 },
    { name: 'Yoni', description: 'Physical & sexual compatibility', ...yoni, weight: 4 },
    { name: 'Graha Maitri', description: 'Mental & emotional connection', ...grahaMaitri, weight: 5 },
    { name: 'Gana', description: 'Temperament & nature match', ...gana, weight: 6 },
    { name: 'Bhakoot', description: 'Financial & family prosperity', ...bhakoot, weight: 7 },
    { name: 'Nadi', description: 'Health of offspring & genetic match', ...nadi, weight: 8 },
  ];

  const totalScore = kootas.reduce((sum, k) => sum + k.score, 0);
  const maxScore = 36;

  const mangalDosha1 = checkMangalDosha(rashi1, nak1);
  const mangalDosha2 = checkMangalDosha(rashi2, nak2);

  // Determine verdict
  let verdict, verdictColor, verdictDescription;
  if (totalScore >= 28) {
    verdict = 'Excellent Match';
    verdictColor = '#22c55e';
    verdictDescription = 'Outstanding compatibility. This union is blessed with harmony, mutual understanding, and long-lasting happiness.';
  } else if (totalScore >= 24) {
    verdict = 'Very Good Match';
    verdictColor = '#22c55e';
    verdictDescription = 'Strong compatibility with minor differences that can be resolved through understanding and patience.';
  } else if (totalScore >= 18) {
    verdict = 'Good Match';
    verdictColor = '#d4a843';
    verdictDescription = 'Decent compatibility. Some adjustments needed, but overall a promising union with effort.';
  } else if (totalScore >= 12) {
    verdict = 'Average Match';
    verdictColor = '#f59e0b';
    verdictDescription = 'Moderate compatibility. Challenges exist but can be overcome with dedication and remedies.';
  } else {
    verdict = 'Poor Match';
    verdictColor = '#ef4444';
    verdictDescription = 'Significant compatibility issues. Careful consideration and astrological remedies are recommended.';
  }

  return {
    person1,
    person2,
    kootas,
    totalScore,
    maxScore,
    percentage: Math.round((totalScore / maxScore) * 100),
    verdict,
    verdictColor,
    verdictDescription,
    mangalDosha1,
    mangalDosha2,
    hasDosha: mangalDosha1 || mangalDosha2,
    nadiDosha: nadi.score === 0,
    recommendations: generateRecommendations(totalScore, mangalDosha1, mangalDosha2, nadi.score === 0),
  };
}

function generateRecommendations(score, dosha1, dosha2, nadiDosha) {
  const recs = [];
  if (score >= 24) recs.push({ icon: '✨', text: 'Strong foundation for a harmonious married life', type: 'positive' });
  if (score >= 18 && score < 24) recs.push({ icon: '💪', text: 'Focus on communication and mutual understanding', type: 'neutral' });
  if (score < 18) recs.push({ icon: '🙏', text: 'Consider consulting a Jyotish for detailed remedies', type: 'warning' });
  if (dosha1 || dosha2) recs.push({ icon: '🔥', text: 'Mangal Dosha detected — chanting Mangal mantras and performing remedies is advised', type: 'warning' });
  if (nadiDosha) recs.push({ icon: '⚕️', text: 'Nadi Dosha present — medical check-up before marriage is recommended', type: 'warning' });
  if (score >= 28) recs.push({ icon: '💕', text: 'Excellent planetary harmony supports love and longevity', type: 'positive' });
  recs.push({ icon: '🧘', text: 'Performing Ganesh Puja before wedding brings auspicious blessings', type: 'neutral' });
  return recs;
}

// Pre-built sample profiles for the form
export const SAMPLE_PROFILES = {
  male: {
    name: 'Arjun Sharma',
    moonSign: 'Taurus',
    nakshatra: 'Rohini',
  },
  female: {
    name: 'Priya Patel',
    moonSign: 'Cancer',
    nakshatra: 'Pushya',
  },
};

export { RASHIS, RASHI_SYMBOLS, NAKSHATRAS, GANA_MAP, NADI_MAP, RASHI_LORDS };