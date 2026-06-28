MONTHSARY WEBSITE SETUP

Open index.html in your browser to preview the website.

To add your own photos:
1. Put your pictures inside assets/images/.
2. Open index.html and replace the SVG paths with your actual image paths.
   Example:
   data-image="assets/images/photo-hero.svg"
   becomes:
   data-image="assets/images/your-photo.jpg"

To add music:
1. Put an MP3 file inside assets/music/.
2. Open index.html and update the audio tag:
   <audio id="love-song" src="assets/music/monthsary-song.mp3" loop preload="auto"></audio>

Important:
Most phone browsers will only start music after the first tap. This site starts the music when she taps "Open my letter", which is the reliable autoplay-friendly flow.

To personalize the text:
Open index.html and replace the letter, captions, date line, and names.
