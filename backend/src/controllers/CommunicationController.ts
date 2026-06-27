import { Request, Response, NextFunction } from "express";

import { CommunicationService } from "../services/CommunicationService";

import { GenerateDraftRequest } from "../models/CommunicationReq";
import { RefineDraftRequest } from "../models/CommunicationRes";

export class CommunicationController {

    constructor(
        private communicationService = new CommunicationService()
    ) {}

    /**
     * POST /api/communications/draft
     */
    async generateDraftHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const request =
                req.body as GenerateDraftRequest;

            const response =
                await this.communicationService.generateDraft(request);

            return res.status(200).json({
                success: true,
                data: response
            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * POST /api/communications/refine
     */
    async refineDraftHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const request =
                req.body as RefineDraftRequest;

            const response =
                await this.communicationService.refineDraft(request);

            return res.status(200).json({
                success: true,
                data: response
            });

        } catch (error) {

            next(error);

        }

    }

}