
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getSiteSuggestions = async (prompt: string): Promise<GeminiResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user wants to create a website on federiko.net with the following idea: "${prompt}". 
    Provide a catchy name, a professional description, and one clever suggestion to make the site better.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedName: { type: Type.STRING },
          suggestedDescription: { type: Type.STRING },
          suggestion: { type: Type.STRING }
        },
        required: ["suggestedName", "suggestedDescription", "suggestion"]
      }
    }
  });

  return JSON.parse(response.text);
};
