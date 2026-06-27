export enum ProviderType {
  MOCK = "mock",
  GEMINI = "gemini",
  GROQ = "groq",
  OPEN_ROUTER = "openrouter",
  COHERE = "cohere",
}

export interface CommunicationResponse {
  subject: string;
  communication: string;
}