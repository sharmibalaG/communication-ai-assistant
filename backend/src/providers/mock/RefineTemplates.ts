import { RefineDraftRequest } from "../../models/CommunicationReq";
import type { CommunicationResponse } from "../ProviderType";

export class RefineTemplates {

    static refine(
        request: RefineDraftRequest
    ): CommunicationResponse {

        switch (request.refinement.toLowerCase()) {

            case "professional":
                return this.professional(request);

            case "friendly":
                return this.friendly(request);

            case "shorter":
                return this.shorter(request);

            default:
                return {
                    subject: request.subject,
                    communication: request.communication,
                };
        }
    }

    /**
     * Removes any previously applied refinement footer so
     * refinements don't keep appending content.
     */
    private static cleanCommunication(text: string): string {

        return text

            // Friendly footer
            .replace(
                /\n*We're excited to have you with us[\s\S]*?Best regards,\s*Corporate Communications\s*/gi,
                ""
            )

            // Professional footer
            .replace(
                /\n*We appreciate your attention and continued support\.\s*Corporate Communications\s*/gi,
                ""
            )

            // Shorter footer
            .replace(
                /\n*Thank you\.\s*Corporate Communications\s*/gi,
                ""
            )

            // Remove trailing whitespace
            .trim();
    }

    private static professional(
        request: RefineDraftRequest
    ): CommunicationResponse {

        const content = this.cleanCommunication(
            request.communication
        );

        return {

            subject: request.subject,

            communication: `${content}

We appreciate your attention and continued support.

Corporate Communications`

        };

    }

    private static friendly(
        request: RefineDraftRequest
    ): CommunicationResponse {

        const content = this.cleanCommunication(
            request.communication
        );

        return {

            subject: request.subject,

            communication: `${content}

We're excited to have you with us and truly appreciate your participation. We hope to see you again at our upcoming events!

Best regards,

Corporate Communications`

        };

    }

    private static shorter(
        request: RefineDraftRequest
    ): CommunicationResponse {

        const content = this.cleanCommunication(
            request.communication
        );

        const paragraphs = content
            .split("\n\n")
            .filter(p => p.trim());

        const shortened = paragraphs
            .slice(0, 4)
            .join("\n\n");

        return {

            subject: request.subject,

            communication: `${shortened}

Thank you.

Corporate Communications`

        };

    }

}