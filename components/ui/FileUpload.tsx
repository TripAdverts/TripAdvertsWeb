"use client";

import * as React from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const DEFAULT_ACCEPT = "image/png,image/jpeg,application/pdf";
const DEFAULT_MAX_SIZE_IN_MB = 5;

type FileUploadProps = {
  accept?: string;
  className?: string;
  description?: string;
  id?: string;
  label: string;
  maxSizeInMb?: number;
  name?: string;
  onChange?: (file: File | null) => void;
  value?: File | null;
};

function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(sizeInBytes / 1024))} KB`;
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesAcceptedFileType(file: File, accept: string) {
  const acceptedTypes = accept
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (acceptedTypes.length === 0) {
    return true;
  }

  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();

  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.startsWith(".")) {
      return fileName.endsWith(acceptedType);
    }

    if (acceptedType.endsWith("/*")) {
      const [typeGroup] = acceptedType.split("/");
      return mimeType.startsWith(`${typeGroup}/`);
    }

    return mimeType === acceptedType;
  });
}

function getDefaultDescription(accept: string, maxSizeInMb: number) {
  if (accept === DEFAULT_ACCEPT && maxSizeInMb === DEFAULT_MAX_SIZE_IN_MB) {
    return "PNG, JPG or PDF (max. 5MB)";
  }

  return `Accepted files up to ${maxSizeInMb}MB`;
}

export function FileUpload({
  accept = DEFAULT_ACCEPT,
  className,
  description,
  id,
  label,
  maxSizeInMb = DEFAULT_MAX_SIZE_IN_MB,
  name,
  onChange,
  value,
}: FileUploadProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalFile, setInternalFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const isControlled = value !== undefined;
  const selectedFile = isControlled ? value : internalFile;

  const updateSelectedFile = (file: File | null) => {
    if (!isControlled) {
      setInternalFile(file);
    }

    onChange?.(file);
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const openFileBrowser = () => {
    inputRef.current?.click();
  };

  const validateFile = (file: File) => {
    if (!matchesAcceptedFileType(file, accept)) {
      return "This file type is not supported";
    }

    if (file.size > maxSizeInMb * 1024 * 1024) {
      return `File must be ${maxSizeInMb}MB or smaller`;
    }

    return null;
  };

  const handleFileSelection = (fileList: FileList | null) => {
    const nextFile = fileList?.[0] ?? null;

    if (!nextFile) {
      setErrorMessage(null);
      updateSelectedFile(null);
      return;
    }

    const validationError = validateFile(nextFile);

    if (validationError) {
      setErrorMessage(validationError);
      clearInput();
      updateSelectedFile(null);
      return;
    }

    setErrorMessage(null);
    updateSelectedFile(nextFile);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <input
        accept={accept}
        className="sr-only"
        id={inputId}
        name={name}
        onChange={(event) => handleFileSelection(event.target.files)}
        ref={inputRef}
        type="file"
      />
      <div
        aria-controls={inputId}
        aria-describedby={`${inputId}-hint`}
        className={cn(
          "rounded-xl border-2 border-dashed p-6 transition-colors outline-none",
          "flex flex-col items-center justify-center gap-3 bg-muted/30",
          "cursor-pointer hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          errorMessage && "border-destructive/70 bg-destructive/5",
        )}
        onClick={openFileBrowser}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFileSelection(event.dataTransfer.files);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFileBrowser();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="rounded-full border border-border bg-card p-3 shadow-sm transition-transform group-hover:scale-105">
          <UploadCloud className="h-5 w-5 text-primary" />
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">
            Click to upload or drag and drop
          </div>
          <p
            className={cn(
              "mt-1 text-xs",
              errorMessage ? "text-destructive" : "text-muted-foreground",
            )}
            id={`${inputId}-hint`}
          >
            {errorMessage ?? description ?? getDefaultDescription(accept, maxSizeInMb)}
          </p>
        </div>
      </div>
      {selectedFile ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
          <button
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setErrorMessage(null);
              clearInput();
              updateSelectedFile(null);
            }}
            type="button"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
