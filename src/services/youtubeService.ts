
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

// Use relative URL for API which will be proxied by the server
const API_URL = '/api';

export const getVideoInfo = async (url: string): Promise<VideoInfo> => {
  try {
    console.log(`Fetching info from ${API_URL}/info for URL: ${url}`);
    const response = await axios.get(`${API_URL}/info`, {
      params: { url },
      timeout: 30000, // 30 seconds timeout
    });
    
    console.log('API Response:', response);
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
        throw new Error(`API Error (${error.response.status}): ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your backend connection.');
      }
    }
    console.error('Error fetching video info:', error);
    throw error;
  }
};

export const getDownloadLink = (url: string, itag: string, format: string): string => {
  return `${API_URL}/download?url=${encodeURIComponent(url)}&itag=${itag}&format=${format}`;
};
