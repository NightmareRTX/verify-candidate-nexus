
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface AcademicHistoryProps {
  data: any;
  updateData: (data: any) => void;
}

const AcademicHistory = ({ data, updateData }: AcademicHistoryProps) => {
  const [formData, setFormData] = useState({
    tenth: { board: '', year: '', percentage: '' },
    twelfth: { board: '', year: '', percentage: '' },
    bachelor: { board: '', year: '', percentage: '', degree: '' },
    courses: [{ name: '', grade: '' }],
    ...data
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, { name: '', grade: '' }]
    }));
  };

  const removeCourse = (index: number) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const handleCourseChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.map((course, i) => 
        i === index ? { ...course, [field]: value } : course
      )
    }));
  };

  const renderAcademicSection = (title: string, section: string, data: any, isBachelor = false) => (
    <Card className="border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-base sm:text-lg text-slate-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">
              {isBachelor ? "University/College *" : "Board/University *"}
            </Label>
            <Input
              value={data.board}
              onChange={(e) => handleInputChange(section, 'board', e.target.value)}
              className="border-gray-300"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Year of Passing *</Label>
            <Input
              value={data.year}
              onChange={(e) => handleInputChange(section, 'year', e.target.value)}
              className="border-gray-300"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Percentage/CGPA *</Label>
            <Input
              value={data.percentage}
              onChange={(e) => handleInputChange(section, 'percentage', e.target.value)}
              className="border-gray-300"
              required
            />
          </div>
          {isBachelor && (
            <div className="space-y-2 sm:col-span-2 lg:col-span-3">
              <Label className="text-sm text-gray-700">Degree (ex. B.Tech in Computer Science) *</Label>
              <Input
                value={data.degree}
                onChange={(e) => handleInputChange(section, 'degree', e.target.value)}
                className="border-gray-300"
                placeholder="e.g., B.Tech in Computer Science, B.Com, BBA"
                required
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl text-slate-800">Step 2: Academic History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {renderAcademicSection("10th Standard", "tenth", formData.tenth)}
        {renderAcademicSection("12th Standard", "twelfth", formData.twelfth)}
        {renderAcademicSection("Bachelor's Degree", "bachelor", formData.bachelor, true)}
        
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg text-slate-700">Bachelors Degree Coursework Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.courses.map((course, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div className="flex-1 space-y-2 w-full">
                  <Label className="text-sm text-gray-700">Course Name</Label>
                  <Input
                    value={course.name}
                    onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="flex-1 space-y-2 w-full">
                  <Label className="text-sm text-gray-700">Grade/Marks Obtained</Label>
                  <Input
                    value={course.grade}
                    onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                {formData.courses.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCourse(index)}
                    className="p-2 w-full sm:w-auto"
                  >
                    <X className="h-4 w-4" />
                    <span className="sm:hidden ml-2">Remove</span>
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addCourse}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </div>
  );
};

export default AcademicHistory;
