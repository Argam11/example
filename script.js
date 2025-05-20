const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const p3 = document.querySelector("#p3");
const air = document.querySelector(".air");
const beer = document.querySelector(".beer");

const input = document.getElementById("input");

input.onchange = (e) => {
  const v = e.target.value;

  air.style.transform = `translateX(-40%) rotateZ(${v}deg)`;
  beer.style.transform = `translateX(-40%) rotateZ(${v}deg)`;
};

// const button = document.createElement("button");
// button.innerHTML = "Allow motion sensors";
// document.body.appendChild(button);

// button.addEventListener("click", async () => {

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    try {
      // Request permission for device orientation
      const orientationPermission = await DeviceOrientationEvent.requestPermission();

      if (orientationPermission === "granted") {
        // Permission granted, now add the event listener
        window.addEventListener("deviceorientation", handleOrientation);
        console.log("Device orientation permission granted");
      } else {
        console.error("Device orientation permission denied");
      }

      // Hide the button after permission is handled
      button.style.display = "none";
    } catch (error) {
      console.error("Error requesting device orientation permission:", error);
    }
  } else {
    // For non-iOS or older iOS without the permission API
    window.addEventListener("deviceorientation", handleOrientation);
    // window.addEventListener('devicemotion', handleMotion);
    console.log("Device orientation listeners added (non-iOS)");
    button.style.display = "none";
  }
});
// });

const throttleFn = throttle((alpha) => {
    air.style.transform = `translateX(-40%) rotateZ(${alpha}deg)`;
    beer.style.transform = `translateX(-40%) rotateZ(${alpha}deg)`;
  }, 1000);
 

function handleOrientation(event) {
  // Access orientation data
  const alpha = Math.round(event.alpha); // Z-axis rotation [0, 360)
  // const beta = event.beta; // X-axis rotation [-180, 180)
  // const gamma = event.gamma; // Y-axis rotation [-90, 90)

  // p1.innerHTML = `x: ${alpha}`;
  // p2.innerHTML = `y: ${beta}`;
  // p3.innerHTML = `z: ${gamma}`;

  throttleFn(alpha);

  // console.log(`Orientation - Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`);
  // Use these values as needed
}

function throttle(mainFunction, delay = 500) {
  let timerFlag = null;

  return (...args) => {
    if (timerFlag === null) {
      mainFunction(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
}
