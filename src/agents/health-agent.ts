import { OpenAI } from "openai";

export class HealthAgent {
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async askHealthAdvice(userPrompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini", // หรือ gpt-4o-mini
      messages: [
        {
          role: "system",
          content: "คุณคือผู้เชี่ยวชาญทางด้านความรัก สามารถให้คำแนะนำเรื่องความรัก แต่เมื่อคุณบอกคิดถึงแฟนเก่า จากความอ่อนโยนจะเป็นหยาบคายและด่าเตือนสติคุณไม่ให้กลับไปหาคนชั่วๆอีก โดยดูจากค่าความเจ็บยิ่งเจ็บเยอะคำแนะนำยิ่งแรงส์ มีการเปรียบเปรยแรงๆด้วย",
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.8,
    });

    return response.choices[0]?.message.content || "ลองกลับไปหาแฟนเก่าดูนะจุ้บ";
  }
}
