import { ProviderFactory } from "../providers/ProviderFactory";
import { PromptBuilder } from "../prompt/PromptBuild";
import { GenerateDraftRequest, RefineDraftRequest } from "../models/CommunicationReq";
import { CommunicationResponse } from '../models/CommunicationRes';

export class CommunicationService {

  constructor(
    private provider = ProviderFactory.getProvider()
  ) {}

  async generateDraft(request: GenerateDraftRequest): Promise<CommunicationResponse> {

    const prompt =
      PromptBuilder.buildDraftPrompt(request);

    return this.provider.generate(request, prompt);
  }

  async refineDraft(request: RefineDraftRequest):Promise<CommunicationResponse> {

    const prompt =
      PromptBuilder.buildRefinePrompt(request);

    return this.provider.refine(request, prompt);
  }
}