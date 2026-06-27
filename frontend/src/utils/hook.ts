import { useState } from "react";

import { generateDraft } from "../services/communicationApi";
import { refineDraft } from "../services/communicationApi";

import type { CommunicationRequest } from "../models/CommunicationRequest";
import type { CommunicationResponse } from "../models/CommunicationResponse";
import type { RefineDraftRequest } from "../models/RefineDraftRequest";


export const useCommunicationForm = () => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

const generate = async (
    request: CommunicationRequest
): Promise<CommunicationResponse> => {

    try {

        setLoading(true);

        setError("");

        const response =
            await generateDraft(request);

        return response;

    } catch (error) {

        setError("Unable to generate communication.");

        throw error;

    } finally {

        setLoading(false);

    }

}

const refine = async (
  request: RefineDraftRequest
): Promise<CommunicationResponse> => {

  try {

    setLoading(true);

    setError("");

    return await refineDraft(request);

  } catch (error) {

    setError("Unable to refine communication.");

    throw error;

  } finally {

    setLoading(false);

  }

};

  return {
    loading,
    error,
    generate,
    refine
  };
};