const fs = require('fs');

// The original English lyrics structure
const songs = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    emoji: "⭐",
    color: "#FBBF24",
    youtubeId: "yCjJyiqpAuU",
    localVideo: "/videos/twinkle.mp4",
    lyrics: [
      { text: "Twinkle, twinkle, little star" },
      { text: "How I wonder what you are" },
      { text: "Up above the world so high" },
      { text: "Like a diamond in the sky" },
      { text: "Twinkle, twinkle, little star" },
      { text: "How I wonder what you are" },
      { text: "Twinkle, twinkle, little star" },
      { text: "How I wonder what you are" },
      { text: "Up above the world so high" },
      { text: "Like a diamond in the sky" },
      { text: "Twinkle, twinkle, little star" },
      { text: "How I wonder what you are" }
    ]
  },
  {
    id: "old-macdonald",
    title: "Old MacDonald Had a Farm",
    emoji: "🐄",
    color: "#34D399",
    youtubeId: "_6HzoUcx3eo",
    localVideo: "/videos/old-macdonald.mp4",
    lyrics: [
      { text: "Old MacDonald had a farm, E-I-E-I-O!" },
      { text: "And on his farm he had a cow, E-I-E-I-O!" },
      { text: "With a moo-moo here and a moo-moo there" },
      { text: "Here a moo, there a moo, everywhere a moo-moo" },
      { text: "Old MacDonald had a farm, E-I-E-I-O!" },
      { text: "Old MacDonald had a farm, E-I-E-I-O!" },
      { text: "And on his farm he had a pig, E-I-E-I-O!" },
      { text: "With an oink-oink here and an oink-oink there" },
      { text: "Here an oink, there an oink, everywhere an oink-oink" },
      { text: "Old MacDonald had a farm, E-I-E-I-O!" },
      { text: "Old MacDonald had a farm, E-I-E-I-O!" },
      { text: "And on his farm he had a duck, E-I-E-I-O!" },
      { text: "With a quack-quack here and a quack-quack there" },
      { text: "Here a quack, there a quack, everywhere a quack-quack" },
      { text: "Old MacDonald had a farm, E-I-E-I-O!" }
    ]
  },
  {
    id: "baby-shark",
    title: "Baby Shark",
    emoji: "🦈",
    color: "#38BDF8",
    youtubeId: "XqZsoesa55w",
    localVideo: "/videos/baby-shark.mp4",
    lyrics: [
      { text: "Baby shark, doo-doo, doo-doo, doo-doo" },
      { text: "Baby shark, doo-doo, doo-doo, doo-doo" },
      { text: "Baby shark, doo-doo, doo-doo, doo-doo" },
      { text: "Baby shark!" },
      { text: "Mommy shark, doo-doo, doo-doo, doo-doo" },
      { text: "Mommy shark, doo-doo, doo-doo, doo-doo" },
      { text: "Mommy shark, doo-doo, doo-doo, doo-doo" },
      { text: "Mommy shark!" },
      { text: "Daddy shark, doo-doo, doo-doo, doo-doo" },
      { text: "Daddy shark, doo-doo, doo-doo, doo-doo" },
      { text: "Daddy shark, doo-doo, doo-doo, doo-doo" },
      { text: "Daddy shark!" },
      { text: "Grandma shark, doo-doo, doo-doo, doo-doo" },
      { text: "Grandma shark, doo-doo, doo-doo, doo-doo" },
      { text: "Grandma shark, doo-doo, doo-doo, doo-doo" },
      { text: "Grandma shark!" },
      { text: "Let's go hunt, doo-doo, doo-doo, doo-doo" },
      { text: "Let's go hunt, doo-doo, doo-doo, doo-doo" },
      { text: "Let's go hunt, doo-doo, doo-doo, doo-doo" },
      { text: "Let's go hunt!" },
      { text: "Run away! Doo-doo, doo-doo, doo-doo" },
      { text: "Run away! Doo-doo, doo-doo, doo-doo" },
      { text: "Run away! Doo-doo, doo-doo, doo-doo" },
      { text: "Run away!" },
      { text: "Safe at last, doo-doo, doo-doo, doo-doo" },
      { text: "Safe at last, doo-doo, doo-doo, doo-doo" },
      { text: "Safe at last, doo-doo, doo-doo, doo-doo" },
      { text: "Safe at last!" }
    ]
  },
  {
    id: "wheels-on-bus",
    title: "Wheels On The Bus",
    emoji: "🚌",
    color: "#FB923C",
    youtubeId: "yKcRU0gmdt4",
    localVideo: "/videos/wheels-on-bus.mp4",
    lyrics: [
      { text: "The wheels on the bus go round and round" },
      { text: "Round and round, round and round" },
      { text: "The wheels on the bus go round and round" },
      { text: "All through the town!" },
      { text: "The doors on the bus go open and shut" },
      { text: "Open and shut, open and shut" },
      { text: "The doors on the bus go open and shut" },
      { text: "All through the town!" },
      { text: "The wipers on the bus go swish, swish, swish" },
      { text: "Swish, swish, swish, swish, swish, swish" },
      { text: "The wipers on the bus go swish, swish, swish" },
      { text: "All through the town!" },
      { text: "The horn on the bus goes beep, beep, beep" },
      { text: "Beep, beep, beep, beep, beep, beep" },
      { text: "The horn on the bus goes beep, beep, beep" },
      { text: "All through the town!" }
    ]
  },
  {
    id: "head-shoulders",
    title: "Head, Shoulders, Knees & Toes",
    emoji: "🧒",
    color: "#C084FC",
    youtubeId: "WX8HmogNyCY",
    localVideo: "/videos/head-shoulders.mp4",
    lyrics: [
      { text: "Head, shoulders, knees and toes" },
      { text: "Knees and toes" },
      { text: "Head, shoulders, knees and toes" },
      { text: "Knees and toes" },
      { text: "And eyes, and ears, and mouth, and nose" },
      { text: "Head, shoulders, knees and toes" },
      { text: "Knees and toes!" },
      { text: "Head, shoulders, knees and toes" },
      { text: "Knees and toes" },
      { text: "Head, shoulders, knees and toes" },
      { text: "Knees and toes" },
      { text: "And eyes, and ears, and mouth, and nose" },
      { text: "Head, shoulders, knees and toes" },
      { text: "Knees and toes!" }
    ]
  },
  {
    id: "itsy-bitsy-spider",
    title: "Itsy Bitsy Spider",
    emoji: "🕷️",
    color: "#60A5FA",
    youtubeId: "TbKI-jjpPx8",
    localVideo: "/videos/itsy-bitsy-spider.mp4",
    lyrics: [
      { text: "The itsy bitsy spider climbed up the waterspout" },
      { text: "Down came the rain and washed the spider out" },
      { text: "Out came the sun and dried up all the rain" },
      { text: "And the itsy bitsy spider climbed up the spout again" },
      { text: "The itsy bitsy spider climbed up the waterspout" },
      { text: "Down came the rain and washed the spider out" },
      { text: "Out came the sun and dried up all the rain" },
      { text: "And the itsy bitsy spider climbed up the spout again" }
    ]
  },
  {
    id: "five-little-monkeys",
    title: "Five Little Monkeys",
    emoji: "🐒",
    color: "#F472B6",
    youtubeId: "b0NHrFNZWh0",
    localVideo: "/videos/five-little-monkeys.mp4",
    lyrics: [
      { text: "Five little monkeys jumping on the bed" },
      { text: "One fell off and bumped his head" },
      { text: "Mama called the doctor and the doctor said" },
      { text: "No more monkeys jumping on the bed!" },
      { text: "Four little monkeys jumping on the bed" },
      { text: "One fell off and bumped his head" },
      { text: "Mama called the doctor and the doctor said" },
      { text: "No more monkeys jumping on the bed!" },
      { text: "Three little monkeys jumping on the bed" },
      { text: "One fell off and bumped his head" },
      { text: "Mama called the doctor and the doctor said" },
      { text: "No more monkeys jumping on the bed!" },
      { text: "Two little monkeys jumping on the bed" },
      { text: "One fell off and bumped his head" },
      { text: "Mama called the doctor and the doctor said" },
      { text: "No more monkeys jumping on the bed!" },
      { text: "One little monkey jumping on the bed" },
      { text: "He fell off and bumped his head" },
      { text: "Mama called the doctor and the doctor said" },
      { text: "No more monkeys jumping on the bed!" }
    ]
  },
  {
    id: "baa-baa-black-sheep",
    title: "Baa Baa Black Sheep",
    emoji: "🐑",
    color: "#9CA3AF",
    youtubeId: "gT1m4G19Vj8",
    localVideo: "/videos/baa-baa-black-sheep.mp4",
    lyrics: [
      { text: "Baa, baa, black sheep, have you any wool?" },
      { text: "Yes, sir, yes, sir, three bags full" },
      { text: "One for the master, and one for the dame" },
      { text: "And one for the little boy who lives down the lane" },
      { text: "Baa, baa, black sheep, have you any wool?" },
      { text: "Yes, sir, yes, sir, three bags full" },
      { text: "One for the master, and one for the dame" },
      { text: "And one for the little boy who lives down the lane" }
    ]
  },
  {
    id: "if-youre-happy",
    title: "If You're Happy and You Know It",
    emoji: "😊",
    color: "#34D399",
    youtubeId: "l4WNrvVjiTw",
    localVideo: "/videos/if-youre-happy.mp4",
    lyrics: [
      { text: "If you're happy and you know it, clap your hands" },
      { text: "If you're happy and you know it, clap your hands" },
      { text: "If you're happy and you know it" },
      { text: "And you really want to show it" },
      { text: "If you're happy and you know it, clap your hands" },
      { text: "If you're happy and you know it, stomp your feet" },
      { text: "If you're happy and you know it, stomp your feet" },
      { text: "If you're happy and you know it" },
      { text: "And you really want to show it" },
      { text: "If you're happy and you know it, stomp your feet" },
      { text: "If you're happy and you know it, shout hooray!" },
      { text: "If you're happy and you know it, shout hooray!" },
      { text: "If you're happy and you know it" },
      { text: "And you really want to show it" },
      { text: "If you're happy and you know it, shout hooray!" }
    ]
  },
  {
    id: "row-your-boat",
    title: "Row, Row, Row Your Boat",
    emoji: "🛶",
    color: "#38BDF8",
    youtubeId: "Gzf0cTOAMPo",
    localVideo: "/videos/row-your-boat.mp4",
    lyrics: [
      { text: "Row, row, row your boat" },
      { text: "Gently down the stream" },
      { text: "Merrily, merrily, merrily, merrily" },
      { text: "Life is but a dream" },
      { text: "Row, row, row your boat" },
      { text: "Gently down the stream" },
      { text: "Merrily, merrily, merrily, merrily" },
      { text: "Life is but a dream" },
      { text: "Row, row, row your boat" },
      { text: "Gently down the stream" },
      { text: "If you see a crocodile" },
      { text: "Don't forget to scream!" }
    ]
  },
  {
    id: "bingo",
    title: "BINGO",
    emoji: "🐶",
    color: "#FBBF24",
    youtubeId: "9o0_7s2N2_E",
    localVideo: "/videos/bingo.mp4",
    lyrics: [
      { text: "There was a farmer had a dog" },
      { text: "And Bingo was his name-o" },
      { text: "B-I-N-G-O, B-I-N-G-O, B-I-N-G-O" },
      { text: "And Bingo was his name-o" },
      { text: "There was a farmer had a dog" },
      { text: "And Bingo was his name-o" },
      { text: "(clap)-I-N-G-O, (clap)-I-N-G-O, (clap)-I-N-G-O" },
      { text: "And Bingo was his name-o" },
      { text: "There was a farmer had a dog" },
      { text: "And Bingo was his name-o" },
      { text: "(clap-clap)-N-G-O, (clap-clap)-N-G-O" },
      { text: "And Bingo was his name-o" }
    ]
  },
  {
    id: "abc-song",
    title: "ABC Song",
    emoji: "🔤",
    color: "#A78BFA",
    youtubeId: "sa0RUmHcFGc",
    localVideo: "/videos/abc-song.mp4",
    lyrics: [
      { text: "A, B, C, D, E, F, G" },
      { text: "H, I, J, K, L, M, N, O, P" },
      { text: "Q, R, S, T, U, V" },
      { text: "W, X, Y and Z" },
      { text: "Now I know my ABCs" },
      { text: "Next time won't you sing with me?" },
      { text: "A, B, C, D, E, F, G" },
      { text: "H, I, J, K, L, M, N, O, P" },
      { text: "Q, R, S, T, U, V" },
      { text: "W, X, Y and Z" },
      { text: "Now I know my ABCs" },
      { text: "Next time won't you sing with me?" }
    ]
  },
  {
    id: "hickory-dickory",
    title: "Hickory Dickory Dock",
    emoji: "🕰️",
    color: "#F87171",
    youtubeId: "RXJ9pET9Zzw",
    localVideo: "/videos/hickory-dickory.mp4",
    lyrics: [
      { text: "Hickory dickory dock" },
      { text: "The mouse ran up the clock" },
      { text: "The clock struck one" },
      { text: "The mouse ran down" },
      { text: "Hickory dickory dock" },
      { text: "Tick tock, tick tock, tick tock, tick tock" },
      { text: "Hickory dickory dock" },
      { text: "The mouse ran up the clock" },
      { text: "The clock struck two" },
      { text: "The mouse said boo!" },
      { text: "Hickory dickory dock" },
      { text: "Tick tock, tick tock, tick tock, tick tock" }
    ]
  },
  {
    id: "london-bridge",
    title: "London Bridge Is Falling Down",
    emoji: "🌉",
    color: "#60A5FA",
    youtubeId: "kO_P-6c8B6c",
    localVideo: "/videos/london-bridge.mp4",
    lyrics: [
      { text: "London Bridge is falling down" },
      { text: "Falling down, falling down" },
      { text: "London Bridge is falling down" },
      { text: "My fair lady" },
      { text: "Build it up with iron bars" },
      { text: "Iron bars, iron bars" },
      { text: "Build it up with iron bars" },
      { text: "My fair lady" },
      { text: "London Bridge is falling down" },
      { text: "Falling down, falling down" },
      { text: "London Bridge is falling down" },
      { text: "My fair lady" }
    ]
  },
  {
    id: "mary-had-lamb",
    title: "Mary Had a Little Lamb",
    emoji: "🐑",
    color: "#34D399",
    youtubeId: "s1R1YpxV3MU",
    localVideo: "/videos/mary-had-lamb.mp4",
    lyrics: [
      { text: "Mary had a little lamb" },
      { text: "Little lamb, little lamb" },
      { text: "Mary had a little lamb" },
      { text: "Its fleece was white as snow" },
      { text: "And everywhere that Mary went" },
      { text: "Mary went, Mary went" },
      { text: "Everywhere that Mary went" },
      { text: "The lamb was sure to go" },
      { text: "It followed her to school one day" },
      { text: "School one day, school one day" },
      { text: "It followed her to school one day" },
      { text: "Which was against the rules" }
    ]
  }
];

if (!fs.existsSync('whisper-en-words.json')) {
  console.log("Waiting for JSON file...");
  process.exit(1);
}

const whisperData = JSON.parse(fs.readFileSync('whisper-en-words.json', 'utf8'));

// Simple clean logic
const cleanStr = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

for (const song of songs) {
  const wData = whisperData[song.id];
  if (!wData) {
    console.log(`No whisper data for ${song.id}`);
    continue;
  }
  
  // Create a flat array of all words from Whisper
  let allWords = [];
  for (const seg of wData) {
    for (const w of seg.words) {
      allWords.push(w);
    }
  }
  
  // Assign words to intended lines
  let wIdx = 0;
  for (let i = 0; i < song.lyrics.length; i++) {
    const line = song.lyrics[i];
    const intendedWords = line.text.split(/\s+/);
    line.time = wIdx < allWords.length ? allWords[wIdx].start : 0;
    line.words = [];
    
    for (let j = 0; j < intendedWords.length; j++) {
      if (wIdx < allWords.length) {
        line.words.push({
          text: intendedWords[j],
          duration: parseFloat((allWords[wIdx].end - allWords[wIdx].start).toFixed(2))
        });
        wIdx++;
      } else {
        line.words.push({
          text: intendedWords[j],
          duration: 0.5
        });
      }
    }
    
    // Fix last word duration to bridge gap
    if (line.words.length > 0 && i < song.lyrics.length - 1 && wIdx < allWords.length) {
       const gap = allWords[wIdx].start - allWords[wIdx - 1].end;
       if (gap > 0 && gap < 2) {
          line.words[line.words.length - 1].duration += gap;
          line.words[line.words.length - 1].duration = parseFloat(line.words[line.words.length - 1].duration.toFixed(2));
       }
    }
  }
}

// Generate the TypeScript file content
let tsContent = `import { Song } from "./songs";\n\nexport const songsEnNew: Song[] = [\n`;
for (let i = 0; i < songs.length; i++) {
  tsContent += `  {\n`;
  tsContent += `    id: "${songs[i].id}",\n`;
  tsContent += `    title: "${songs[i].title}",\n`;
  tsContent += `    emoji: "${songs[i].emoji}",\n`;
  tsContent += `    color: "${songs[i].color}",\n`;
  tsContent += `    youtubeId: "${songs[i].youtubeId}",\n`;
  tsContent += `    localVideo: "${songs[i].localVideo}",\n`;
  tsContent += `    lyrics: [\n`;
  for (let j = 0; j < songs[i].lyrics.length; j++) {
    const l = songs[i].lyrics[j];
    tsContent += `      { \n`;
    tsContent += `        time: ${l.time},\n`;
    tsContent += `        text: ${JSON.stringify(l.text)},\n`;
    tsContent += `        words: [\n`;
    tsContent += `          ` + l.words.map(w => `{ text: ${JSON.stringify(w.text)}, duration: ${w.duration} }`).join(', ') + `\n`;
    tsContent += `        ]\n`;
    tsContent += `      }${j < songs[i].lyrics.length - 1 ? ',' : ''}\n`;
  }
  tsContent += `    ]\n  }${i < songs.length - 1 ? ',' : ''}\n`;
}
tsContent += `];\n`;

fs.writeFileSync('src/data/songs-en.ts', tsContent, 'utf8');
console.log("Successfully generated src/data/songs-en.ts with AI sync!");
