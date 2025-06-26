
import { useState } from "react";
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
    finalConsent: { declaration: false, terms: false }
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

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black mb-1">DocuVerify</h1>
            <p className="text-gray-600 text-sm">Powered by EarnIntern</p>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-gray-100 border-r border-gray-300 min-h-screen p-4">
          <div className="space-y-2">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => goToStep(step.number)}
                className={`w-full text-left px-4 py-3 border text-sm font-medium transition-colors ${
                  step.number === currentStep 
                    ? 'bg-white text-black border-gray-400 font-bold' 
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-white'
                }`}
              >
                {step.number}. {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white border border-gray-300">
            <div className="p-8">
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
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-300">
                  <Button 
                    onClick={handleBack} 
                    disabled={currentStep === 1}
                    variant="outline"
                    className="px-8 py-2 border-gray-300 text-black hover:bg-gray-50"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    className="px-8 py-2 bg-black hover:bg-gray-800 text-white"
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
        <DialogContent className="sm:max-w-md bg-white border border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold text-black">
              Application Verification
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              To verify the authenticity of your application, do necessary background checks 
              and provision your secure digital signature, a service charge of ₹183 (incl. GST) is required.
            </p>
            <div className="pt-4">
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_QlkHtuQN0e8WZH" async></script></form>`
                }} 
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portal;
