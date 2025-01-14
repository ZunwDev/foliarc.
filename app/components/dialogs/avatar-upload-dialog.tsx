import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertCircle, ImagePlus, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[number];

interface AvatarUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
  maxFileSize?: number;
  allowedTypes?: readonly AllowedFileType[];
}

interface FileValidationResult {
  isValid: boolean;
  error: string;
}

const AvatarUploadDialog = ({
  isOpen,
  onClose,
  onUpload,
  maxFileSize = MAX_FILE_SIZE,
  allowedTypes = ALLOWED_FILE_TYPES,
}: AvatarUploadDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateFile = useCallback(
    (file: File): FileValidationResult => {
      if (!file) {
        return { isValid: false, error: "Please select a file" };
      }
      if (!allowedTypes.includes(file.type as AllowedFileType)) {
        return {
          isValid: false,
          error: "Please upload a valid image file (JPEG, PNG, or WebP)",
        };
      }
      if (file.size > maxFileSize) {
        return {
          isValid: false,
          error: `File size must be less than ${maxFileSize / (1024 * 1024)}MB`,
        };
      }
      return { isValid: true, error: "" };
    },
    [allowedTypes, maxFileSize]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setError("");

      if (!file) return;

      const { isValid, error } = validateFile(file);
      if (!isValid) {
        setError(error);
        setSelectedFile(null);
        setPreviewUrl("");
        return;
      }

      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPreviewUrl(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    },
    [validateFile]
  );

  const handleImageSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setError("");

    try {
      await onUpload(selectedFile);
      handleClose();
    } catch (error) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl("");
    setError("");
    onClose();
  }, [onClose]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      document.getElementById("avatar-upload")?.click();
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Upload a New Avatar</DialogTitle>
          <DialogDescription>Upload a new avatar for your profile.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleImageSubmit} className="space-y-4">
          <div
            className="relative flex justify-center items-center flex-col bg-muted rounded-lg p-6 cursor-pointer group transition-colors"
            onClick={() => document.getElementById("avatar-upload")?.click()}
            role="button"
            tabIndex={0}
            onKeyUp={handleKeyPress}
            aria-label="Click to upload image">
            <div
              className={`relative flex justify-center items-center size-32 rounded-full ${
                previewUrl ? "bg-cover bg-center" : "bg-foreground/50"
              }`}
              style={{
                backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
              }}>
              {!previewUrl && (
                <span className="text-muted">
                  <ImagePlus size={32} />
                </span>
              )}
            </div>
            <Input
              type="file"
              id="avatar-upload"
              accept={allowedTypes.join(",")}
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Upload avatar image"
            />
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors mt-2">Upload Image</span>
          </div>

          {error && (
            <div className="text-red-500 flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedFile || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Applying...
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUploadDialog;
