import { OpenAI } from 'openai'; 

export const translateplaceNameFromThaiToEnglish = async (place: string, client: OpenAI): Promise<string> => {
    const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL_NAME ?? "gpt-4o-mini",
        messages: [
            { role: 'user', content: `Translate the place name from Thai to English: ${place}` },
            { role: 'system', content: 'You are a translator agent.' },
        ],
        temperature: 0.1,
    })

    return response.choices[0].message.content ?? "I don't know";
}