import { GoogleGenerativeAI } from '@google/generative-ai';
import { useApiKeyStore } from '../store/apiKey';

export const useGemini = () => {
  const apiKey = useApiKeyStore((state) => state.apiKey);
  
  if (!apiKey) {
    throw new Error('API key not set');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const generateResponse = async (prompt: string) => {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  };

  return { generateResponse };
};