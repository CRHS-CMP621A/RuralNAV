// PUTER
// image FILE to text converter
const imageInput = document.getElementById("image-input");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

async function processImage() {
  // Prefer uploaded image; otherwise capture a snapshot from webcam.
  let file = imageInput.files[0];

  if (!file) {
    // Dynamically match canvas internal dimensions to the incoming video resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame of the video onto the canvas element
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas frame into an actual File object and wait for completion
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9),
    );

    if (!blob) {
      result.textContent = "Error: Canvas processing failed";
      return;
    }

    file = new File([blob], "camera-snapshot.jpg", {
      type: "image/jpeg",
    });
  }

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  result.textContent = ""; // Clear previous result

  // continue PUTER

  if (!file) {
    alert("Please select an image first");
    return;
  }

  result.textContent = "Processing image...";

  try {
    // Convert file to data URL
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

    // Now pass the data URL to img2txt
    const text = await puter.ai.img2txt(dataUrl);
    result.textContent = text || "No text found in image";
  } catch (error) {
    result.textContent = "Error: " + error.message;
  }
}

// webcam usage
// 1. Select the necessary DOM elements
const video = document.getElementById("webcam");
const canvas = document.getElementById("snapshot");
const captureButton = document.getElementById("capture-btn");
const context = canvas.getContext("2d");

// 2. Define the media constraints (Resolution and Device requirements)
const constraints = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "environment", // "user" for front camera, "environment" for rear camera
  },
  audio: false, // Set to true if you need microphone access alongside the video
};

// 3. Request permissions and start the video stream
async function initWebcam() {
  try {
    // Verify browser compatibility
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Your browser does not support the MediaDevices API.");
    }

    // Await user permission and fetch the media stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    // Assign the stream to our HTML video element
    video.srcObject = stream;
  } catch (error) {
    console.error("Error accessing the webcam: ", error);
    alert("Could not access webcam. Please ensure permissions are granted.");
  }
}

// 4. Capture a still photo frame from the video stream
captureButton.addEventListener("click", () => {
  // Dynamically match canvas internal dimensions to the incoming video resolution
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current frame of the video onto the canvas element
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 3. Convert the canvas frame into an actual File object
  canvas.toBlob(
    (blob) => {
      if (!blob) {
        console.error("Canvas processing failed");
        return;
      }

      // Create a standard File instance ready for uploading or saving
      const snapshotFile = new File([blob], "camera-snapshot.jpg", {
        type: "image/jpeg",
      });

      console.log("File object successfully created:", snapshotFile);
      file = snapshotFile; // Store in a variable for later use (e.g., sending to server)

      //   display the captured image in the preview element
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
      result.textContent = ""; // Clear previous result

      // Optional: Send to server via FormData API
      // const formData = new FormData();
      // formData.append('image', snapshotFile);
      // fetch('/upload', { method: 'POST', body: formData });
    },
    "image/jpeg",
    0.9,
  ); // Quality rating of 0.9
});

// Run the script on page load
initWebcam();