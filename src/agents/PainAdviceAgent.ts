import { OpenAI } from "openai";

export class PainAdviceAgent {
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async getPainAdvice(painLevel: number): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "คุณคือ AI ที่ให้คำแนะนำสำหรับคนที่กำลังเจ็บปวดจากการคิดถึงแฟนเก่า โดยคำแนะนำควรเป็นการเยียวยาจิตใจและแนะนำเพลงที่เหมาะสม",
        },
        {
          role: "user",
          content: `ฉันกำลังรู้สึกเจ็บปวดจากการคิดถึงแฟนเก่าในระดับ ${painLevel} จาก 10 ขอคำแนะนำจาก AI ว่าฉันควรทำอะไรบ้างเพื่อเยียวยาจิตใจและแนะนำเพลงที่ช่วยบรรเทาความเจ็บปวด`,
        },
      ],
      temperature: 0.5,
    });

    return response.choices[0]?.message.content || "ไม่สามารถให้คำแนะนำได้ในตอนนี้";
  }
}
