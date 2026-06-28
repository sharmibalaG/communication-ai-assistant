import { GoogleGenAI } from "@google/genai";

import type { LLMProvider } from "./LLMProvider";

import type {
    GenerateDraftRequest,RefineDraftRequest
} from "../models/CommunicationReq";

import type { CommunicationResponse } from "../models/CommunicationRes";

export class GeminiProvider implements LLMProvider {

    private client = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
    });

    async generate(
        request: GenerateDraftRequest,
        prompt: string
    ): Promise<CommunicationResponse> {

        return this.execute(prompt);

    }

    async refine(
        request: RefineDraftRequest,
        prompt: string
    ): Promise<CommunicationResponse> {

        return this.execute(prompt);

    }

    /**
     * Executes the Gemini request.
     */
    private async execute(
        prompt: string
    ): Promise<CommunicationResponse> {

        const response =
            await this.client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

        return this.parseResponse(response.text ?? "");

    }

    /**
     * Parses Gemini response.
     */
    private parseResponse(
        text: string
    ): CommunicationResponse {

        try {

            const cleaned = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const result = JSON.parse(cleaned);

            return {
                subject: result.subject,
                communication: result.communication,
            };

        } catch {

            return this.extractFromText(text);

        }

    }

    /**
     * Fallback parser if Gemini doesn't return JSON.
     */
    private extractFromText(
        text: string
    ): CommunicationResponse {

        let subject = "";
        let communication = text.trim();

        const subjectMatch =
            communication.match(
                /^\**Subject:?\**\s*(.+)$/im
            );

        if (subjectMatch) {

            subject = subjectMatch[1].trim();

            communication =
                communication
                    .replace(subjectMatch[0], "")
                    .trim();

        }

        return {
            subject,
            communication,
        };

    }

}