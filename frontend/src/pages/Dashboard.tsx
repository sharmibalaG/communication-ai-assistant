import { useState } from 'react';
import CreateCommunication from '../components/froms/CommunicationForm';
import DraftCommunication  from '../components/froms/DraftCommunication';
import FinalizeCommunication from '../components/froms/FinalizeCommunication';
import type { CommunicationResponse } from '../models/CommunicationResponse';
import type { CommunicationVersion } from '../models/CommunicationVersion';


interface DashboardProps {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Dashboard =  ({
    currentStep,
    setCurrentStep,
}: DashboardProps) => {

    const [draft, setDraft] = useState<CommunicationResponse>({
        subject: "",
        communication: ""
    });

    //version state control
    const [versions, setVersions] = useState<CommunicationVersion[]>([]);
  return (
    <>
      <section>
       <div className="mb-8 mx-auto max-w-7xl items-center mt-8">

         {/* create communication from component */}
        
            {currentStep === 1 && (
                <CreateCommunication
                    setCurrentStep={setCurrentStep}
                     draft={draft}
                    setDraft={setDraft}
                     versions={versions}
                    setVersions={setVersions}
                />
            )}

         {/* Draft communication from component */}
            {currentStep === 2 && (
                <DraftCommunication 
                onFinalize={() => setCurrentStep(3)}
                draft={draft}
                setDraft={setDraft}
                versions={versions}
                setVersions={setVersions}
                ></DraftCommunication>
            )}

        {/* Finalize communication from component */}
           {currentStep === 3 && (
            <FinalizeCommunication
                draft={draft}
                onBack={() => setCurrentStep(2)}
                onNewCommunication={() => setCurrentStep(1)}
            />
            )}
        </div>
      </section>
    </>
  )
}

export default Dashboard
