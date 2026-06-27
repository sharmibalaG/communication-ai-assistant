import type {
    GenerateDraftRequest,
} from "../models/CommunicationReq";

import type { RefineDraftRequest } from "../models/CommunicationRes";

import type { CommunicationResponse } from "./ProviderType";

export interface LLMProvider {

    generate(
        request: GenerateDraftRequest,
        prompt: string
    ): Promise<CommunicationResponse>;

    refine(
        request: RefineDraftRequest,
        prompt: string
    ): Promise<CommunicationResponse>;

}