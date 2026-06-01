
// VARIABLES
const video = document.getElementById('webcam_PLACEHOLDER')
    const button = document.getElementById('capture-btn_PLACEHOLDER')
    const canvas = document.getElementById('snapshot_PLACEHOLDER')

// Request native camera access
async function initCamera() {
  try {
    const constraints = {
      video: { 
        facingMode: 'user', 
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false 
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    
    // Add this to ensure mobile kicks the video element into gear
    video.play().catch(err => console.error("Playback failed/prevented:", err));

  } catch (error) {
    console.log('Error accessing the camera: ', error);
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

// Jump Down Function for moving to a spot
function jumpDown() {
  
}

initCamera();