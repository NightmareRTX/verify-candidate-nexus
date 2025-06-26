
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PersonalDetails from "@/components/portal/PersonalDetails";
import AcademicHistory from "@/components/portal/AcademicHistory";
import DocumentLocker from "@/components/portal/DocumentLocker";
import FinalReview from "@/components/portal/FinalReview";

const Portal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    personalDetails: {},
    academicHistory: {},
    documents: {},
    finalConsent: { declaration: false, terms: false }
  });

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Academic History" },
    { number: 3, title: "Document Locker" },
    { number: 4, title: "Final Review" }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-slate-800">DocuVerify</h1>
            <p className="text-sm text-gray-600 mt-1">Powered by EarnIntern</p>
          </div>
          
          {/* Progress Bar */}
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center ${
                  step.number === currentStep 
                    ? 'bg-slate-700 text-white px-3 py-1 rounded font-semibold' 
                    : 'text-gray-600'
                }`}>
                  <span className="mr-2">{step.number}.</span>
                  <span className="text-sm">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
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
              <DocumentLocker 
                data={formData.documents}
                updateData={(data) => updateFormData('documents', data)}
              />
            )}
            {currentStep === 4 && (
              <FinalReview 
                formData={formData}
                updateFinalConsent={(data) => updateFormData('finalConsent', data)}
                onFinalize={handleFinalize}
              />
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button 
                  onClick={handleBack} 
                  disabled={currentStep === 1}
                  variant="outline"
                  className="px-6"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="px-6 bg-slate-700 hover:bg-slate-800"
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Application Certification
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
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
