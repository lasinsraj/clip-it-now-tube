
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

// Static files
app.use(express.static(path.join(__dirname, '/dist')));

// Get video info
app.get('/api/info', async (req, res) => {
  try {
    const url = req.query.url;
    
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    const info = await ytdl.getInfo(url);
    
    // Filter and map formats for easier frontend consumption
    const formats = info.formats.map(format => ({
      itag: format.itag,
      quality: format.qualityLabel || format.quality,
      mimeType: format.mimeType,
      container: format.container,
      hasAudio: format.hasAudio,
      hasVideo: format.hasVideo,
      contentLength: format.contentLength,
      bitrate: format.bitrate
    }));
    
    // Group formats
    const videoFormats = formats.filter(format => 
      format.hasVideo && 
      ['360p', '720p', '1080p'].includes(format.quality)
    );
    
    const audioFormats = formats.filter(format => 
      format.hasAudio && !format.hasVideo
    );
    
    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: info.videoDetails.lengthSeconds,
      videoFormats,
      audioFormats
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Failed to get video info' });
  }
});

// Download endpoint
app.get('/api/download', async (req, res) => {
  try {
    const { url, itag, format } = req.query;
    
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    
    // Set appropriate headers for downloading
    res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.${format || 'mp4'}"`);
    
    // Stream the video
    ytdl(url, { quality: itag })
      .on('error', (err) => {
        console.error('Error during download:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Download failed' });
        }
      })
      .pipe(res);
      
  } catch (error) {
    console.error('Error during download process:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Download process failed' });
    }
  }
});

// Serve React app in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
