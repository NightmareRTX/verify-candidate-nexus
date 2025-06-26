
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface JobSectionProps {
  data: any;
  updateData: (data: any) => void;
}

const JobSection = ({ data, updateData }: JobSectionProps) => {
  const [formData, setFormData] = useState({
    interestedRole: '',
    selectedRoles: [],
    whyBestFit: '',
    ...data
  });

  const roleOptions = [
    "Junior Frontend Developer (React)",
    "Backend Developer (Node.js + Mongo/Postgres)",
    "QA Engineer (Manual + Automation)",
    "DevOps Intern / Junior Engineer",
    "AI/ML Intern (Applied NLP)",
    "Technical Support Engineer",
    "Junior Data Engineer",
    "Security & Compliance Associate (Entry-level)",
    "Associate Product Manager",
    "UI/UX Designer (Junior)",
    "Technical Content Writer",
    "Sales Development Representative (SDR)",
    "Growth Marketing Executive",
    "Customer Success Associate",
    "Content & Social Media Associate",
    "Marketing Ops Assistant",
    "Business Operations Associate",
    "Customer Support Executive",
    "Implementation Trainee",
    "Business Analyst (Entry Level)",
    "Market Research Analyst",
    "Pre-Sales Analyst",
    "Implementation Consultant (Junior)",
    "Founder's Office Associate",
    "HR & Recruitment Coordinator",
    "Culture & Events Intern"
  ];

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({
      ...prev,
      interestedRole: role
    }));
  };

  const handleMultiRoleToggle = (role: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedRoles: checked 
        ? [...prev.selectedRoles, role]
        : prev.selectedRoles.filter((r: string) => r !== role)
    }));
  };

  const handleTextChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      whyBestFit: value
    }));
  };

  return (
    <div>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl text-slate-800">Step 4: Job Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="interestedRole" className="text-sm font-medium text-gray-700">
            Role you are interested for *
          </Label>
          <p className="text-xs text-gray-500 mb-2">
            Know more about available careers{" "}
            <a 
              href="https://www.yumtra.app/careers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://www.yumtra.app/careers
            </a>
          </p>
          <Select value={formData.interestedRole} onValueChange={handleRoleSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Select multiple roles you're interested in (optional)
          </Label>
          <Card className="border border-gray-200 p-4 max-h-60 overflow-y-auto">
            <div className="grid grid-cols-1 gap-2">
              {roleOptions.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={`multi-${role}`}
                    checked={formData.selectedRoles.includes(role)}
                    onCheckedChange={(checked) => handleMultiRoleToggle(role, checked as boolean)}
                  />
                  <label 
                    htmlFor={`multi-${role}`} 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whyBestFit" className="text-sm font-medium text-gray-700">
            What makes you the best fit for this role? (100-200 words) *
          </Label>
          <Textarea
            id="whyBestFit"
            value={formData.whyBestFit}
            onChange={(e) => handleTextChange(e.target.value)}
            className="border-gray-300 min-h-32"
            placeholder="Describe why you're the perfect fit for this role..."
            maxLength={400}
            required
          />
          <p className="text-xs text-gray-500">
            {formData.whyBestFit.length}/400 characters
          </p>
        </div>
      </CardContent>
    </div>
  );
};

export default JobSection;
