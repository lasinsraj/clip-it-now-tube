
import { useState, useEffect } from "react";
import UrlInput from "./UrlInput";
import VideoInfo from "./VideoInfo";
import FormatSelector from "./FormatSelector";
import { Card, CardContent } from "@/components/ui/card";
import { getVideoInfo } from "@/services/youtubeService";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface VideoDetails {
  title: string;
  thumbnail: string;
  duration: string;
  videoFormats: VideoFormat[];
  audioFormats: VideoFormat[];
}

interface VideoFormat {
  itag: string;
  quality: string;
  mimeType: string;
  container: string;
  hasAudio: boolean;
  hasVideo: boolean;
  contentLength: string;
  bitrate: number;
}

const YouTubeDownloader = () => {
  const [videoData, setVideoData] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFetchInfo = async (url: string) => {
    setLoading(true);
    setError(null);
    setVideoData(null); // Reset video data to prevent UI issues
    
    try {
      console.log("Fetching video info for:", url);
      const data = await getVideoInfo(url);
      console.log("Received video data:", data);
      
      if (!data || !data.title) {
        throw new Error("Invalid or incomplete video data received");
      }
      
      setVideoData(data);
      setVideoUrl(url);
      
      toast({
        title: "Success!",
        description: "Video information retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching video info:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: "Failed to fetch video information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // For debugging purposes
  useEffect(() => {
    if (error) {
      console.error("Error state:", error);
    }
    if (videoData) {
      console.log("Video data loaded:", videoData);
    }
  }, [error, videoData]);

  return (
    <div className="flex flex-col gap-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent">
          YouTube Video Downloader
        </h1>
        <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
          Download videos and audio from YouTube in various formats. Just paste the URL below and select your preferred format.
        </p>
        <UrlInput onFetchInfo={handleFetchInfo} isLoading={loading} />
        
        {error && (
          <Alert variant="destructive" className="mt-4 mx-auto max-w-3xl">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">Error: {error}</p>
              <p className="text-sm mt-2">
                Please ensure the YouTube URL is valid and the server is running.
                {import.meta.env.DEV && " For local development, make sure your backend is running on port 3001."}
              </p>
            </AlertDescription>
          </Alert>
        )}
      </section>

      {videoData && (
        <section className="grid gap-6 md:grid-cols-2">
          <VideoInfo
            title={videoData.title}
            thumbnail={videoData.thumbnail}
            duration={videoData.duration}
          />
          <FormatSelector
            url={videoUrl}
            videoFormats={videoData.videoFormats}
            audioFormats={videoData.audioFormats}
          />
        </section>
      )}

      <section className="mt-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">How to Download YouTube Videos</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Copy the YouTube video URL from your browser.</li>
              <li>Paste the URL in the input box above.</li>
              <li>Click the "Download" button to fetch video details.</li>
              <li>Choose your preferred format and quality.</li>
              <li>Click the download button next to your chosen format.</li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              Disclaimer: Please respect copyright laws and only download videos you have permission to access.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default YouTubeDownloader;
