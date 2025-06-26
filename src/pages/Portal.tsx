
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Government-style Header */}
      <div className="bg-slate-800 border-b-4 border-slate-600">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">DocuVerify</h1>
            <p className="text-slate-300 text-sm">Powered by EarnIntern</p>
          </div>
          
          {/* Government-style Progress Bar */}
          <div className="bg-slate-700 p-4 rounded">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`px-4 py-2 text-sm font-medium border ${
                    step.number === currentStep 
                      ? 'bg-slate-200 text-slate-800 border-slate-300' 
                      : 'bg-slate-600 text-slate-200 border-slate-500'
                  }`}>
                    {step.number}. {step.title}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-4 h-px bg-slate-500 mx-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white border border-slate-300 shadow">
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
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                <Button 
                  onClick={handleBack} 
                  disabled={currentStep === 1}
                  variant="outline"
                  className="px-8 py-2 border-slate-400 text-slate-700 hover:bg-slate-50"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="px-8 py-2 bg-slate-700 hover:bg-slate-800 text-white"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-300">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold text-slate-800">
              Application Verification
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              To verify the authenticity of your application, do necessary background checks 
              and provision your secure digital signature, a service charge of ₹183 (incl. GST) is required.
            </p>
            <div className="pt-4">
              <form>
                <script 
                  src="https://checkout.razorpay.com/v1/payment-button.js" 
                  data-payment_button_id="pl_QlkHtuQN0e8WZH" 
                  async
                ></script>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portal;
