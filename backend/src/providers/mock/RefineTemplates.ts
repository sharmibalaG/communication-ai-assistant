import type { RefineDraftRequest } from "../../models/CommunicationRes";
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
                return this.professional(request);

        }

    }

    private static professional(
        request: RefineDraftRequest
    ): CommunicationResponse {

        return {

            subject: request.subject,

            communication: `Dear Team,

${request.communication}

Thank you for your continued commitment and support.

Corporate Communications`

        };

    }

    private static friendly(
        request: RefineDraftRequest
    ): CommunicationResponse {

        return {

            subject: `Thanks for Joining ${request.subject}!`,

            communication: `Hi everyone,

Thanks for making this event such a success!

${request.communication}

We really appreciate everyone's participation and look forward to seeing you at our next event!

Best regards,

Corporate Communications`

        };

    }

    private static shorter(
        request: RefineDraftRequest
    ): CommunicationResponse {

        return {

            subject: request.subject,

            communication: `Thank you for participating.

Key Highlights:

• ${request.communication
                .split("\n")
                .slice(0, 3)
                .join("\n")}

We appreciate your continued support.

Corporate Communications`

        };

    }

}