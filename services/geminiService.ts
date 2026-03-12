
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

// Standard client for fast tasks
const aiStandard = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generatePostDraft = async (topic: string): Promise<string> => {
  try {
    const response = await aiStandard.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short social media post about: ${topic}. Max 140 chars. Use emojis.`,
      config: { 
        temperature: 0.6,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      }
    });
    return response.text || 'Failed to generate draft.';
  } catch (error) {
    console.error("Gemini Error:", error);
    return 'Error generating AI draft.';
  }
};

export const generateHDImage = async (prompt: string, size: "1K" | "2K" = "1K"): Promise<string | null> => {
  try {
    const aiPro = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
    const response = await aiPro.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `HD, cinematic: ${prompt}` }]
      },
      config: {
        imageConfig: { aspectRatio: '1:1', imageSize: size },
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("HD Image Error:", error);
    return null;
  }
};

export const generateNexusAvatar = async (userName: string, customPrompt?: string): Promise<string | null> => {
  try {
    const aiPro = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
    const defaultPrompt = `Futuristic professional avatar for ${userName}. Cyber-minimalist, cinematic, indigo/emerald palette, high-definition.`;
    const finalPrompt = customPrompt ? `Avatar for ${userName}: ${customPrompt}. HD tech aesthetic.` : defaultPrompt;
    
    const response = await aiPro.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: finalPrompt }]
      },
      config: {
        imageConfig: { aspectRatio: '1:1', imageSize: "1K" },
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Nexus Avatar Error:", error);
    return null;
  }
};

export const generateVideo = async (prompt: string): Promise<string | null> => {
  try {
    const aiPro = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let operation = await aiPro.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic HD quality video of: ${prompt}. High detail, fluid motion.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      operation = await aiPro.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) return null;

    const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video Gen Error:", error);
    return null;
  }
};

export const summarizeFeed = async (posts: string[]): Promise<string> => {
  try {
    const response = await aiStandard.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following social media feed content in 2 bullet points: \n${posts.join('\n')}`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      }
    });
    return response.text || 'No summary available.';
  } catch (error) {
    return 'Summary unavailable.';
  }
};
