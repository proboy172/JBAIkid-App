// Script để tải phụ đề YouTube cho tất cả các bài hát
const { getSubtitles } = require('youtube-captions-scraper');

const songs = [
  // English
  { id: "twinkle", ytId: "yCjJyiqpAuU", lang: "en" },
  { id: "old-macdonald", ytId: "_6HzoUcx3eo", lang: "en" },
  { id: "baby-shark", ytId: "XqZsoesa55w", lang: "en" },
  { id: "wheels-on-bus", ytId: "yKcRU0gmdt4", lang: "en" },
  { id: "head-shoulders", ytId: "WX8HmogNyCY", lang: "en" },
  { id: "itsy-bitsy-spider", ytId: "TbKI-jjpPx8", lang: "en" },
  { id: "five-little-monkeys", ytId: "b0NHrFNZWh0", lang: "en" },
  { id: "baa-baa-black-sheep", ytId: "gT1m4G19Vj8", lang: "en" },
  { id: "if-youre-happy", ytId: "l4WNrvVjiTw", lang: "en" },
  { id: "row-your-boat", ytId: "Gzf0cTOAMPo", lang: "en" },
  { id: "bingo", ytId: "9o0_7s2N2_E", lang: "en" },
  { id: "abc-song", ytId: "sa0RUmHcFGc", lang: "en" },
  { id: "hickory-dickory", ytId: "RXJ9pET9Zzw", lang: "en" },
  { id: "london-bridge", ytId: "kO_P-6c8B6c", lang: "en" },
  { id: "mary-had-lamb", ytId: "s1R1YpxV3MU", lang: "en" },
  // Vietnamese
  { id: "ca-nha-thuong-nhau", ytId: "JspIY79HdY8", lang: "vi" },
  { id: "con-co-be-be", ytId: "jO2vrSXVDo0", lang: "vi" },
  { id: "bong-bong-bang-bang", ytId: "u3R0D189h1k", lang: "vi" },
  { id: "chau-len-ba", ytId: "Y1Gst_tvUYs", lang: "vi" },
  { id: "rua-mat-nhu-meo", ytId: "azQJNPftwhw", lang: "vi" },
  { id: "chu-ech-con", ytId: "UB6RylHKwM8", lang: "vi" },
];

async function main() {
  for (const song of songs) {
    try {
      // Try multiple languages
      let subs = await getSubtitles({ videoID: song.ytId, lang: song.lang }).catch(() => []);
      if (subs.length === 0) {
        subs = await getSubtitles({ videoID: song.ytId, lang: 'en' }).catch(() => []);
      }
      if (subs.length === 0) {
        // Try auto-generated
        subs = await getSubtitles({ videoID: song.ytId, lang: 'a.en' }).catch(() => []);
      }
      
      if (subs.length > 0) {
        console.log(`\n=== ${song.id} (${song.ytId}) === ${subs.length} lines`);
        subs.forEach(s => {
          console.log(`  ${parseFloat(s.start).toFixed(1)}s: ${s.text}`);
        });
      } else {
        console.log(`\n=== ${song.id} (${song.ytId}) === NO CAPTIONS`);
      }
    } catch (e) {
      console.log(`\n=== ${song.id} === ERROR: ${e.message}`);
    }
  }
}

main();
