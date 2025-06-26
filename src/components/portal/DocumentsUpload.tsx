
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface DocumentsUploadProps {
  data: any;
  updateData: (data: any) => void;
}

const DocumentsUpload = ({ data, updateData }: DocumentsUploadProps) => {
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
    { key: 'degree', label: 'Degree Marksheet (any one semester or overall)' }
  ];

  return (
    <div>
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Step 3: Documents Upload</h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentTypes.map((doc) => (
            <Card key={doc.key} className="border border-gray-400 p-4 bg-gray-50">
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
                      className="w-full flex items-center gap-2 border-dashed border-2 border-gray-500 py-8 hover:border-gray-600 bg-white"
                    >
                      <Upload className="h-4 w-4" />
                      Upload File
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-400">
                    <span className="text-sm text-gray-700 truncate">
                      {documents[doc.key]?.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => clearFile(doc.key)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsUpload;
