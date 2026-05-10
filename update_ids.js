const fs = require('fs');
const ids = require('./ids.json');
let content = fs.readFileSync('src/data/songs.ts', 'utf8');

const idList = Object.values(ids);
let viIndex = 15;

const enSongs = [
  'twinkle', 'old-macdonald', 'baby-shark', 'wheels-on-bus', 'head-shoulders',
  'itsy-bitsy-spider', 'five-little-monkeys', 'baa-baa-black-sheep', 'if-youre-happy',
  'row-your-boat', 'bingo', 'abc-song', 'hickory-dickory', 'london-bridge', 'mary-had-lamb'
];

enSongs.forEach((id, idx) => {
  content = content.replace(new RegExp('id: "' + id + '",[\\s\\S]*?youtubeId: "(.*?)"'), (match, p1) => {
    return match.replace(p1, idList[idx]);
  });
});

const viSongs = [
  'ca-nha-thuong-nhau', 'con-co-be-be', 'bong-bong-bang-bang', 'chau-len-ba',
  'rua-mat-nhu-meo', 'chu-ech-con', 'hai-con-than-lan', 'mot-con-vit',
  'ba-ba-di-ban', 'dan-ga-trong-san', 'bac-kim-thang', 'chi-ong-nau',
  'qua-gi', 'trai-dat-nay', 'me-oi-tai-sao'
];

viSongs.forEach((id, idx) => {
  content = content.replace(new RegExp('id: "' + id + '",[\\s\\S]*?youtubeId: "(.*?)"'), (match, p1) => {
    return match.replace(p1, idList[viIndex + idx]);
  });
});

fs.writeFileSync('src/data/songs.ts', content);
console.log('Done replacing YouTube IDs.');
