import "./App.css";
import { useState } from "react";

import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";

import Stepper from "./components/stepper";
import type { StepItem } from "./components/stepper/Stepper.types";

const App = () => {
  // Controls whether Landing Page or Assistant is shown
  const [showAssistant, setShowAssistant] = useState(false);

  // Current step
  const [currentStep, setCurrentStep] = useState(1);

  const steps: StepItem[] = [
    {
      id: 1,
      title: "Create",
      status: "active",
    },
    {
      id: 2,
      title: "Draft & Refine",
      status: "pending",
    },
    {
      id: 3,
      title: "Finalize",
      status: "pending",
    },
  ];

  return (
    <section>
      <Header />

      {!showAssistant ? (
        <LandingPage
          onLaunch={() => setShowAssistant(true)}
        />
      ) : (
        <>
          <div className="mx-auto flex max-w-7xl items-center">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>

          <Dashboard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </>
      )}
    </section>
  );
};

export default App;