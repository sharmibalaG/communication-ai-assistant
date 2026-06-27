import type { CommunicationRequest } from "../models/CommunicationRequest";
import type { CommunicationResponse } from "../models/CommunicationResponse";
import type { RefineDraftRequest } from "../models/RefineDraftRequest";

import { ENV } from "../config/env"

const BASE_URL = `${ENV.API_BASE_URL}/communications`;

export async function generateDraft(
  request: CommunicationRequest
): Promise<CommunicationResponse> {
  console.log("Sending Request:", request);
  const response = await fetch(`${BASE_URL}/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Unable to generate communication.");
  }

  const result = await response.json();

  return result.data;
}

export async function refineDraft(
  request: RefineDraftRequest
): Promise<CommunicationResponse> {

  const response = await fetch(`${BASE_URL}/refine`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Unable to refine communication.");
  }

  const result = await response.json();

  return result.data;
}