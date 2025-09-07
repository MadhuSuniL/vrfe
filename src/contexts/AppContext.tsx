import React, { createContext, useContext, useState, useEffect } from "react";
import { apiCall, apiCallWithToken } from "@/utils/axios";
import { setJsonData, getJsonData, setData, getData } from "@/utils/localStorage";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  status: "processing" | "ready";
  uploadedAt: Date;
  originalFile: string;
}

interface User {
  id: string;
  username?: string; // fallback for demo
  nick_name?: string;
  email: string;
  profile_picture?: string;
}

interface AppContextType {
  user: User | null;
  videos: Video[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nick_name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  uploadVideo: (file: File) => void;
  updateVideoStatus: (id: string, status: "processing" | "ready") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Beach Sunset VR180",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
    status: "ready",
    uploadedAt: new Date("2024-01-15"),
    originalFile: "beach_sunset.mp4",
  },
  {
    id: "2",
    title: "City Lights Experience",
    thumbnail:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop",
    status: "processing",
    uploadedAt: new Date("2024-01-16"),
    originalFile: "city_lights.mp4",
  },
  {
    id: "3",
    title: "Mountain Adventure VR",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    status: "ready",
    uploadedAt: new Date("2024-01-14"),
    originalFile: "mountain_adventure.mp4",
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => getJsonData<User>("user"));
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getData("accessToken")
  );

  // ✅ Login API
  const login = async (email: string, password: string) => {
    try {
      const response = await apiCall<{ user: User; token: string }>(
        "auth/login",
        { email, password },
        "post",
        () => { }, // skip loading state handling
        (data) => {
          setUser(data.user);
          setIsAuthenticated(true);
          setData("token", data.token);
          setJsonData("user", data.user);
        },
        (error) => {
          throw error;
        }
      );
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // ✅ Register API
  const register = async (nick_name: string, email: string, password: string) => {
    try {
      await apiCall<{ detail: string }>(
        "auth/register",
        { nick_name, email, password },
        "post",
        () => { },
        (data) => {
          console.log("Registered:", data.detail);
        },
        (error) => {
          throw error;
        }
      );
    } catch (error) {
      console.error("Register failed", error);
      throw error;
    }
  };

  // ✅ Logout API
  const logout = async () => {
    try {
      await apiCallWithToken<{ detail: string }>(
        "auth/logout",
        {},
        "post",
        () => { },
        (data) => {
          console.log(data.detail);
          setUser(null);
          setIsAuthenticated(false);
          localStorage.clear();
        },
        (error) => {
          console.error("Logout failed", error);
          setUser(null);
          setIsAuthenticated(false);
          localStorage.clear();
        }
      );
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.clear();
    }
  };

  // Video upload logic (mock)
  const uploadVideo = (file: File) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, "") + " VR180",
      thumbnail:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      status: "processing",
      uploadedAt: new Date(),
      originalFile: file.name,
    };
    setVideos((prev) => [newVideo, ...prev]);

    // Simulate processing
    setTimeout(() => {
      updateVideoStatus(newVideo.id, "ready");
    }, 5000);
  };

  const updateVideoStatus = (id: string, status: "processing" | "ready") => {
    setVideos((prev) =>
      prev.map((video) => (video.id === id ? { ...video, status } : video))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        videos,
        isAuthenticated,
        login,
        register,
        logout,
        uploadVideo,
        updateVideoStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
