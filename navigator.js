
// VARIABLES
const video = document.getElementById('webcam_PLACEHOLDER')
    const button = document.getElementById('capture-btn_PLACEHOLDER')
    const canvas = document.getElementById('snapshot_PLACEHOLDER')

// Request native camera access
async function initCamera() {
    try {
      const constraints = {
        video: { 
          facingMode: 'user', // Use 'environment' for the rear camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false // Set to true if you also need the microphone
      };
  
      // Get the media stream from the native API
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Bind the stream to the HTML video element
      video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera: ', error);
    }
  }
  
  // Capture a still frame from the video stream
  button.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    // Draw the current frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas data to a usable image URL
    const imageDataURL = canvas.toDataURL('image/png');
    console.log('Saved snapshot URL:', imageDataURL);
  });
  
// Alternative: Start camera on the first tap anywhere on the screen
document.addEventListener('touchstart', () => {
  initCamera();
}, { once: true }); // { once: true } ensures it only fires on the very first tap

video.addEventListener('playing', () => {
  console.log("Camera is officially streaming!");
  // Example: Turn a UI dot green or remove a loading spinner
  // document.getElementById('status-dot').style.backgroundColor = 'red';
});