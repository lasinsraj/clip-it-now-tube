
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

// Determine API base URL based on environment
let API_URL = '/api';

// In development with Vite, we may need to use the actual server URL
if (import.meta.env.DEV) {
  // You can uncomment and use this if the proxy isn't working in development
  // API_URL = 'http://localhost:3001/api';
}

console.log('Using API URL:', API_URL);

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
    
    // Add extra validation for the expected data format
    if (typeof response.data === 'string' || !response.data.title || !response.data.videoFormats) {
      console.error('Received invalid data format:', response.data);
      throw new Error('Invalid data format received from server');
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
