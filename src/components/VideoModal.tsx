import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoUrl?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoTitle,
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${videoTitle}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url); // free memory
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-glass-bg backdrop-blur-glass border-glass-border max-w-4xl w-full mx-4">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {videoTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Download Section */}
          <div className="flex items-center justify-between p-6 bg-glass-bg border border-glass-border rounded-xl">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                VR180 Experience Ready
              </h3>
              <p className="text-muted-foreground">
                Download your immersive VR180 video file to view in a compatible player
              </p>
            </div>
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300 hover:shadow-glow-primary animate-glow-pulse"
            >
              <Download className="w-5 h-5 mr-2" />
              Download VR180
            </Button>
          </div>

          {/* Video Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-glass-bg border border-glass-border rounded-xl">
              <p className="text-2xl font-bold text-primary">180°</p>
              <p className="text-muted-foreground text-sm">Field of View</p>
            </div>
            <div className="p-4 bg-glass-bg border border-glass-border rounded-xl">
              <p className="text-2xl font-bold text-secondary">4K</p>
              <p className="text-muted-foreground text-sm">Resolution</p>
            </div>
            <div className="p-4 bg-glass-bg border border-glass-border rounded-xl">
              <p className="text-2xl font-bold text-accent">VR</p>
              <p className="text-muted-foreground text-sm">Ready</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
