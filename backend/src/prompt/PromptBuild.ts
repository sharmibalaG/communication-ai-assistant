import {
  GenerateDraftRequest,
  RefineDraftRequest,
} from "../models/CommunicationReq";

export class PromptBuilder {

  static buildDraftPrompt(
    request: GenerateDraftRequest
  ): string {

    return `
You are an expert Corporate Communications Assistant.

Generate an internal corporate communication using ONLY the information provided below.

Communication Type:
${request.communicationType}

Audience:
${request.audience}

Event Name:
${request.eventName}

Event Date:
${request.eventDate}

Key Highlights:
${request.keyHighlights}

Tone:
${request.tone}

Instructions:

- Generate a concise and meaningful subject.
- Address the specified audience appropriately.
- Mention the event name and event date.
- Include every key highlight as bullet points.
- Use the requested tone throughout.
- Keep the communication under 300 words.
- Do not invent facts.
- Do not remove any key highlights.
- End with "Corporate Communications".

Return ONLY valid JSON.

{
  "subject": "Generated subject",
  "communication": "Generated communication"
}
`;
  }

  static buildRefinePrompt(
    request: RefineDraftRequest
  ): string {

    return `
You are an expert Corporate Communications Editor.

Your task is to improve an existing communication.

Current Subject:
${request.subject}

Current Communication:
${request.communication}

Requested Refinement:
${request.refinement}

Apply ONLY the requested refinement.

==================================================
PROFESSIONAL
==================================================

If the refinement is "Professional":

- Use a formal corporate tone.
- Improve grammar and sentence structure.
- Make the communication polished and executive-ready.
- Preserve all information.
- Keep approximately the same length.
- Improve the subject if needed.

==================================================
FRIENDLY
==================================================

If the refinement is "Friendly":

- Use a warm, approachable and engaging tone.
- Make the communication conversational.
- Preserve all information.
- Keep approximately the same length.
- Improve the subject if appropriate.

==================================================
SHORTER
==================================================

If the refinement is "Shorter":

- Reduce the communication by approximately 40%.
- Remove repetitive wording.
- Keep event name.
- Keep event date.
- Keep all key highlights.
- Keep the important call-to-action.
- Keep the communication readable.
- Shorten the subject if possible.

==================================================
GENERAL RULES
==================================================

- Preserve the original meaning.
- Do NOT invent information.
- Do NOT remove important details.
- Preserve paragraphs where appropriate.
- Preserve bullet points.
- Return BOTH subject and communication.
- Never return markdown.
- Never wrap the response in \`\`\`.
- Return valid JSON only.

Expected Response:

{
  "subject": "Refined subject",
  "communication": "Refined communication"
}
`;
  }
}