import OpenAI from "openai";

export class ConclusionAgent {
    constructor(private readonly client: OpenAI) {}
    conclude = async (askHealthAdvice: string, optionalResponse: string): Promise<string> => {
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL_NAME ?? "gpt-4o-mini",
            messages: [
                { role: 'user', content : `the first decision is: ${askHealthAdvice}`},
                { role: 'user', content: `the optional decision is: ${optionalResponse}`},
                { role: 'system', content: 'You are decision critic. Review both of suggestions and pick the best one. Justify your reasoning.' },
            ],
            temperature: 0.5,
        })

        return response.choices[0].message.content ?? "I support you decision baby!"
    }
} 
