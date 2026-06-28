import type { GenerateDraftRequest } from "../../models/CommunicationReq";
import type { CommunicationResponse } from "../ProviderType";

export class DraftTemplates {

    static generate(
        request: GenerateDraftRequest
    ): CommunicationResponse {

        switch (request.communicationType) {

            case "Event Recap":
                return this.buildEventRecap(request);

            case "Remainder":
                return this.buildReminder(request);

            case "Announcement":
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
        const closingMessage =
            request.tone === "Friendly"
                ? "Thank you for making this event a success! We hope you enjoyed it and look forward to seeing you at our next event."
                : "We appreciate your participation and contributions in making this event a success. We look forward to your continued support in future initiatives.";

        return {
            subject: `Recap: ${request.eventName}`,

            communication: `Dear ${request.audience},

Thank you to everyone who participated in ${request.eventName} on ${request.eventDate}.

The event was a great success, bringing colleagues together to collaborate, share ideas, and explore new opportunities.

Key Highlights

${request.keyHighlights
                    .split("\n")
                    .filter(line => line.trim())
                    .map(line => `• ${line.trim()}`)
                    .join("\n")}

${closingMessage}

Corporate Communications`,
        };


    }

    private static buildReminder(
        request: GenerateDraftRequest
    ): CommunicationResponse {

        const closingMessage =
            request.tone === "Friendly"
                ? "We're looking forward to seeing everyone there. Thank you for your continued enthusiasm and participation!"
                : "We appreciate your attention and look forward to your participation in this important event.";

        return {
            subject: `Reminder: ${request.eventName}`,

            communication: `Dear ${request.audience},

This is a friendly reminder that ${request.eventName} is scheduled for ${request.eventDate}.

The event will provide valuable opportunities to collaborate, learn, and engage with colleagues across the organization.

Key Highlights

${request.keyHighlights
                    .split("\n")
                    .filter(line => line.trim())
                    .map(line => `• ${line.trim()}`)
                    .join("\n")}

Please ensure you have marked your calendar and plan to attend.

${closingMessage}

Corporate Communications`,
        };

    }
    private static buildPartnerAnnouncement(
        request: GenerateDraftRequest
    ): CommunicationResponse {

        const closingMessage =
            request.tone === "Friendly"
                ? "We can't wait to see you there and make this event a memorable one!"
                : "Thank you for your attention and participation.";


        return {
            subject: `Announcement: ${request.eventName}`,

            communication: `Dear ${request.audience},

We are excited to announce the upcoming ${request.eventName}, scheduled for ${request.eventDate}.

This event will bring together colleagues to learn, collaborate, and share valuable insights.

Key Highlights

${request.keyHighlights
                    .split("\n")
                    .filter(line => line.trim())
                    .map(line => `• ${line.trim()}`)
                    .join("\n")}

We encourage everyone to attend and look forward to your participation.

${closingMessage}

Corporate Communications`,
        };

    }

}