
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface FinalReviewProps {
  formData: any;
  updateFinalConsent: (data: any) => void;
  onFinalize: () => void;
}

const FinalReview = ({ formData, updateFinalConsent, onFinalize }: FinalReviewProps) => {
  const [consent, setConsent] = useState({
    declaration: false
  });

  const handleConsentChange = (field: string, value: boolean) => {
    const newConsent = { ...consent, [field]: value };
    setConsent(newConsent);
    updateFinalConsent(newConsent);
  };

  const canFinalize = consent.declaration;

  return (
    <div>
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-xl font-bold text-black">Step 5: Final Review</h2>
      </div>
      <div className="space-y-6">
        {/* Personal Details Review */}
        <Card className="border border-gray-300 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-black">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Full Name:</strong> {formData.personalDetails?.fullName || 'Not provided'}</div>
              <div><strong>Father's Name:</strong> {formData.personalDetails?.fatherName || 'Not provided'}</div>
              <div><strong>Email Address:</strong> {formData.personalDetails?.emailAddress || 'Not provided'}</div>
              <div><strong>Date of Birth:</strong> {formData.personalDetails?.dateOfBirth || 'Not provided'}</div>
              <div><strong>Contact Number:</strong> {formData.personalDetails?.contactNumber || 'Not provided'}</div>
            </div>
            <div className="text-sm pt-2">
              <strong>Permanent Address:</strong> 
              <p className="mt-1 text-gray-600">{formData.personalDetails?.permanentAddress || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Academic History Review */}
        <Card className="border border-gray-300 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-black">Academic History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <strong>10th Standard:</strong>
                <p>Board: {formData.academicHistory?.tenth?.board || 'Not provided'}</p>
                <p>Year: {formData.academicHistory?.tenth?.year || 'Not provided'}</p>
                <p>Percentage: {formData.academicHistory?.tenth?.percentage || 'Not provided'}</p>
              </div>
              <div>
                <strong>12th Standard:</strong>
                <p>Board: {formData.academicHistory?.twelfth?.board || 'Not provided'}</p>
                <p>Year: {formData.academicHistory?.twelfth?.year || 'Not provided'}</p>
                <p>Percentage: {formData.academicHistory?.twelfth?.percentage || 'Not provided'}</p>
              </div>
              <div>
                <strong>Bachelor's Degree:</strong>
                <p>University: {formData.academicHistory?.bachelor?.board || 'Not provided'}</p>
                <p>Year: {formData.academicHistory?.bachelor?.year || 'Not provided'}</p>
                <p>CGPA: {formData.academicHistory?.bachelor?.percentage || 'Not provided'}</p>
              </div>
            </div>
            
            {formData.academicHistory?.courses?.length > 0 && (
              <div>
                <strong className="text-sm">Bachelors Degree Coursework Details:</strong>
                <div className="mt-2 space-y-1">
                  {formData.academicHistory.courses.map((course: any, index: number) => (
                    <div key={index} className="text-sm text-gray-600">
                      {course.name}: {course.grade}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documents Review */}
        <Card className="border border-gray-300 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-black">Documents Uploaded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Passport Photograph: {formData.documents?.passport ? '✓ Uploaded' : '✗ Not uploaded'}</div>
              <div>10th Marksheet: {formData.documents?.tenth ? '✓ Uploaded' : '✗ Not uploaded'}</div>
              <div>12th Marksheet: {formData.documents?.twelfth ? '✓ Uploaded' : '✗ Not uploaded'}</div>
              <div>Degree Marksheet: {formData.documents?.degree ? '✓ Uploaded' : '✗ Not uploaded'}</div>
            </div>
          </CardContent>
        </Card>

        {/* Job Section Review */}
        <Card className="border border-gray-300 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-black">Job Preferences</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>
              <strong>Primary Role of Interest:</strong> {formData.jobSection?.interestedRole || 'Not provided'}
            </div>
            {formData.jobSection?.selectedRoles?.length > 0 && (
              <div>
                <strong>Additional Roles:</strong>
                <ul className="mt-1 text-gray-600">
                  {formData.jobSection.selectedRoles.map((role: string, index: number) => (
                    <li key={index}>• {role}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <strong>Why Best Fit:</strong>
              <p className="mt-1 text-gray-600">{formData.jobSection?.whyBestFit || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-gray-300" />

        {/* Consent Checkbox - Only Declaration */}
        <div className="space-y-4 bg-gray-50 p-4 border border-gray-300">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="declaration"
              checked={consent.declaration}
              onCheckedChange={(checked) => handleConsentChange('declaration', checked as boolean)}
            />
            <label htmlFor="declaration" className="text-sm text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I declare that all information provided is true and correct.
            </label>
          </div>
        </div>

        {/* Finalize Button */}
        <div className="pt-6">
          <div className="flex justify-center">
            <Button
              onClick={onFinalize}
              disabled={!canFinalize}
              className="px-8 py-2 bg-black hover:bg-gray-800 disabled:opacity-50 text-white"
            >
              Verify and Finalize Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReview;
