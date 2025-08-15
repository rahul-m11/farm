import { GoogleGenAI } from "@google/genai";

// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "AIzaSyDOqXnEZruboez8lur-ou3CXftSG1nurNQ" });

export interface FarmingChatResponse {
  message: string;
  confidence: number;
}

export async function getFarmingAdvice(userMessage: string): Promise<FarmingChatResponse> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `You are an expert agricultural advisor with deep knowledge of farming practices, crop management, pest control, weather patterns, and sustainable agriculture. Provide helpful, accurate, and practical advice to farmers. Keep responses concise but informative. Always consider safety and environmental sustainability in your recommendations.`,
      },
      contents: userMessage,
    });

    const message = response.text || "I'm sorry, I couldn't process your request. Please try again.";
    
    return {
      message,
      confidence: 0.9 // High confidence for Gemini responses
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      message: "I'm experiencing technical difficulties right now. Please try again later or contact support if the issue persists.",
      confidence: 0.0
    };
  }
}

export async function generateProductDescription(productName: string, category: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are a marketing expert specializing in agricultural products. Create compelling, accurate product descriptions that highlight freshness, quality, and farming practices."
      },
      contents: `Write a brief product description for: ${productName} in the ${category} category. Keep it under 100 words and focus on quality, freshness, and appeal to buyers.`,
    });

    return response.text || `Fresh ${productName} from local farms.`;
  } catch (error) {
    console.error("Gemini API error:", error);
    return `Fresh ${productName} from local farms.`;
  }
}
