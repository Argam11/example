const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const p3 = document.querySelector("#p3");

const button = document.createElement('button');
button.innerHTML = 'Allow motion sensors';
document.body.appendChild(button);

// Add click event to the button
button.addEventListener('click', async () => {
  // Check if permission API is available (iOS 13+)
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      // Request permission for device orientation
      const orientationPermission = await DeviceOrientationEvent.requestPermission();

      if (orientationPermission === 'granted') {
        // Permission granted, now add the event listener
        window.addEventListener('deviceorientation', handleOrientation);
        console.log('Device orientation permission granted');
      } else {
        console.error('Device orientation permission denied');
      }

      // Also request motion permission if needed
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        const motionPermission = await DeviceMotionEvent.requestPermission();
        if (motionPermission === 'granted') {
          // window.addEventListener('devicemotion', handleMotion);
          console.log('Device motion permission granted');
        }
      }

      // Hide the button after permission is handled
      button.style.display = 'none';
    } catch (error) {
      console.error('Error requesting device orientation permission:', error);
    }
  } else {
    // For non-iOS or older iOS without the permission API
    window.addEventListener('deviceorientation', handleOrientation);
    // window.addEventListener('devicemotion', handleMotion);
    console.log('Device orientation listeners added (non-iOS)');
    button.style.display = 'none';
  }
});

// Handler functions
function handleOrientation(event) {
  // Access orientation data
  const alpha = event.alpha; // Z-axis rotation [0, 360)
  const beta = event.beta;   // X-axis rotation [-180, 180)
  const gamma = event.gamma; // Y-axis rotation [-90, 90)

  p1.innerHTML = alpha;
  p2.innerHTML = beta;
  p3.innerHTML = gamma;

  console.log(`Orientation - Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`);
  // Use these values as needed
}