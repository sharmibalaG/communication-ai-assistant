import { Request, Response, NextFunction } from "express";
import { CommunicationController } from "./CommunicationController";
import { CommunicationService } from "../services/CommunicationService";

jest.mock("../services/CommunicationService");

describe("CommunicationController", () => {
  let controller: CommunicationController;

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    controller = new CommunicationController();

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();
  });

  describe("generateDraftHandler", () => {
    it("should generate draft successfully", async () => {
      const mockResponse = {
        subject: "AI Innovation Summit",
        communication: "Generated communication",
      };

      (
        CommunicationService.prototype.generateDraft as jest.Mock
      ).mockResolvedValue(mockResponse);

      req.body = {
        communicationType: "Event Announcement",
        audience: "All Employees",
        eventName: "AI Innovation Summit",
        eventDate: "2026-06-27",
        keyHighlights: "AI Platform Launch",
        tone: "Professional",
      };

      await controller.generateDraftHandler(
        req as Request,
        res as Response,
        next
      );

      expect(
        CommunicationService.prototype.generateDraft
      ).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockResponse,
      });

      expect(next).not.toHaveBeenCalled();
    });

    it("should call next when generateDraft throws an error", async () => {
      const error = new Error("Generation failed");

      (
        CommunicationService.prototype.generateDraft as jest.Mock
      ).mockRejectedValue(error);

      await controller.generateDraftHandler(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("refineDraftHandler", () => {
    it("should refine communication successfully", async () => {
      const mockResponse = {
        subject: "Updated Subject",
        communication: "Refined communication",
      };

      (
        CommunicationService.prototype.refineDraft as jest.Mock
      ).mockResolvedValue(mockResponse);

      req.body = {
        subject: "AI Innovation Summit",
        communication: "Original communication",
        refinement: "Professional",
      };

      await controller.refineDraftHandler(
        req as Request,
        res as Response,
        next
      );

      expect(
        CommunicationService.prototype.refineDraft
      ).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockResponse,
      });

      expect(next).not.toHaveBeenCalled();
    });

    it("should call next when refineDraft throws an error", async () => {
      const error = new Error("Refinement failed");

      (
        CommunicationService.prototype.refineDraft as jest.Mock
      ).mockRejectedValue(error);

      await controller.refineDraftHandler(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});