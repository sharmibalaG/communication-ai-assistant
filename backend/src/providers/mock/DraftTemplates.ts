import type { GenerateDraftRequest } from "../../models/CommunicationReq";
import type { CommunicationResponse } from "../ProviderType";

export class DraftTemplates {

    static generate(
        request: GenerateDraftRequest
    ): CommunicationResponse {

        switch (request.communicationType) {

            case "Event Recap":
                return this.buildEventRecap(request);

            case "Executive Summary":
                return this.buildExecutiveSummary(request);

            case "Partner Announcement":
                return this.buildPartnerAnnouncement(request);

            default:
                return this.buildEventRecap(request);

        }

    }

    private static buildEventRecap(
        request: GenerateDraftRequest
    ): CommunicationResponse {

        const greeting =
            request.audience === "Executives"
                ? "Dear Executive Team,"
                : "Dear Employees,";

        const subject =
            request.audience === "Executives"
                ? `Executive Recap: ${request.eventName}`
                : `Highlights from ${request.eventName}`;

        return {

            subject,

            communication: `${greeting}

Thank you for participating in ${request.eventName}, held on ${request.eventDate}.

The event brought together colleagues across the organization to explore innovation, collaboration and emerging AI capabilities.

Key Highlights:

${request.keyHighlights}

Thank you to everyone who contributed to making this event successful.

Corporate Communications`

        };

    }

    private static buildExecutiveSummary(
        request: GenerateDraftRequest
    ): CommunicationResponse {

        return {

            subject: `Executive Summary: ${request.eventName}`,

            communication: `Dear Executive Team,

Please find below the executive summary for ${request.eventName} held on ${request.eventDate}.

The event provided valuable strategic insights into AI adoption, innovation initiatives and future opportunities.

Key Highlights:

${request.keyHighlights}

The outcomes from this event will help guide future investment and technology decisions.

Corporate Communications`

        };

    }

    private static buildPartnerAnnouncement(
        request: GenerateDraftRequest
    ): CommunicationResponse {

        return {

            subject: `Partnership Announcement: ${request.eventName}`,

            communication: `Dear Valued Partners,

We are pleased to share the successful outcome of ${request.eventName}.

The event strengthened collaboration and highlighted exciting opportunities to work together.

Key Highlights:

${request.keyHighlights}

Thank you for your continued partnership.

Corporate Communications`

        };

    }

}