import { useState } from "react";
import type { CommunicationForm } from "./types/from";
import { useCommunicationForm } from "../../utils/hook";
import type { CommunicationResponse } from '../../models/CommunicationResponse';
import { communicationSchema } from "./validation/communication.schema";
import FieldError from "./FieldError";
import type { CommunicationVersion } from "../../models/CommunicationVersion";

import { useTranslation } from "react-i18next";



interface CreateCommunicationProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
   draft: CommunicationResponse;
   setDraft: React.Dispatch<
        React.SetStateAction<CommunicationResponse>
    >;
    versions:CommunicationVersion[];
    setVersions: React.Dispatch<
            React.SetStateAction<CommunicationVersion[]>
        >;
}

const CreateCommunication = ({setCurrentStep, draft, setDraft, versions, setVersions}: CreateCommunicationProps) => {

     const { t } = useTranslation();

  const [form, setForm] = useState<CommunicationForm>({
    communicationType: "",
    audience: "",
    eventName: "",
    eventDate: "",
    keyHighlights: "",
    tone: "Professional",
  });

  const [errors, setErrors] = useState<
  Record<string, string[]>>({});

  const {
    loading,
    error,
    generate
} = useCommunicationForm();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
     setErrors(prev => ({
    ...prev,
    [name]: undefined,
  }));
  };

  const  handleGenerate = async () => {
    const validation = communicationSchema.safeParse(form);
    console.log(validation);
    if (!validation.success) {

    const fieldErrors =
      validation.error.flatten().fieldErrors;

    setErrors(fieldErrors);

    return;
  }
    const response  = await generate(form);
     setDraft(response);
     setVersions([
        {
            id: 1,
            subject: response.subject,
            communication: response.communication,
            refinement: "Original",
            createdAt: new Date(),
        },
]);
     setCurrentStep(2);
  };

  const handleBlur = (
  e: React.FocusEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {

  const { name, value } = e.target;

  const fieldSchema =
    communicationSchema.shape[
      name as keyof typeof communicationSchema.shape
    ];

  const result = fieldSchema.safeParse(value);

  setErrors((prev) => ({
    ...prev,
    [name]: result.success
      ? undefined
      : result.error.issues.map(issue => issue.message)
  }));
};

  return (
    <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
        
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
                  {t("communicationType")}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                {t("description")}
            </p>
        </div>
        
      <form>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Communication Type */}

          <div>
            <label htmlFor="communicationtype" className="mb-2 block text-sm font-medium">
              {t("communicationType")}
            </label>

            <select
              name="communicationType"
              value={form.communicationType}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-11 w-full rounded-lg border border-gray-300 px-3"
            >
              <option value="">Select</option>
              <option>Event Recap</option>
              <option>Executive Summary</option>
              <option>Partner Announcement</option>
            </select>
            <FieldError error={errors.communicationType} />
          </div>

          {/* Audience */}

          <div>
            <label htmlFor="audience" className="mb-2 block text-sm font-medium">
              {t("audience")}
            </label>

            <select
              name="audience"
              value={form.audience}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-11 w-full rounded-lg border border-gray-300 px-3"
            >
              <option value="">{t("select")}</option>
              <option>{t("allEmployees")}</option>
              <option>{t("executives")}</option>
              <option>{t("partners")}</option>
            </select>
            <FieldError error={errors.audience} />
          </div>

        </div>

        {/* Event Name */}

        <div className="mt-6">
          <label htmlFor="eventname" className="mb-2 block text-sm font-medium">
             {t("eventName")}
          </label>

          <input
            type="text"
            name="eventName"
            value={form.eventName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t("createPlaceholder")}
            className="h-11 w-full rounded-lg border border-gray-300 px-3"
          />
           <FieldError error={errors.eventName} />
        </div>

        {/* Event Date */}

        <div className="mt-6">
          <label htmlFor="eventdate" className="mb-2 block text-sm font-medium">
            {t("eventDate")}
          </label>

          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-11 w-60 rounded-lg border border-gray-300 px-3"
          />
          <FieldError error={errors.eventDate} />
          
        </div>

        {/* Key Highlights */}

        <div className="mt-6">
          <label htmlFor="keyhighlights" className="mb-2 block text-sm font-medium">
            {t("keyHighlights")}
          </label>

          <textarea
            rows={5}
            name="keyHighlights"
            value={form.keyHighlights}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t("highlighPlaceHolder")}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
          <FieldError error={errors.keyHighlights} />
          
        </div>


        {/* Tone */}

        <div className="mt-6 md:w-80">
          <label htmlFor="tone" className="mb-2 block text-sm font-medium">
             {t("tone")}
          </label>

          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-11 w-full rounded-lg border border-gray-300 px-3"
          >
            <option>{t("professional")}</option>
            <option>{t("friendly")}</option>
          </select>
        </div>

        <div className="mt-8 flex justify-end">

          <button
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="rounded-lg bg-[#8b1d41] px-8 py-3 font-medium text-white hover:bg-[#741635]"
          >
            {loading
                ? "Generating..."
                : "Generate Draft"}
          </button>

          {
            error && (
                <p className="mt-3 text-sm text-red-600">
                    {error}
                </p>
            )
        }

        </div>

      </form>

    </div>
  );
};

export default CreateCommunication;