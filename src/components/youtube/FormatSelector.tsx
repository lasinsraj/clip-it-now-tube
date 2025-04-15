
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Music, Video } from "lucide-react";
import { getDownloadLink } from "@/services/youtubeService";
import { formatFileSize } from "@/lib/utils";

interface FormatSelectorProps {
  url: string;
  videoFormats: VideoFormat[] | undefined;
  audioFormats: VideoFormat[] | undefined;
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

const FormatSelector = ({ url, videoFormats = [], audioFormats = [] }: FormatSelectorProps) => {
  const [activeTab, setActiveTab] = useState("video");
  
  // Filter and sort video formats by quality - with a defensive check
  const filteredVideoFormats = (videoFormats || [])
    .filter(format => ["360p", "720p", "1080p"].includes(format.quality))
    .sort((a, b) => {
      const qualityMap: Record<string, number> = {
        "1080p": 3,
        "720p": 2,
        "360p": 1
      };
      return qualityMap[b.quality] - qualityMap[a.quality];
    });
  
  // Get highest quality audio format - with a defensive check
  const bestAudioFormat = (audioFormats || []).length > 0 
    ? (audioFormats || []).sort((a, b) => b.bitrate - a.bitrate)[0]
    : null;
  
  const handleDownload = (itag: string, format: string) => {
    const downloadUrl = getDownloadLink(url, itag, format);
    window.location.href = downloadUrl;
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Download Options</CardTitle>
        <CardDescription>
          Select your preferred format and quality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Audio
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video">
            <div className="space-y-3">
              {filteredVideoFormats.length > 0 ? (
                filteredVideoFormats.map((format) => (
                  <div
                    key={format.itag}
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="font-medium">
                        {format.quality} ({format.container.toUpperCase()})
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatFileSize(parseInt(format.contentLength, 10))}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleDownload(format.itag, format.container)}
                      className="flex items-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 transition-opacity"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No video formats available
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="audio">
            <div className="space-y-3">
              {bestAudioFormat ? (
                <div 
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <div className="font-medium">MP3 Audio</div>
                    <div className="text-xs text-muted-foreground">
                      {formatFileSize(parseInt(bestAudioFormat.contentLength, 10))}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload(bestAudioFormat.itag, 'mp3')}
                    className="flex items-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 transition-opacity"
                    size="sm"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No audio formats available
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FormatSelector;
