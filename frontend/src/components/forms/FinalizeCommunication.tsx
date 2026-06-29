import type { CommunicationResponse } from "../../models/CommunicationResponse";
import { useTranslation } from "react-i18next";

interface FinalizeCommunicationProps {
 draft: CommunicationResponse;
  onBack: () => void;
  onNewCommunication: () => void;
}

const FinalizeCommunication = ({
  draft,
  onBack,
  onNewCommunication,
}: FinalizeCommunicationProps) => {

  const { t } = useTranslation();  
  const handleCopy = async () => {
    const text = `Subject: ${draft.subject} ${draft.communication}`;

    await navigator.clipboard.writeText(text);

    alert("Communication copied to clipboard.");
  };

  const handleExport = () => {

    const content = `Subject: ${draft.subject}

${draft.communication}`;

    const blob = new Blob(
        [content],
        { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "communication.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

};

  return (
    <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("finalizeCommunication")}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
            {t("finalizeDescription")}
        </p>
      </div>

      {/* Subject */}

      <div className="mb-6">

        <label
          htmlFor="final-subject"
          className="mb-2 block text-sm font-medium"
        >
          {t("subject")}
        </label>

        <input
          id="final-subject"
          value={draft.subject}
          readOnly
          className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3"
        />

      </div>

      {/* Communication */}

      <div>

        <label
          htmlFor="final-communication"
          className="mb-2 block text-sm font-medium"
        >
          {t("communication")}
        </label>

        <textarea
          id="final-communication"
          rows={14}
          value={draft.communication}
          readOnly
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4"
        />

      </div>

      {/* Success Badge */}

      <div className="mt-6 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
       {t("readyToShare")}
      </div>

      {/* Footer */}

       <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Left */}
        <button
            type="button"
            onClick={onBack}
            className="w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto"
        >
            {t("backToDraft")}
        </button>

        {/* Right */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">

            <button
            type="button"
            onClick={handleExport}
            className="w-full whitespace-nowrap rounded-lg border border-[#8b1d41] px-6 py-3 font-medium text-[#8b1d41] transition hover:bg-red-50 sm:w-auto"
            >
            {t("export")}
            </button>

            <button
            type="button"
            onClick={handleCopy}
            className="w-full whitespace-nowrap rounded-lg border border-[#8b1d41] px-6 py-3 font-medium text-[#8b1d41] transition hover:bg-red-50 sm:w-auto"
            >
            {t("copy")}
            </button>

            <button
            type="button"
            onClick={onNewCommunication}
            className="w-full whitespace-nowrap rounded-lg border border-[#8b1d41] px-6 py-3 font-medium text-[#8b1d41] transition hover:bg-red-50 sm:w-auto"
            >
            {t("startNewCommunication")}
            </button>

        </div>

    </div>

    </div>
  );
};

export default FinalizeCommunication;