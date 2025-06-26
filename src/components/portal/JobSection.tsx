
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

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

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

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      selectedRoles: prev.selectedRoles.includes(role)
        ? prev.selectedRoles.filter(r => r !== role)
        : [...prev.selectedRoles, role]
    }));
  };

  return (
    <div>
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-xl font-bold text-black">Step 4: Job Section</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-black">
            Role you are interested for *
          </Label>
          <p className="text-xs text-gray-600 mb-2">
            Know more about available careers <a href="https://www.yumtra.app/careers" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.yumtra.app/careers</a>
          </p>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, interestedRole: value }))}>
            <SelectTrigger className="border-gray-300 focus:border-gray-500">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 max-h-60">
              {roleOptions.map((role) => (
                <SelectItem key={role} value={role} className="hover:bg-gray-50">
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-black">
            Additional roles you're interested in (optional)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 p-3 bg-white">
            {roleOptions.map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox
                  id={role}
                  checked={formData.selectedRoles.includes(role)}
                  onCheckedChange={() => handleRoleToggle(role)}
                />
                <label htmlFor={role} className="text-xs text-black cursor-pointer">
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whyBestFit" className="text-sm font-medium text-black">
            What makes you the best fit for this role? (100-200 words) *
          </Label>
          <Textarea
            id="whyBestFit"
            value={formData.whyBestFit}
            onChange={(e) => setFormData(prev => ({ ...prev, whyBestFit: e.target.value }))}
            className="border-gray-300 focus:border-gray-500 min-h-32"
            placeholder="Describe why you would be the best fit for your selected role..."
            maxLength={1000}
            required
          />
          <p className="text-xs text-gray-500">{formData.whyBestFit.length}/1000 characters</p>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
