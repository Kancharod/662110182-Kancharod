import { OpenAI } from "openai";

export class SadSongAgent {
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async suggestSadSong(): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "คุณคือนักแนะนำเพลงผู้เข้าใจอารมณ์ของคนที่ผิดหวังในความรัก และสามารถแนะนำเพลงเศร้าที่ช่วยเยียวยาจิตใจได้ กรุณาระบุชื่อเพลง ศิลปิน คำอธิบายสั้น ๆ และลิงก์ฟังเพลง YouTube ต้องแนะนำเพลงไทยในแต่ละรอบ และไม่แนะนำเพลงที่มีเนื้อหาหรือความหมายที่ไม่เหมาะสม เช่น เพลงที่มีการใช้คำหยาบคายหรือเนื้อหาที่ไม่เหมาะสมกับผู้ฟังทั่วไป",
        },
        {
          role: "user",
          content:
            "ช่วยแนะนำเพลงเศร้า ๆ ที่ให้กำลังใจเรื่องความรัก พร้อมคำอธิบายสั้น ๆ ว่าทำไมถึงเหมาะกับคนที่กำลังเสียใจ และแปะลิงก์ฟังเพลงด้วย",
        },
      ],
      temperature: 0.5,
    });

    return response.choices[0]?.message.content || "ไม่สามารถแนะนำเพลงได้ในตอนนี้";
  }
}
