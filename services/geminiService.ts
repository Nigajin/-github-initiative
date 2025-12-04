import { GoogleGenAI } from "@google/genai";

// Ensure API key is present
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API Key is missing. The app will not function correctly without it.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

export const getDailyEncouragement = async (): Promise<{text: string, author: string}> => {
    try {
        const model = ai.models;
        const result = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: "사회 생활을 다시 시작하려는 청년이나 지친 사람들을 위한 짧고 따뜻한 명언이나 격려의 한 마디를 JSON 형식으로 추천해줘. 형식: { \"text\": \"명언 내용\", \"author\": \"저자 또는 출처(없으면 '디디')\" }",
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const text = result.text;
        if(text) {
             return JSON.parse(text);
        }
        throw new Error("No text returned");
    } catch (error) {
        return {
            text: "가장 큰 영광은 한 번도 실패하지 않음이 아니라, 실패할 때마다 다시 일어서는 데 있다.",
            author: "공자"
        };
    }
};

export const suggestTasks = async (mood: string): Promise<string[]> => {
    try {
        const model = ai.models;
        const result = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: `사용자의 기분이 '${mood}'일 때 할 수 있는 부담 없고 아주 작은 활동 3가지만 추천해줘. JSON Array string output. 예: ["창문 1분 열기", "좋아하는 노래 1곡 듣기"]`,
            config: {
                responseMimeType: "application/json"
            }
        });
        const text = result.text;
        if(text) return JSON.parse(text);
        return [];
    } catch (e) {
        return ["심호흡 3번 하기", "어깨 스트레칭 하기", "물 한 모금 마시기"];
    }
};