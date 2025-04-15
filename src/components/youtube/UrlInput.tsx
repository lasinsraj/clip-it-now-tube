
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";

interface UrlInputProps {
  onFetchInfo: (url: string) => Promise<void>;
  isLoading: boolean;
}

const UrlInput = ({ onFetchInfo, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for YouTube URL
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await onFetchInfo(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch video information",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              Download 
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UrlInput;
