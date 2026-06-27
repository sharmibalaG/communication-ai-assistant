import type { StepItem } from "./Stepper.types";

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const Stepper = ({
  steps,
  currentStep,
  onStepChange,
}: StepperProps) => {

  const progress =
    ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mt-8 rounded-xl bg-white px-10 py-8 shadow-sm w-full">

      <div className="relative">

        {/* Background Line */}

        <div className="absolute left-5 right-5 top-5">
          <div className="h-[2px] bg-gray-300" />
        </div>

        {/* Active Line */}

        <div
          className="absolute left-5 top-5 h-[2px] bg-[#8b1d41] transition-all duration-500"
          style={{
            width: `calc((100% - 40px) * ${progress / 100})`,
          }}
        />

        {/* Steps */}

        <div className="relative flex justify-between">

          {steps.map((step) => {

            const completed = step.id < currentStep;
            const active = step.id === currentStep;
            const clickable = completed;

            return (

              <div
                key={step.id}
                className="flex w-40 flex-col items-center"
              >

                <button
                  type="button"
                  disabled={!clickable}
                  onClick={() => onStepChange(step.id)}
                  className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all
                  ${
                    completed || active
                      ? "border-[#8b1d41] bg-[#8b1d41] text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  }
                  ${
                    clickable
                      ? "cursor-pointer hover:scale-105"
                      : "cursor-default"
                  }`}
                >
                  {completed ? "✓" : step.id}
                </button>

                <span
                  className={`mt-3 text-center text-sm font-medium
                  ${
                    active
                      ? "text-[#8b1d41]"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default Stepper;