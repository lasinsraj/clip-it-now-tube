
import axios from 'axios';

interface VideoInfo {
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

const API_URL = '/api';

export const getVideoInfo = async (url: string): Promise<VideoInfo> => {
  try {
    const response = await axios.get(`${API_URL}/info`, {
      params: { url }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw error;
  }
};

export const getDownloadLink = (url: string, itag: string, format: string): string => {
  return `${API_URL}/download?url=${encodeURIComponent(url)}&itag=${itag}&format=${format}`;
};
