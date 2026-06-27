import { Router } from "express";
import { CommunicationController } from "../controllers/CommunicationController";

const router = Router();

const communicationController = new CommunicationController();

router.post(
    "/draft",
    communicationController.generateDraftHandler.bind(
        communicationController
    )
);

router.post(
    "/refine",
    communicationController.refineDraftHandler.bind(
        communicationController
    )
);

console.log("Communication routes loaded");

export default router;