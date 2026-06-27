import './App.css'
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import Stepper from "../src/components/stepper";
import type { StepItem } from "../src/components/stepper/Stepper.types";
import { useState } from "react";

const App = () => {

//add the current step
const [currentStep, setCurrentStep] = useState(1);

 //added the stepper data 
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
    <>
      <section>
      
       {/* Header component */}
        <Header></Header>

        {/* Stepper component */}
         <div className='mx-auto flex max-w-7xl items-center'>
          <Stepper 
          steps={steps} 
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          />
          </div>
  
         {/* Dashboard component */}
        <Dashboard
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
         >
        </Dashboard>
      </section>
    </>
  )
}

export default App
