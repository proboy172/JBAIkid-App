import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src/data');
    const songsEnPath = path.join(dataDir, 'songs-en.json');
    const songsViPath = path.join(dataDir, 'songs-vi.json');

    const songsEn = JSON.parse(fs.readFileSync(songsEnPath, 'utf8'));
    const songsVi = JSON.parse(fs.readFileSync(songsViPath, 'utf8'));

    const unsyncedEn = songsEn.filter((s: any) => s.lyrics.some((l: any) => !l.words || l.words.length === 0));
    const unsyncedVi = songsVi.filter((s: any) => s.lyrics.some((l: any) => !l.words || l.words.length === 0));

    const pending = [
      ...unsyncedEn.map((s: any) => ({ ...s, lang: 'en' })),
      ...unsyncedVi.map((s: any) => ({ ...s, lang: 'vi' }))
    ];

    return NextResponse.json({
      pending: pending.map(s => ({ id: s.id, title: s.title, lang: s.lang })),
      totalPending: pending.length
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { lang, id } = await req.json();
    
    if (!lang || !id) {
      return NextResponse.json({ error: 'Missing lang or id' }, { status: 400 });
    }

    console.log(`Starting AI Sync Worker for ${lang} - ${id}`);
    const { stdout, stderr } = await execPromise(`python ai-sync-worker.py ${lang} ${id}`);
    
    console.log(stdout);
    if (stderr) console.error(stderr);

    return NextResponse.json({ success: true, message: `Synced ${id} successfully` });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
