import { DraftTemplates } from "./mock/DraftTemplates";
import { RefineTemplates } from "./mock/RefineTemplates";

import type { GenerateDraftRequest, RefineDraftRequest } from "../models/CommunicationReq";


import type { CommunicationResponse } from "./ProviderType";
import type { LLMProvider } from "./LLMProvider";

export class MockProvider implements LLMProvider {

    async generate(
        request: GenerateDraftRequest
    ): Promise<CommunicationResponse> {

        return DraftTemplates.generate(request);

    }

    async refine(
        request: RefineDraftRequest
    ): Promise<CommunicationResponse> {

        return RefineTemplates.refine(request);

    }

}