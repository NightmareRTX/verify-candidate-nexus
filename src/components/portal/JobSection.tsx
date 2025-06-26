
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  const jobRoles = [
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

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      interestedRole: role
    }));
  };

  const handleMultiRoleChange = (role: string, checked: boolean) => {
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
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Step 4: Job Section</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Role you are interested for *
          </Label>
          <p className="text-xs text-gray-600 mb-2">
            Know more about available careers <a href="https://www.yumtra.app/careers" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">https://www.yumtra.app/careers</a>
          </p>
          <Select onValueChange={handleRoleChange} value={formData.interestedRole}>
            <SelectTrigger className="border-gray-400 focus:border-gray-600">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {jobRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Additional roles you might be interested in (Optional)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-400 p-4 bg-gray-50">
            {jobRoles.map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox
                  id={role}
                  checked={formData.selectedRoles.includes(role)}
                  onCheckedChange={(checked) => handleMultiRoleChange(role, checked as boolean)}
                />
                <Label htmlFor={role} className="text-xs text-gray-700 cursor-pointer">
                  {role}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whyBestFit" className="text-sm font-medium text-gray-700">
            What makes you the best fit for this role? (100-200 words) *
          </Label>
          <Textarea
            id="whyBestFit"
            value={formData.whyBestFit}
            onChange={(e) => handleTextChange(e.target.value)}
            className="border-gray-400 focus:border-gray-600 min-h-32"
            placeholder="Describe what makes you the best fit for this role..."
            required
          />
          <p className="text-xs text-gray-500">
            {formData.whyBestFit.length}/200 words
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
