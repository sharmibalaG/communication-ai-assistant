import { z } from "zod";

export const communicationSchema = z.object({
  communicationType: z
    .string()
    .min(1, "Communication Type is required."),

  audience: z
    .string()
    .min(1, "Audience is required."),

  eventName: z
    .string()
    .min(1, "Event Name is required.")
    .max(100, "Event Name cannot exceed 100 characters."),

  eventDate: z
    .string()
    .min(1, "Event Date is required."),

  keyHighlights: z
    .string()
    .min(1, "Please enter atleast one highlight.")
    .max(1000, "Highlights cannot exceed 1000 characters."),

  tone: z.string(),
});

export type CommunicationFormData =
  z.infer<typeof communicationSchema>;