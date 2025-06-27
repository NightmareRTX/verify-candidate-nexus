
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PersonalDetails from "@/components/portal/PersonalDetails";
import AcademicHistory from "@/components/portal/AcademicHistory";
import DocumentsUpload from "@/components/portal/DocumentsUpload";
import JobSection from "@/components/portal/JobSection";
import FinalReview from "@/components/portal/FinalReview";

const Portal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: {},
    academicHistory: {},
    documents: {},
    jobSection: {},
    finalConsent: { declaration: false }
  });

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Academic History" },
    { number: 3, title: "Documents Upload" },
    { number: 4, title: "Job Section" },
    { number: 5, title: "Final Review" }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalize = () => {
    setShowPaymentModal(true);
  };

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Validation logic for required fields
  const isFormValid = () => {
    const { personalDetails, academicHistory, documents, jobSection } = formData;
    
    // Personal Details validation
    const personalValid = personalDetails?.fullName && 
                         personalDetails?.fatherName && 
                         personalDetails?.emailAddress && 
                         personalDetails?.dateOfBirth && 
                         personalDetails?.contactNumber && 
                         personalDetails?.permanentAddress;

    // Academic History validation
    const academicValid = academicHistory?.tenth?.board && 
                         academicHistory?.tenth?.year && 
                         academicHistory?.tenth?.percentage &&
                         academicHistory?.twelfth?.board && 
                         academicHistory?.twelfth?.year && 
                         academicHistory?.twelfth?.percentage &&
                         academicHistory?.bachelor?.board && 
                         academicHistory?.bachelor?.year && 
                         academicHistory?.bachelor?.percentage &&
                         academicHistory?.bachelor?.degree;

    // Documents validation
    const documentsValid = documents?.passport && 
                          documents?.tenth && 
                          documents?.twelfth && 
                          documents?.degree;

    // Job Section validation
    const jobValid = jobSection?.interestedRole && 
                    jobSection?.whyBestFit;

    return personalValid && academicValid && documentsValid && jobValid;
  };

  const goToStep = (stepNumber: number) => {
    // Only allow navigation to step 5 if form is valid
    if (stepNumber === 5 && !isFormValid()) {
      return;
    }
    setCurrentStep(stepNumber);
  };

  // Fixed Razorpay script injection
  useEffect(() => {
    if (!showPaymentModal) return;        // only run when modal is open

    let intervalId: NodeJS.Timeout;

    const injectScript = () => {
      const container = document.getElementById("razorpay-payment-container");
      if (!container) return;             // DOM not ready yet, keep polling

      // ❶ avoid duplicates
      if (container.querySelector('script[data-payment_button_id="pl_QlkHtuQN0e8WZH"]')) {
        return;
      }

      // ❂ create the script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", "pl_QlkHtuQN0e8WZH");
      script.async = true;

      // ❸ place it inside the <form>
      const form = container.querySelector("form");
      (form ?? container).appendChild(script);

      clearInterval(intervalId);          // stop polling once injected
    };

    intervalId = setInterval(injectScript, 100);    // poll every 100 ms

    // ❹ cleanup when modal closes
    return () => {
      clearInterval(intervalId);
      const container = document.getElementById("razorpay-payment-container");
      if (container) container.innerHTML = "<form></form>";
    };
  }, [showPaymentModal]);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">DocuVerify</h1>
            <p className="text-gray-600 text-xs sm:text-sm">Powered by EarnIntern</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Left Sidebar Navigation - Mobile responsive */}
        <div className="w-full lg:w-64 bg-gray-100 border-b lg:border-r lg:border-b-0 border-gray-300 min-h-auto lg:min-h-screen p-4">
          <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-x-visible">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => goToStep(step.number)}
                disabled={step.number === 5 && !isFormValid()}
                className={`flex-shrink-0 lg:w-full text-left px-3 sm:px-4 py-2 sm:py-3 border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                  step.number === currentStep 
                    ? 'bg-white text-black border-gray-400 font-bold' 
                    : step.number === 5 && !isFormValid()
                    ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-white'
                }`}
              >
                <span className="lg:hidden">{step.number}</span>
                <span className="hidden lg:inline">{step.number}. {step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="bg-white border border-gray-300">
            <div className="p-4 sm:p-6 lg:p-8">
              {currentStep === 1 && (
                <PersonalDetails 
                  data={formData.personalDetails}
                  updateData={(data) => updateFormData('personalDetails', data)}
                />
              )}
              {currentStep === 2 && (
                <AcademicHistory 
                  data={formData.academicHistory}
                  updateData={(data) => updateFormData('academicHistory', data)}
                />
              )}
              {currentStep === 3 && (
                <DocumentsUpload 
                  data={formData.documents}
                  updateData={(data) => updateFormData('documents', data)}
                />
              )}
              {currentStep === 4 && (
                <JobSection 
                  data={formData.jobSection}
                  updateData={(data) => updateFormData('jobSection', data)}
                />
              )}
              {currentStep === 5 && (
                <FinalReview 
                  formData={formData}
                  updateFinalConsent={(data) => updateFormData('finalConsent', data)}
                  onFinalize={handleFinalize}
                />
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-300 space-y-3 sm:space-y-0">
                  <Button 
                    onClick={handleBack} 
                    disabled={currentStep === 1}
                    variant="outline"
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 border-gray-300 text-black hover:bg-gray-50"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 bg-black hover:bg-gray-800 text-white"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-300 mx-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold text-black">
              Application Verification
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              To verify the authenticity of your application, do necessary background checks 
              and provision your secure digital signature, a Dossier Processing Fee of ₹183 (incl. GST) is required.
            </p>
            <div className="pt-4">
              <div id="razorpay-payment-container">
                <form>
                  {/* The script will be dynamically added here */}
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portal;
