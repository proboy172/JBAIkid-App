const fs = require('fs');
let c = fs.readFileSync('src/data/songs.ts', 'utf8');

const replacements = {
  "yCjJyiqpAuU": "-4Mg7fnvxSE",
  "_6HzoUcx3eo": "U-SyODCCfFE",
  "XqZsoesa55w": "x_YBEYKQl_Y",
  "e_04ZrNroTo": "XdrgHGo70Nw",
  "QA48wTGbU7A": "lpBFYRatzzc",
  "w_lCi8U49mY": "wyTKE5hxBAo",
  "b0NHrFNZWh0": "oyYvqANIXUk",
  "MR5XSOdjKMA": "4VPnVH1ghCg",
  "M6LoRZsHMSs": "M6zpfu2HODE",
  "fDR_pRHYMGA": "tkivDao-Ip0",
  "9mmF8zOlh_g": "dBPqsDJ-eog",
  "ccEpTTZW34g": "E7KyWrDgJ3A",
  "ygcN65SlLFg": "UrmlgBdvf18",
  "0-Y7Qi3fMs0": "EHbDFi7RNH8",
  "uyvdG39-Gzk": "b-7pInWFqb0"
};

for (const [oldId, newId] of Object.entries(replacements)) {
  c = c.replace(`youtubeId: "${oldId}"`, `youtubeId: "${newId}"`);
}

fs.writeFileSync('src/data/songs.ts', c);
console.log('Restored English IDs');
