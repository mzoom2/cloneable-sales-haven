
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  label: string;
  imageUrl: string;
  onChange: (url: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  label, 
  imageUrl, 
  onChange,
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, GIF, or WEBP)",
        variant: "destructive"
      });
      return;
    }

    // Maximum file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // For now, we'll use a placeholder URL since we don't have a real file upload endpoint
    // In a real app, you would upload the file to a server or cloud storage
    setTimeout(() => {
      // For demo purposes we're just using placeholders
      // Here you'd handle the actual file upload
      const placeholderUrl = `https://placehold.co/400x400?text=${encodeURIComponent(file.name)}`;
      onChange(placeholderUrl);
      setIsLoading(false);
      toast({
        title: "Image uploaded",
        description: "The image has been uploaded successfully",
      });
    }, 1000);
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="text-sm font-medium">{label}</div>
      
      {imageUrl ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt={label}
            className="w-full h-40 object-contain bg-slate-100"
          />
          <Button 
            size="sm" 
            variant="destructive" 
            className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center h-40 bg-slate-50 cursor-pointer hover:border-blue-500 transition-colors">
          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">
            {isLoading ? "Uploading..." : "Click to upload image"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isLoading}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
