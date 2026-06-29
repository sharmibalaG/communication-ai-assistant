import { CommunicationService } from "./CommunicationService";
import { ProviderFactory } from "../providers/ProviderFactory";
import { PromptBuilder } from "../prompt/PromptBuild";
import { RefineDraftRequest } from "../models/CommunicationReq";

jest.mock("../providers/ProviderFactory");
jest.mock("../prompt/PromptBuild");


describe("CommunicationService", () => {
  const mockProvider = {
    generate: jest.fn(),
    refine: jest.fn(),
  };

  let service: CommunicationService;

  beforeEach(() => {
    jest.clearAllMocks();

    (ProviderFactory.getProvider as jest.Mock).mockReturnValue(
      mockProvider
    );

    service = new CommunicationService();
  });

  describe("generateDraft", () => {
    it("should build the draft prompt and call provider.generate", async () => {
      const request = {
        communicationType: "Event Announcement",
        audience: "All Employees",
        eventName: "AI Summit",
        eventDate: "2026-06-27",
        keyHighlights: "Launch",
        tone: "Professional",
      };

      const prompt = "Generated Prompt";

      const response = {
        subject: "AI Summit",
        communication: "Generated communication",
      };

      (PromptBuilder.buildDraftPrompt as jest.Mock)
        .mockReturnValue(prompt);

      mockProvider.generate.mockResolvedValue(response);

      const result = await service.generateDraft(request);

      expect(PromptBuilder.buildDraftPrompt)
        .toHaveBeenCalledWith(request);

      expect(mockProvider.generate)
        .toHaveBeenCalledWith(request, prompt);

      expect(result).toEqual(response);
    });

    it("should propagate provider errors", async () => {
      const request = {} as any;

      (PromptBuilder.buildDraftPrompt as jest.Mock)
        .mockReturnValue("Prompt");

      const error = new Error("Provider Error");

      mockProvider.generate.mockRejectedValue(error);

      await expect(
        service.generateDraft(request)
      ).rejects.toThrow("Provider Error");
    });
  });

  describe("refineDraft", () => {
    it("should build refine prompt and call provider.refine", async () => {
        const request: RefineDraftRequest = {
        subject: "Subject",
        communication: "Communication",
        refinement: "professional",
        };

      const prompt = "Refine Prompt";

      const response = {
        subject: "Updated Subject",
        communication: "Updated Communication",
      };

      (PromptBuilder.buildRefinePrompt as jest.Mock)
        .mockReturnValue(prompt);

      mockProvider.refine.mockResolvedValue(response);

      const result = await service.refineDraft(request);

      expect(PromptBuilder.buildRefinePrompt)
        .toHaveBeenCalledWith(request);

      expect(mockProvider.refine)
        .toHaveBeenCalledWith(request, prompt);

      expect(result).toEqual(response);
    });

    it("should propagate provider refine errors", async () => {
      const request = {} as any;

      (PromptBuilder.buildRefinePrompt as jest.Mock)
        .mockReturnValue("Prompt");

      const error = new Error("Refine Error");

      mockProvider.refine.mockRejectedValue(error);

      await expect(
        service.refineDraft(request)
      ).rejects.toThrow("Refine Error");
    });
  });
});