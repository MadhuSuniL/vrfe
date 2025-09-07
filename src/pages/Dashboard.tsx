import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { VideoCard } from '@/components/VideoCard';
import { VideoModal } from '@/components/VideoModal';
import { UploadZone } from '@/components/UploadZone';
import { useApp } from '@/contexts/AppContext';
import { User, LogOut, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiCallWithToken } from '@/utils/axios';

type VideoJob = {
  id: string;
  video_details: {
    id: string;
    original_file: string;
    thumbnail: string;
    filename: string;
    filesize: number | null;
    duration: number | null;
    time_ago: string;
  };
  status: string;
  progress: number;
  output_file: string | null;
  created_at: string;
};

const Dashboard: React.FC = () => {
  const { user, logout } = useApp();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<VideoJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch jobs from API
  const fetchJobs = () => {
    apiCallWithToken<VideoJob[]>(
      "vr_conv/jobs/",
      null,
      "GET",
      setLoading,
      (data) => setJobs(data),
      (error) => {
        console.error("Failed to fetch jobs:", error);
        toast({
          title: "Error",
          description: "Unable to fetch videos. Please try again.",
          variant: "destructive",
        });
      }
    );
  };

  const updateJobStatus = (jobId: string, status: string, output_file: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status, output_file } : job
      )
    );
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  // Show notification when a job becomes completed
  useEffect(() => {
    // toast({
    //   title: "🎉 Your video is ready to watch!",
    //   description: "VR180 conversion complete. Click to view your immersive experience.",
    // });
  }, [jobs, toast]);

  const handleVideoClick = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job.status.toLowerCase() === "completed") {
      setSelectedVideo(job);
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-glass-border bg-glass-bg backdrop-blur-glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-primary animate-glow-pulse rounded-sm" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                2D → VR180 Converter
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <User className="w-5 h-5 mr-2" />
                  {user?.nick_name || 'Profile'}
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-glass-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Upload Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 animate-slide-up">
              Upload New Video
            </h2>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <UploadZone fetchJobs={fetchJobs} />
            </div>
          </section>

          {/* Videos Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Your VR180 Library
            </h2>

            {loading ? (
              <GlassCard className="text-center py-12">
                <p className="text-muted-foreground">Loading your videos...</p>
              </GlassCard>
            ) : jobs.length === 0 ? (
              <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <GlassCard className="text-center py-12">
                  <div className="space-y-4">
                    <Zap className="w-16 h-16 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold text-muted-foreground">
                      No videos yet
                    </h3>
                    <p className="text-muted-foreground">
                      Upload your first 2D video to start creating VR180 experiences
                    </p>
                  </div>
                </GlassCard>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {jobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <VideoCard
                      id={job.video_details.id}
                      jobId={job.id}
                      title={job.video_details.filename}
                      status={job.status}
                      thumbnail={job.video_details.thumbnail}
                      outputFile={job.output_file}
                      uploadedAt={job.video_details.time_ago}
                      fileSize={job.video_details.filesize ? (job.video_details.filesize / (1024 * 1024)).toFixed(2) + ' MB' : null}
                      duration={job.video_details.duration ? new Date(job.video_details.duration * 1000).toISOString().substr(11, 8) : null}
                      onClick={() => handleVideoClick(job.id)}
                      updateJobStatus={updateJobStatus}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoTitle={selectedVideo?.video_details.filename || ''}
        videoUrl={selectedVideo?.output_file || ''}
      />

      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-accent/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
