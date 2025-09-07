import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { BACKEND_HOST } from '@/utils/axios';

import {
  Loader2,
  Play,
  Clock,
  Hourglass,
  XCircle,
  Ban
} from 'lucide-react';

interface VideoCardProps {
  jobId: string; // ✅ required for WebSocket connection
  id: string;
  title: string;
  thumbnail: string;
  status: 'PENDING' | 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  fileSize?: string; // new prop
  duration?: string; // new prop  uploadedAt: Date;
  onClick?: () => void;
  updateJobStatus?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  jobId,
  title,
  thumbnail,
  status: initialStatus,
  fileSize,
  duration,
  uploadedAt,
  onClick,
  updateJobStatus
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const formatDate = (date: Date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // 🔌 WebSocket connection
  useEffect(() => {
    if (status === 'COMPLETED' || status === 'FAILED' || status === 'CANCELLED') {
      return; // No need to connect
    }

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/jobs/${jobId}/`);

    socket.onopen = () => {
      console.log(`Connected to job socket: ${jobId}`);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.status) {
        if (data.status === 'COMPLETED') {
          toast({
            title: "🎉 Your video is ready to watch!",
            description: "VR180 conversion complete. Click to your latest video to immersive experience.",
          });
          let output_file_url = BACKEND_HOST.replace('/api/', data.output_file);
          console.log(output_file_url)
          updateJobStatus(jobId, data.status, output_file_url);
        }
        setStatus(data.status.toUpperCase());
      }
      if (data.progress !== undefined) {
        setProgress(data.progress);
      }
    };

    socket.onclose = () => {
      console.log(`Disconnected from job socket: ${jobId}`);
    };

    return () => {
      socket.close();
    };
  }, [jobId, status]);

  const renderOverlay = () => {
    switch (status) {
      case 'COMPLETED':
        return (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-12 h-12 text-white animate-glow-pulse" />
          </div>
        );
      case 'PROCESSING':
        return (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-white text-sm mb-3">Processing...</p>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white text-xs mt-2">{progress}%</span>
          </div>
        );
      case 'QUEUED':
        return (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <Hourglass className="w-8 h-8 text-yellow-400 animate-pulse mb-2" />
            <p className="text-white text-sm">Queued...</p>
          </div>
        );
      case 'PENDING':
        return (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <Clock className="w-8 h-8 text-blue-400 animate-pulse mb-2" />
            <p className="text-white text-sm">Pending...</p>
          </div>
        );
      case 'FAILED':
        return (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-red-400 text-sm">Failed</p>
          </div>
        );
      case 'CANCELLED':
        return (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <Ban className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-gray-300 text-sm">Cancelled</p>
          </div>
        );
      default:
        return null;
    }
  };

  const getBadgeClasses = () => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500 text-white shadow-glow-accent animate-glow-pulse';
      case 'PROCESSING':
        return 'bg-blue-500 text-white';
      case 'QUEUED':
        return 'bg-yellow-500 text-white';
      case 'PENDING':
        return 'bg-sky-500 text-white';
      case 'FAILED':
        return 'bg-red-500 text-white';
      case 'CANCELLED':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <GlassCard
      className="group cursor-pointer transition-all duration-300 hover:scale-105"
      hover
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay based on status */}
        {renderOverlay()}

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <Badge className={getBadgeClasses()}>{status}</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground text-md truncate line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        {/* New details */}
        {(fileSize || duration) && (
          <div className="flex gap-4 text-sm text-muted-foreground justify-even">
            {fileSize && <span>Size: {fileSize}</span>}
            {duration && <span>Duration: {duration}</span>}
          </div>
        )}
        <p className="text-muted-foreground text-xs flex justify-end">
          Uploaded {uploadedAt}
        </p>
      </div>
    </GlassCard>
  );
};
