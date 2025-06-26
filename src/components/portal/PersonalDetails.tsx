
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalDetailsProps {
  data: any;
  updateData: (data: any) => void;
}

const PersonalDetails = ({ data, updateData }: PersonalDetailsProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
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
      <CardHeader className="pb-6">
        <CardTitle className="text-xl text-slate-800">Step 1: Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="border-gray-300"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">
              Father's Full Name *
            </Label>
            <Input
              id="fatherName"
              value={formData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
              className="border-gray-300"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
              Date of Birth *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="border-gray-300"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
              Contact Number *
            </Label>
            <Input
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              className="border-gray-300"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="permanentAddress" className="text-sm font-medium text-gray-700">
            Permanent Address *
          </Label>
          <Textarea
            id="permanentAddress"
            value={formData.permanentAddress}
            onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
            className="border-gray-300 min-h-24"
            placeholder="Enter your complete permanent address"
            required
          />
        </div>
      </CardContent>
    </div>
  );
};

export default PersonalDetails;
