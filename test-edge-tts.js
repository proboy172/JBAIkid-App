const { EdgeTTS } = require('@seepine/edge-tts');

async function test() {
  const tts = new EdgeTTS({
    voice: 'vi-VN-HoaiMyNeural', // Vietnamese female neural voice
  });
  
  await tts.ttsPromise('Xin chào các bạn nhỏ, cô là giáo viên AI đây!', 'test.mp3');
  console.log('Done!');
}
test();
