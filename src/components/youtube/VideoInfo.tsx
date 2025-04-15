
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface VideoInfoProps {
  title: string;
  thumbnail: string;
  duration: string;
}

const formatDuration = (seconds: string): string => {
  const sec = parseInt(seconds, 10);
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const remainingSeconds = sec % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoInfo = ({ title, thumbnail, duration }: VideoInfoProps) => {
  return (
    <Card className="overflow-hidden shadow-md">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full object-cover aspect-video"
        />
        <Badge className="absolute bottom-2 right-2 flex items-center bg-black/70 text-white">
          <Clock className="mr-1 h-3 w-3" />
          {formatDuration(duration)}
        </Badge>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold line-clamp-2">{title}</h2>
      </div>
    </Card>
  );
};

export default VideoInfo;
