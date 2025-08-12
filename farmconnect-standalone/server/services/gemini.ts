import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getFarmingAdvice(userMessage: string): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return "I'm sorry, but the AI service is not configured. Please contact the administrator to set up the Google Gemini API key.";
    }

    const systemPrompt = `You are an expert agricultural advisor and farming consultant. You provide helpful, practical advice on:
    
    - Crop cultivation and farming techniques
    - Soil health and fertilization
    - Pest and disease management
    - Irrigation and water management
    - Seasonal planting schedules
    - Organic farming practices
    - Farm equipment and tools
    - Market trends and crop selection
    - Sustainable farming practices
    - Weather-related farming decisions
    
    Provide clear, actionable advice that farmers can implement. Be encouraging and supportive while being practical and realistic. If the question is not related to farming or agriculture, politely redirect the conversation back to farming topics.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ],
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error getting farming advice:', error);
    return "I'm experiencing some technical difficulties right now. Please try asking your question again in a moment.";
  }
}