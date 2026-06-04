// findRooms()
function findRooms() {
  let resultsState = document.querySelector(".soy");
  const result = document.getElementById("result");
  let roomsDisplay = document.getElementById("roomlist");
  let rooms = ""
  console.log("Now finding rooms...");
  resultsState.style.display = "block";

  if (result.textContent.includes("TEST")) {
    rooms = "TestRoom 1, Testroom2, Testroom3"
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Willis Way")) {
    rooms = ["347, 312, 308, 306, 304, 303, 302, 301, 300"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Carson Cres")) {
    rooms = ["347, 343, 342"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Costello Road")) {
    rooms = ["343, 342, 341, 340, 339, 338"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Shakespeare St")) {
    rooms = ["338, 337, 334, 333 , 331, 330"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Memory Lane")) {
    rooms = ["347, 330, 320, 319"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Connolly Court")) {
    rooms = ["329, 325, 324, 322"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Biology BLVD")) {
    rooms = ["108, 107, 106, 105, 104, 103, 102, Greenhouse"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Harmony Lane")) {
    rooms = ["232, 228, 227, 225"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Labratory Lane")) {
    rooms = ["206, 205, 203, 202, 201, 200"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Trades Route")) {
    rooms = ["213, 208"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Drama Drive")) {
    rooms = ["221, 220, 218, 217"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Rue Rouge")) {
    rooms = ["239, 237, 236, 234, 233"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Athletics Ave.")) {
    rooms = ["249, Foods Lab, 243, 242, 241"];
    roomsDisplay.innerHTML = rooms;
  }
  else if (result.textContent.includes("Raider Road")) {
    rooms = ["Office, Staff Room, Student Services, IB Office"];
    roomsDisplay.innerHTML = rooms;
  }
  else {
    roomsDisplay.innerHTML = "NO MATCH";
  }
}

// PUTER
// image FILE to text converter
const imageInput = document.getElementById("image-input");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

async function processImage() {
  // Prefer uploaded image; otherwise capture a snapshot from webcam.
  let file;

  if (!file) {
    // Dynamically match canvas internal dimensions to the incoming video resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame of the video onto the canvas element
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas frame into an actual File object and wait for completion
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9)
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
    findRooms();
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
    0.9
  ); // Quality rating of 0.9
});

// Run the script on page load
initWebcam();

// rolando pistachio's code

const clickSound = new Audio("heehee.mp3");
const image = document.getElementById("pytt");
const sound = new Audio("heehee.mp3");
const normalImage = "pytt";
const activeImage =
  "https://media.tenor.com/B61bLDz43HkAAAAM/michael-jackson-smile.gif";
image.addEventListener("click", () => {
  // Play the sound instantly
  sound.currentTime = 0;
  sound.play();

  // Change the image immediately
  image.src = activeImage;

  // Wait 2 seconds (2000ms), then switch it back
  setTimeout(() => {
    image.src =
      "https://preview.redd.it/this-mike-meme-is-working-overtime-man-v0-aoenisk5kq7g1.jpeg?auto=webp&s=0e6889666a336f552117bf266031ffc23f0939a9";
  }, 2000);
});
