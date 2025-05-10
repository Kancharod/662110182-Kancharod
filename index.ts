import dotenv from "dotenv";
import OpenAI from "openai";
import { SupportAgent } from "./src/agents/support-agent";
import { ConclusionAgent } from "./src/agents/conclusion-agent";
import { HealthAgent } from "./src/agents/health-agent";
import { buildHtmlFileandOpen } from "./src/utils/html";
import { SadSongAgent } from "./src/agents/sadsongAgent";
import { PainAdviceAgent } from "./src/agents/PainAdviceAgent";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const run = async (userPrompt: string) => {
  const healthAgent = new HealthAgent(client);
  const healthAdvice = await healthAgent.askHealthAdvice(userPrompt);
  console.log(healthAdvice);

  console.log("ไลค์โค้ชโดนๆแด่คุณเบบี้");
  const supportAgent = new SupportAgent(client);
  const supportResponse = await supportAgent.optionalSuggestions(
    healthAdvice
  );
  console.log(supportResponse);

  console.log("Conclusion the decision....");
  const conclusionAgent = new ConclusionAgent(client);
  const conclusionResponse = await conclusionAgent.conclude(
    healthAdvice,
    supportResponse
  );
  console.log(conclusionResponse);

  const sadSongAgent = new SadSongAgent(client);
  const sadSong = await sadSongAgent.suggestSadSong();

  const painLevel = 8; // Define a default pain level or get it from user input
  const painAdviceAgent = new PainAdviceAgent(client);
  const painAdvice = await painAdviceAgent.getPainAdvice(painLevel);

  await buildHtmlFileandOpen(
    healthAdvice,
    supportResponse,
    conclusionResponse,
    healthAdvice,
    sadSong,
    painLevel
  );
};

run("ชอบแฟนเก่าเพื่อน").then(() => {
  console.log(
    "---------------------------------------------------------------------------------"
  );
});