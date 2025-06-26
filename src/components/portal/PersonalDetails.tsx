
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalDetailsProps {
  data: any;
  updateData: (data: any) => void;
}

const PersonalDetails = ({ data, updateData }: PersonalDetailsProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    emailAddress: '',
    dateOfBirth: '',
    contactNumber: '',
    permanentAddress: '',
    ...data
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-xl font-bold text-black">Step 1: Personal Details</h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-black">
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="border-gray-300 focus:border-gray-500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fatherName" className="text-sm font-medium text-black">
              Father's Full Name *
            </Label>
            <Input
              id="fatherName"
              value={formData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
              className="border-gray-300 focus:border-gray-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="emailAddress" className="text-sm font-medium text-black">
              Email Address *
            </Label>
            <Input
              id="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              className="border-gray-300 focus:border-gray-500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium text-black">
              Date of Birth *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="border-gray-300 focus:border-gray-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="text-sm font-medium text-black">
            Contact Number *
          </Label>
          <Input
            id="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
            className="border-gray-300 focus:border-gray-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="permanentAddress" className="text-sm font-medium text-black">
            Permanent Address *
          </Label>
          <Textarea
            id="permanentAddress"
            value={formData.permanentAddress}
            onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
            className="border-gray-300 focus:border-gray-500 min-h-24"
            placeholder="Enter your complete permanent address"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
