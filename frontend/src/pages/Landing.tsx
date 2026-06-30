import { FileText, Rocket, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LandingPageProps {
  onLaunch: () => void;
}

const LandingPage = ({ onLaunch }: LandingPageProps) => {

  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#f8f9fb] mb-8">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-8 text-center">

          <h1 className="text-2xl font-semibold text-[#8b1d41]">
            {t("introText")}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-gray-600">
            {t("introDescrtion")}
          </p>

          <button
            className="mt-10 rounded-xl bg-[#8b1d41] py-4 text-lg font-semibold text-white transition hover:bg-[#741635] px-4"
            onClick={onLaunch}
          >
            {t("launchAssitant")}
          </button>
          
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 px-8 lg:grid-cols-3">

        {/* Card 1 */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-3">
            <Rocket className="h-8 w-8 text-[#8b1d41]" />

            <h2 className="text-2xl font-semibold text-[#8b1d41]">
                {t("quickStart")}
            </h2>
            </div>

          <p className="mt-2 text-gray-600">
            {t("workflowDetails")}
          </p>

          <div className="mt-8 space-y-5">

            {[
              "Launch Assistant",
              "Enter communication details",
              "Generate an AI draft",
              "Review and refine",
              "Finalize and export",
            ].map((step, index) => (

              <div
                key={step}
                className="flex items-center gap-4 border-b pb-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8b1d41] text-sm font-semibold text-white">
                  {index + 1}
                </div>

                <span>{step}</span>
              </div>

            ))}

          </div>

        </div>

        {/* Card 2 */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
            <FileText className="h-8 w-8 text-[#8b1d41]" />

            <h2 className="text-2xl font-semibold text-[#8b1d41]">
               {t("communicationTypes")}
            </h2>
            </div>

          <p className="mt-2 text-gray-600">
           {t("workflowDescription")}
          </p>

          <div className="mt-8 space-y-6">

            {[
              {
                title: "Event Announcement",
                text: "Communicate upcoming events to employees.",
              },
              {
                title: "Event Reminder",
                text: "Remind participants about upcoming events.",
              },
              {
                title: "Event Recap",
                text: "Share key highlights and outcomes after an event.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="border-b pb-5"
              >
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Card 3 */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-3">
        <Sparkles className="h-8 w-8 text-[#8b1d41]" />

        <h2 className="text-2xl font-semibold text-[#8b1d41]">
            {t("capabilities")}
        </h2>
        </div>

          <p className="mt-2 text-gray-600">
           {t("descriptionAI")}
          </p>

          <div className="mt-8 space-y-5">

            {[
              "Generate drafts in seconds",
              "Professional refinement",
              "Friendly tone",
              "Shorter version",
              "Version history",
              "Export as text",
              "Copy to clipboard",
            ].map((feature) => (

              <div
                key={feature}
                className="flex items-center gap-3 border-b pb-4"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b1d41] text-xs text-white">
                  ✓
                </div>

                <span>{feature}</span>

              </div>

            ))}

          </div>

        </div>

      </section>


    </div>
  );
};

export default LandingPage;