import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileVideo, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiCallWithToken } from '@/utils/axios';

export const UploadZone: React.FC = ({ fetchJobs }) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setProgress(0);
      setCompleted(false);

      // Step 1: Upload video
      const formData = new FormData();
      formData.append("original_file", file);

      apiCallWithToken(
        "vr_conv/upload-video/",
        formData,
        "POST",
        (loading) => setUploading(loading),
        (videoData) => {
          const videoId = videoData.id;

          toast({
            title: "Upload successful!",
            description: "Video uploaded. Starting conversion job...",
          });

          // Step 2: Create job
          apiCallWithToken(
            "vr_conv/jobs/create/",
            { video: videoId },
            "POST",
            null, // don't need loader here
            (jobData) => {
              setCompleted(true);
              fetchJobs(); // Refresh job list
              toast({
                title: "Job created!",
                description: `Video is now ${jobData.status}.`,
              });
            },
            (error) => {
              console.error("Failed to create job:", error);
              toast({
                title: "Job creation failed",
                description:
                  error?.response?.data?.detail ||
                  "Something went wrong while creating the job.",
                variant: "destructive",
              });
            }
          );
        },
        (error) => {
          console.error("Video upload failed:", error);
          toast({
            title: "Upload failed",
            description:
              error?.response?.data?.detail ||
              "Something went wrong while uploading your video.",
            variant: "destructive",
          });
          setUploading(false);
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e: ProgressEvent) => {
            if (e.total) {
              setProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        }
      );
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4", ".avi", ".mov", ".mkv"] },
    multiple: false,
    disabled: uploading,
  });

  return (
    <GlassCard className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative p-8 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer
          ${isDragActive
            ? 'border-primary bg-primary/5 shadow-glow-primary'
            : 'border-glass-border hover:border-primary/50 hover:bg-glass-hover'
          }
          ${uploading ? 'pointer-events-none opacity-75' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className="text-center space-y-4">
          {uploading ? (
            <>
              <FileVideo className="w-16 h-16 text-primary mx-auto animate-pulse" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Uploading...</h3>
                <Progress value={progress} className="w-full max-w-sm mx-auto" />
                <p className="text-sm text-muted-foreground">{progress}% complete</p>
              </div>
            </>
          ) : completed ? (
            <>
              <CheckCircle className="w-16 h-16 text-accent mx-auto animate-glow-pulse rounded-sm" />
              <h3 className="text-xl font-semibold text-foreground">Upload Complete!</h3>
              <p className="text-muted-foreground">Your video job is created and processing</p>
            </>
          ) : (
            <>
              <Upload className="w-16 h-16 text-primary mx-auto animate-float" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {isDragActive ? "Drop your video here" : "Upload 2D Video"}
                </h3>
                <p className="text-muted-foreground">
                  Drag & drop your video file or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports MP4, AVI, MOV, MKV files
                </p>
              </div>

              <Button
                variant="outline"
                className="bg-glass-bg border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Choose File
              </Button>
            </>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
