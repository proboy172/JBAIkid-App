const { execSync } = require('child_process');
const fs = require('fs');
const { WaveFile } = require('wavefile');
const { pipeline, env } = require('@xenova/transformers');

// Configure ONNX runtime to use local files if possible, or download
env.allowLocalModels = true;
env.useBrowserCache = false;

async function testSync(youtubeId, expectedText) {
    console.log(`[1] Downloading Audio for ${youtubeId}...`);
    try {
        if (fs.existsSync('temp.wav')) fs.unlinkSync('temp.wav');
        execSync(`.\\yt-dlp.exe -x --audio-format wav --audio-quality 0 ${youtubeId} -o temp.wav`);
    } catch(e) {
        console.error("Failed to download audio:", e.message);
        return;
    }
    
    console.log(`[2] Processing Audio...`);
    let buffer = fs.readFileSync('temp.wav');
    let wav = new WaveFile(buffer);
    wav.toBitDepth('32f');
    wav.toSampleRate(16000);
    let audioData = wav.getSamples();
    if (Array.isArray(audioData)) {
        if (audioData.length > 1) {
            const SCALING_FACTOR = Math.sqrt(2);
            for (let i = 0; i < audioData[0].length; ++i) {
                audioData[0][i] = SCALING_FACTOR * (audioData[0][i] + audioData[1][i]) / 2;
            }
        }
        audioData = audioData[0];
    }
    
    console.log(`[3] Running Whisper AI...`);
    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny');
    
    const output = await transcriber(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: 'vietnamese',
        task: 'transcribe',
        return_timestamps: true
    });
    
    console.log('\n--- AI TRANSCRIPT ---');
    console.log(output);
    console.log('---------------------\n');
    
    fs.writeFileSync('whisper-output.json', JSON.stringify(output, null, 2));
}

// Test with "Một con vịt"
testSync('f5w1xAjRnW8', 'Một con vịt xòe ra hai cái cánh');
