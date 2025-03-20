# Youtube Style Listing Page

This project is used to display a list of videos fetched from a given API. It mimics the layout and functionality of a YouTube-style video listing page.

## Requirements

- Fetch and display a list of YouTube videos.
- Show video thumbnails, titles, and channel names.
- Allow users to click on a video to open it in YouTube.
- Implement a search bar to filter videos (filtering should be done on the frontend without making additional API calls).
- Implement a grid layout for better UI presentation.

## Features

1. **Fetch Videos from FreeAPI YouTube Endpoint**  
   The application fetches a list of videos from a public API endpoint and displays them in a grid layout.

2. **Video Details Display**  
   Each video will display the following:
   - Thumbnail of the video
   - Title of the video
   - Name of the channel

3. **Click to Open Video**  
   When a user clicks on a video, it will open the video in YouTube in a new tab.

4. **Search Functionality**  
   A search bar allows users to filter the displayed videos by their title. The filtering in frontend without additional API calls, making it more efficient.

5. **Grid Layout**  
   The videos will be displayed in a responsive grid layout, which adjusts to different screen sizes.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Vikky94/web-dev-cohort.git
   ```
2. Navigate to the project directory:
   ```bash
   cd JSAssignment 
   cd youTube-style-listing-page
   ```

## Usage
- Open the application in your browser at `http://localhost:3000` (or the specified port).
- Browse the list of videos and click on a video to view more details.

## API Integration
Ensure the API endpoint is correctly configured in the project to fetch video data. Update the API URL in the configuration file if necessary.

# Vercel Project link
https://web-dev-cohort-oz2bgswb7-vikky94s-projects.vercel.app/
