
# YouTube Video Downloader

A modern, responsive YouTube video downloader web application built with React, TypeScript, and Node.js.

## Features

- Clean, intuitive user interface with responsive design
- Paste YouTube URL to fetch video details (title, thumbnail, duration)
- Download videos in various qualities (360p, 720p, 1080p)
- Download audio in MP3 format
- Mobile-friendly layout
- Ad spaces included for monetization

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Axios for API requests
- Shadcn UI components

### Backend
- Node.js with Express
- ytdl-core for YouTube downloads
- CORS middleware for cross-origin requests

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. In a separate terminal, start the backend server:
   ```
   node server.js
   ```

## Deployment Instructions

### Backend Deployment

1. Deploy the Express backend to a platform like Heroku, Render, or Railway:

   ```bash
   # Login to Heroku
   heroku login
   
   # Create a new Heroku app
   heroku create your-app-name
   
   # Push to Heroku
   git push heroku main
   ```

2. Make sure to update the API_URL in `src/services/youtubeService.ts` to point to your deployed backend URL.

### Frontend Deployment on Netlify

1. Build the project:
   ```
   npm run build
   ```

2. Deploy to Netlify:

   a. Sign up or log in to [Netlify](https://www.netlify.com/)
   
   b. Drag and drop the `dist` folder to Netlify's upload area, or
   
   c. Connect your GitHub repository:
      - From the Netlify dashboard, click "New site from Git"
      - Select GitHub and choose your repository
      - Configure build settings:
        - Build command: `npm run build`
        - Publish directory: `dist`
      
   d. Under site settings, configure redirects by creating a `_redirects` file in the public directory:
      ```
      /* /index.html 200
      ```

   e. Configure environment variables if needed

3. Set up a proxy for API requests:
   - Create a Netlify function or use Netlify's rewrites to proxy requests to your backend

## Important Notes

- This application is for educational purposes only
- Users should respect copyright laws and the rights of content creators
- Only download videos that you have permission to download
- Some content may be protected by copyright laws

## License

This project is licensed under the MIT License - see the LICENSE file for details.
