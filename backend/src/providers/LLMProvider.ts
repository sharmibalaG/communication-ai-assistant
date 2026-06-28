import type {
    GenerateDraftRequest,
    RefineDraftRequest
} from "../models/CommunicationReq";


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