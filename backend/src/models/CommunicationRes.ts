export interface RefineDraftRequest {
  subject: string;
  communication: string;
  refinement: "professional" | "friendly" | "shorter";
}

export interface CommunicationResponse {
  subject: string;
  communication: string;
}