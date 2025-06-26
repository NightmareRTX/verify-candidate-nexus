
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface DocumentLockerProps {
  data: any;
  updateData: (data: any) => void;
}

const DocumentLocker = ({ data, updateData }: DocumentLockerProps) => {
  const [documents, setDocuments] = useState({
    passport: null,
    tenth: null,
    twelfth: null,
    degree: null,
    ...data
  });

  useEffect(() => {
    updateData(documents);
  }, [documents, updateData]);

  const handleFileSelect = (documentType: string, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const clearFile = (documentType: string) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: null
    }));
  };

  const documentTypes = [
    { key: 'passport', label: 'Passport Photograph' },
    { key: 'tenth', label: '10th Marksheet' },
    { key: 'twelfth', label: '12th Marksheet' },
    { key: 'degree', label: 'Degree Certificate' }
  ];

  return (
    <div>
      <CardHeader className="pb-6">
        <CardTitle className="text-xl text-slate-800">Step 3: Your Secure Document Locker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentTypes.map((doc) => (
            <Card key={doc.key} className="border border-gray-200 p-4">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">{doc.label}</h3>
                
                {!documents[doc.key] ? (
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileSelect(doc.key, file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex items-center gap-2 border-dashed border-2 border-gray-300 py-8 hover:border-gray-400"
                    >
                      <Upload className="h-4 w-4" />
                      Upload File
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                    <span className="text-sm text-gray-700 truncate">
                      {documents[doc.key]?.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => clearFile(doc.key)}
                      className="p-1 hover:bg-gray-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Document uploads are optional. You can proceed to the next step 
            without uploading any documents. However, uploading relevant documents may help in faster 
            verification of your credentials.
          </p>
        </div>
      </CardContent>
    </div>
  );
};

export default DocumentLocker;
