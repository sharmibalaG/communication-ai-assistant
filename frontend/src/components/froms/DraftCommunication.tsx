import { useState } from "react";
import type { CommunicationResponse } from "../../models/CommunicationResponse";
import { useCommunicationForm } from "../../utils/hook";
import type { CommunicationVersion } from '../../models/CommunicationVersion';
import VersionHistory from "../version/VersionHistory";

import { useTranslation } from "react-i18next";

interface DraftCommunicationProps {
    onFinalize: () => void;
    draft: CommunicationResponse;
    setDraft: React.Dispatch<
            React.SetStateAction<CommunicationResponse>
        >;
    versions:CommunicationVersion[];
    setVersions: React.Dispatch<
        React.SetStateAction<CommunicationVersion[]>
    >;
}

const refinementOptions = [
  {
    id: "professional",
    title: "Professional",
    description: "Clear, formal and concise",
  },
  {
    id: "friendly",
    title: "Friendly",
    description: "Warm and approachable",
  },
  {
    id: "shorter",
    title: "Shorter",
    description: "More concise and to the point",
  },
];

const DraftCommunication = ({
  onFinalize,
  draft, 
  setDraft,
  versions,
  setVersions
}: DraftCommunicationProps) => {
 
  const { t } = useTranslation();  
  const [selectedOption, setSelectedOption] =
    useState("professional");

    const {
        refine,
        loading
    } = useCommunicationForm();

  const handleRefine = async () => {
    const response = await refine({

        subject: draft.subject,

        communication: draft.communication,

        refinement: selectedOption

    });
  
    setVersions((prev) => [
    ...prev,
    {
        id: prev.length + 1,
        subject: response.subject,
        communication: response.communication,
        refinement: selectedOption,
        createdAt: new Date(),
    },
    ]);

    setDraft(response);
  };

  // version click

  const handleVersionSelect = (id: number) => {

    const version =
        versions.find(v => v.id === id);

    if (!version) return;

    setDraft({
        subject: version.subject,
        communication: version.communication,
    });

};

  return (
    <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("refineHeader")}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
         {t("refineDescriptionText")}
        </p>
      </div>

      <div className="relative">
        {/* Loading Overlay */}
        {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-8 py-6 shadow-lg">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8b1d41] border-t-transparent"></div>

                <h3 className="text-lg font-semibold text-gray-800">
                Refining Communication
                </h3>

                <p className="text-center text-sm text-gray-500">
                AI is improving your communication...
                <br />
                This usually takes a few seconds.
                </p>
            </div>
            </div>
        )}
       
        
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

        {/* Left */}

        <div className="lg:col-span-2">

          {/* Subject */}

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium"
            >
              Subject
            </label>

            <input
              id="subject"
              value={draft.subject}
              name="subject"
              onChange={(e) =>
                setDraft((prev) => ({
                    ...prev,
                    subject: e.target.value,
                }))
                }
              className="h-11 w-full rounded-lg border border-gray-300 px-3 focus:border-[#8b1d41] focus:outline-none"
            />
          </div>

          {/* Communication */}

          <div>

            <label
              htmlFor="communication"
              className="mb-2 block text-sm font-medium"
            >
              {t("communication")}
            </label>

            <textarea
              id="communication"
              rows={14}
              value={draft.communication}
              name="communication"
              onChange={(e) =>
                setDraft((prev) => ({
                    ...prev,
                    communication: e.target.value,
                }))
                }
              className="w-full rounded-lg border border-gray-300 p-4 focus:border-[#8b1d41] focus:outline-none"
            />

            <p className="mt-2 text-xs text-gray-500">
             {t("refinePlaceholder")}
            </p>

          </div>

        </div>

        {/* Right */}

        <div>

          <h3 className="text-sm font-semibold">
            {t("refinecommunication")}
          </h3>

          <p className="mb-4 mt-1 text-xs text-gray-500">
           {t("refineHeaderPlaceholder")}
          </p>

          <div className="space-y-4">

            {refinementOptions.map((option) => {

              const selected =
                option.id === selectedOption;

              return (

                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setSelectedOption(option.id)
                  }
                  className={`w-full rounded-lg border p-4 text-left transition

                  ${
                    selected
                      ? "border-[#8b1d41] bg-red-50"
                      : "border-gray-300 hover:border-[#8b1d41]"
                  }
                  `}
                >

                  <div className="font-medium">
                    {option.title}
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    {option.description}
                  </div>

                </button>

              );
            })}

          </div>

        </div>
        
        {/** version */}

        <div>

            <VersionHistory
                versions={versions}
                currentVersionId={versions[versions.length - 1]?.id ?? 0}
                onSelectVersion={handleVersionSelect}
            />

        </div>

      </div>
     </div> 
      {/* Footer */}

      <div className="mt-8 flex justify-end gap-4">

      <button
        type="button"
        disabled={loading}
        onClick={handleRefine}
        className="flex items-center gap-2 rounded-lg border border-[#8b1d41] px-6 py-3 font-medium text-[#8b1d41] disabled:opacity-50"
        >
        {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8b1d41] border-t-transparent" />
        )}

        {loading ? "Refining..." : "Refine"}
        </button>

        <button
          type="button"
          onClick={onFinalize}
          className="rounded-lg bg-[#8b1d41] px-6 py-3 font-medium text-white transition hover:bg-[#741635]"
        >
          {t("finalizeButton")}
        </button>

      </div>

    </div>
  );
};

export default DraftCommunication;