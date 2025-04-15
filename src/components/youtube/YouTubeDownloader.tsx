
import { useState } from "react";
import UrlInput from "./UrlInput";
import VideoInfo from "./VideoInfo";
import FormatSelector from "./FormatSelector";
import { Card, CardContent } from "@/components/ui/card";
import { getVideoInfo } from "@/services/youtubeService";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleFetchInfo = async (url: string) => {
    setLoading(true);
    try {
      const data = await getVideoInfo(url);
      setVideoData(data);
      setVideoUrl(url);
    } catch (error) {
      console.error("Error fetching video info:", error);
      toast({
        title: "Error",
        description: "Failed to fetch video information. Please try again.",
        variant: "destructive",
      });
      // Reset videoData to prevent UI issues
      setVideoData(null);
    } finally {
      setLoading(false);
    }
  };

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
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default YouTubeDownloader;
