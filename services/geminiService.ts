import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getCareerAdvice = async (query: string, context?: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      أنت مستشار مهني وتعليمي ذكي في منصة تسمى "فرص".
      دورك هو مساعدة المستخدمين في العثور على الفرص المناسبة لهم، سواء كانت وظائف، تدريب، أو منح دراسية.
      
      سياق المستخدم الحالي (إن وجد): ${context || 'لا يوجد سياق محدد'}
      
      سؤال المستخدم: ${query}
      
      أجب باللغة العربية بأسلوب ودود، محفز، ومختصر. قدم نصائح عملية واقترح خطوات تالية.
      لا تذكر أنك نموذج ذكاء اصطناعي، تصرف كجزء من فريق منصة "فرص".
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || 'عذراً، لم أتمكن من معالجة طلبك حالياً. حاول مرة أخرى.';
  } catch (error) {
    console.error("Gemini API Error:", error);
    return 'حدث خطأ في الاتصال بالمستشار الذكي. يرجى المحاولة لاحقاً.';
  }
};