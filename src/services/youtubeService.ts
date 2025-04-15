
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

// For debugging - log the current environment
console.log('Current environment:', import.meta.env.MODE);

// In development with Vite, we may need to use the actual server URL
if (import.meta.env.DEV) {
  // You can uncomment this if needed for local development
  // API_URL = 'http://localhost:3001/api';
}

console.log('Using API URL:', API_URL);

export const getVideoInfo = async (url: string): Promise<VideoInfo> => {
  try {
    console.log(`Fetching info from ${API_URL}/info for URL: ${url}`);
    const response = await axios.get(`${API_URL}/info`, {
      params: { url },
      timeout: 45000, // 45 seconds timeout
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    console.log('API Response status:', response.status);
    console.log('API Response type:', typeof response.data);
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    // Enhanced validation for the response data format
    if (typeof response.data === 'string') {
      console.error('Received string instead of JSON:', response.data);
      throw new Error('Invalid data format: received HTML instead of JSON');
    }
    
    if (!response.data.title || !Array.isArray(response.data.videoFormats)) {
      console.error('Received invalid data structure:', response.data);
      throw new Error('Invalid data structure received from server');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        console.error('Error headers:', error.response.headers);
        throw new Error(`API Error (${error.response.status}): ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received, request:', error.request);
        throw new Error('No response from server. Please check your backend connection.');
      }
    }
    console.error('Error fetching video info:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const getDownloadLink = (url: string, itag: string, format: string): string => {
  // Ensure URL parameters are properly encoded
  return `${API_URL}/download?url=${encodeURIComponent(url)}&itag=${encodeURIComponent(itag)}&format=${encodeURIComponent(format)}`;
};
