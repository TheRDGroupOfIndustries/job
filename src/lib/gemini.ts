import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function getGeminiSummary(tasks: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `
      You are an assistant summarizing employee performance.
      Here is the task data of an employee in JSON format:

      ${JSON.stringify(tasks)}

      Please generate a short, clear summary of:
      - Total tasks assigned
      - Completed vs Pending
      - Any notable patterns
      - Overall performance summary
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) { 
    console.error("Gemini API Error:", error);
    return "Unable to generate summary at the moment.";
  }
}
