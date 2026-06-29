import { PromptBuilder } from "./PromptBuild";
import {
  GenerateDraftRequest,
  RefineDraftRequest,
} from "../models/CommunicationReq";

describe("PromptBuilder", () => {

  describe("buildDraftPrompt", () => {

    it("should generate a draft prompt containing all request fields", () => {

      const request: GenerateDraftRequest = {
        communicationType: "Event Announcement",
        audience: "All Employees",
        eventName: "AI Innovation Summit",
        eventDate: "2026-06-27",
        keyHighlights: "AI Platform Launch",
        tone: "Professional",
      };

      const prompt = PromptBuilder.buildDraftPrompt(request);

      expect(prompt).toContain("You are an expert Corporate Communications Assistant.");

      expect(prompt).toContain(request.communicationType);
      expect(prompt).toContain(request.audience);
      expect(prompt).toContain(request.eventName);
      expect(prompt).toContain(request.eventDate);
      expect(prompt).toContain(request.keyHighlights);
      expect(prompt).toContain(request.tone);

      expect(prompt).toContain("Return ONLY valid JSON.");
      expect(prompt).toContain('"subject"');
      expect(prompt).toContain('"communication"');
    });

  });

  describe("buildRefinePrompt", () => {

    it("should generate a refine prompt containing all request fields", () => {

      const request: RefineDraftRequest = {
        subject: "AI Innovation Summit",
        communication: "Original communication",
        refinement: "professional",
      };

      const prompt = PromptBuilder.buildRefinePrompt(request);

      expect(prompt).toContain("You are an expert Corporate Communications Editor.");

      expect(prompt).toContain(request.subject);
      expect(prompt).toContain(request.communication);
      expect(prompt).toContain(request.refinement);

      expect(prompt).toContain("PROFESSIONAL");
      expect(prompt).toContain("FRIENDLY");
      expect(prompt).toContain("SHORTER");

      expect(prompt).toContain("Return valid JSON only.");
      expect(prompt).toContain('"subject"');
      expect(prompt).toContain('"communication"');
    });

  });

});