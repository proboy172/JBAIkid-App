const { YoutubeTranscript } = require('youtube-transcript');
const fs = require('fs');

const youtubeIds = [
  // English
  "-4Mg7fnvxSE", "U-SyODCCfFE", "x_YBEYKQl_Y", "XdrgHGo70Nw", "lpBFYRatzzc",
  "wyTKE5hxBAo", "oyYvqANIXUk", "4VPnVH1ghCg", "M6zpfu2HODE", "tkivDao-Ip0",
  "dBPqsDJ-eog", "E7KyWrDgJ3A", "UrmlgBdvf18", "EHbDFi7RNH8", "b-7pInWFqb0",
  // Vietnamese
  "-HclLZMid-g", "H-nFnnlNBmc", "wfk1ncPXOsc", "2-51eIpWilk", "nRWWUiJolpA",
  "f5w1xAjRnW8", "T00p7qKWTWw", "YWsNJV-X68s", "KNYVG4YwOG4", "3QBV_9yed60",
  "uF3EdeLg-p0", "ZEmfySoujAk", "g1QXSvOqcTM", "gwWpObWuUfg", "sxVx0SgNAAQ"
];

async function main() {
  const results = {};
  for (const id of youtubeIds) {
    console.log(`Fetching ${id}...`);
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(id);
      console.log(`Success ${id}: ${transcript.length} lines`);
      results[id] = transcript;
    } catch (e) {
      console.log(`Failed ${id}: ${e.message}`);
    }
  }
  fs.writeFileSync('transcripts.json', JSON.stringify(results, null, 2));
  console.log("Done");
}
main();
