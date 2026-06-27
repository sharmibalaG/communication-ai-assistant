import type { VersionHistoryProps } from "./VersionHistory.types";
import { useTranslation } from "react-i18next";

const VersionHistory = ({
    versions,
    currentVersionId,
    onSelectVersion,
}: VersionHistoryProps) => {
     const { t } = useTranslation();  

    return (

        <div className="max-h-[40vh] overflow-y-auto md:max-h-[55vh] lg:max-h-[65vh]">

            <h3 className="mb-4 text-sm font-semibold">
                {t("versionHistory")}
            </h3>

            <div className="space-y-3">

                {versions.map((version) => {

                    const active =
                        version.id === currentVersionId;

                    return (

                        <button
                            key={version.id}
                            type="button"
                            onClick={() => onSelectVersion(version.id)}
                            className={`w-full rounded-lg border p-3 text-left transition

                            ${
                                active
                                    ? "border-[#8b1d41] bg-red-50"
                                    : "border-gray-200 hover:border-[#8b1d41]"
                            }
                            `}
                        >

                            <div className="flex items-center justify-between">

                                <span className="font-medium">
                                    Version {version.id}
                                </span>

                                <span className="text-xs text-gray-500">
                                    {version.refinement}
                                </span>

                            </div>

                            <p className="mt-2 line-clamp-2 text-xs text-gray-500">
                                {version.subject}
                            </p>

                        </button>

                    );

                })}

            </div>

        </div>

    );

};

export default VersionHistory;