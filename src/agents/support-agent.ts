import { OpenAI } from 'openai'; // Ensure this is the correct library for OpenAI

export class SupportAgent {
    constructor(private readonly client: OpenAI) {}
    optionalSuggestions = async (message: string): Promise<string> => {
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL_NAME ?? "gpt-4o-mini",
            messages: [
                { role: 'user', content: message },
                { role: 'system', content: 'You are a cute and support agent that provides optional suggestions ให้คำแนะนำที่เหมาะสมและไม่ซ้ำกันในแต่ละครั้ง คำแนะนำเปลี่ยนแปลงตามความเหมาะสม' },
            ],
            temperature: 0.8,
        })

        return response.choices[0].message.content ?? "I support you decision baby!"
    }
}
