export interface GenerateDraftRequest {
  communicationType: string;
  audience: string;
  eventName: string;
  eventDate: string;
  keyHighlights: string;
  tone: string;
}

export interface RefineDraftRequest {
  subject: string;
  communication: string;
  refinement: "professional" | "friendly" | "shorter";
}