import { exec } from 'child_process';
import { marked } from 'marked';
import * as path from 'path';
import process from 'process';
import * as fs from 'fs';

export const generateHtml = (
  weatherResponse: string,
  optionalResponse: string,
  conclusion: string,
  healthAdvice: string,
  sadSong: string,
  painLevel: number
): string => {

  let painAdvice = '';
  if (painLevel >= 8) {
    painAdvice = 'คุณเจ็บปวดมากจากการคิดถึงแฟนเก่า เราขอแนะนำให้คุณฟังเพลงเศร้าที่สะท้อนความรู้สึกนี้และเยียวยาจิตใจ...';
  } else if (painLevel >= 5) {
    painAdvice = 'ความเจ็บปวดอยู่ในระดับกลาง ลองให้เวลาตัวเองพักผ่อนและฟังเพลงที่สามารถช่วยบรรเทาความเศร้าได้...';
  } else {
    painAdvice = 'คุณอาจจะเริ่มก้าวข้ามความเจ็บปวดแล้ว แนะนำให้ฟังเพลงที่ช่วยเสริมพลังใจให้กลับมามีความสุขอีกครั้ง...';
  }

  return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>ไม่กลับไปหาแฟนเก่าแน่ 101</title>
    <style>
        body {
        font-family: 'Prompt', sans-serif;
        background-color: #f5f3f7;
        color: #444;
        max-width: 880px;
        margin: 0 auto;
        padding: 40px 24px;
        line-height: 1.8;
        }

        h1 {
        font-size: 2.6rem;
        text-align: center;
        margin-bottom: 40px;
        color: #b30059;
        }

        section {
        background: #ffe6ec;
        border: 1px solid #f3c6d1;
        border-radius: 18px;
        padding: 28px 26px;
        margin-bottom: 36px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        h2 {
        font-size: 1.6rem;
        margin-bottom: 18px;
        color: #b30059;
        border-left: 5px solid #b30059;
        padding-left: 12px;
        }

        p {
        margin: 0 0 16px;
        }

        iframe {
        width: 100%;
        max-width: 100%;
        height: 360px;
        border: none;
        border-radius: 12px;
        margin-top: 16px;
        }

        .icon {
        font-size: 1.4rem;
        margin-right: 6px;
        }

        @media (max-width: 600px) {
        h1 {
            font-size: 2rem;
        }

        h2 {
            font-size: 1.3rem;
        }

        body {
            padding: 24px 16px;
        }

        iframe {
            height: 240px;
        }
        }
    </style>
    </head>
    <body>

    <h1>💔 ปรึกษาความรัก 101</h1>

    <section>
        <h2>🩺 คำแนะนำจากผู้มากประสบการณ์</h2>
        ${marked(healthAdvice)}
    </section>

    <section>
        <h2>🧘‍♀️ ไลฟ์โค้ชโดนๆแด่คุณเบบี้</h2>
        ${marked(optionalResponse)}
    </section>

    <section>
        <h2>🎧 เพลงเศร้าเยียวยาหัวใจ</h2>
        ${marked(sadSong)}
    </section>

    <section>
        <h2>💢 ระดับความเจ็บปวดจากการคิดถึงแฟนเก่า: ${painLevel} / 10</h2>
        <p>${marked(painAdvice)}</p>
    </section>

    </body>
    </html>
  `;
};

export const buildHtmlFileandOpen = (
  weatherResponse: string,
  optionalResponse: string,
  conclusion: string,
  healthAdvice: string,
  sadSong: string,
  painLevel: number
) => {
  const html: string = generateHtml(weatherResponse, optionalResponse, conclusion, healthAdvice, sadSong, painLevel);
  const fileName: string = "activity_suggestion.html";

  fs.writeFile(fileName, html, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      return;
    }
    console.log(`HTML File created: ${fileName}`);
    openInBrowser(fileName);
  });
};

export const openInBrowser = (fileName: string) => {
  const filePath = path.resolve(fileName)
  const command = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';

  exec(`${command} ${filePath}`, (error) => {
    if (error) {
      console.error(`Error opening file: ${error}`);
    }
  });
}
