
import { BotMessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {

 const { t } = useTranslation();

  return (
    <>
      <section>
        {/* Header component */}
        <div className="w-full bg-[#8b1d41] shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

            {/* Left */}
            <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center">
               <BotMessageSquare className="h-6 w-6 text-white" />
            </div>

            <h1 className="text-xl font-semibold text-white">
              {t("appTitle")}
            </h1>

            </div>

            {/* Right */}
            <span
            className="cursor-pointer text-sm font-medium text-white"
            role="button"
            tabIndex={0}
            aria-label="Switch language to English"
            >
            English
            </span>

        </div>
        </div>
      </section>
    </>
  )
}

export default Header
