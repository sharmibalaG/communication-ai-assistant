import { GenerateDraftRequest, RefineDraftRequest } from "../models/CommunicationReq";

export class PromptBuilder {

  static buildDraftPrompt(
    request: GenerateDraftRequest
  ): string {

            return `
        You are an internal corporate communications assistant.

        Generate a professional communication.

        Communication Type:
        ${request.communicationType}

        Audience:
        ${request.audience}

        Event:
        ${request.eventName}

        Event Date:
        ${request.eventDate}

        Key Highlights:
        ${request.keyHighlights}

        Tone:
        ${request.tone}

        Requirements

        - Generate a concise subject.
        - Write a professional communication.
        - Keep it under 300 words.
        - Use bullet points where appropriate.
        - Do not invent information.
        `;
        }

  static buildRefinePrompt(
    request: RefineDraftRequest
  ): string {
 return `
                You are an expert internal corporate communications editor.

                Your task is to refine the communication while preserving its intent.

                Refinement Style:
                ${request.refinement}

                Current Subject:
                ${request.subject}

                Current Communication:
                ${request.communication}

                Requirements:

                - Preserve the original meaning.
                - Improve readability and grammar.
                - Keep the formatting where appropriate.
                - Apply the requested refinement style.
                - Always return both the subject and the communication.
                - If appropriate, improve or shorten the subject.
                - Never omit the subject.

                IMPORTANT:

                Return ONLY valid JSON.

                Do not use markdown.
                Do not use **bold**.
                Do not wrap the response in \`\`\`json.
                Do not include explanations.

                Return exactly this structure:

                {
                "subject": "Refined subject",
                "communication": "Refined communication"
                }
            `;
            }
}