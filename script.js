const p = document.querySelector("#p");

window.addEventListener("deviceorientation", handleOrientation, true);
//    window.addEventListener("deviceorientationabsolute", handleOrientation, true);


var printTimeout;
var lastPrintEl;
var errorShown = false;

function handleOrientation(event) {
  try {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    p.innerHTML = alpha;

    console.log('alpha', alpha);
    console.log('beta', beta);
    console.log('gamma', gamma);
    

    // JS math works in radians, so convert
    var betaR = beta / 180 * Math.PI;
    var gammaR = gamma / 180 * Math.PI;
    var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
    // convert back to degrees
    var spin = spinR * 180 / Math.PI;

    // throttle output
    // if (printTimeout == undefined) {
    //   var outEl = document.getElementById("rotationOutput");
    //   var element = document.createElement("div");
    //   element.innerHTML = ""
    //     + "\tSpin = " + Math.floor(spin)
    //     + "\tAlpha = " + Math.floor(alpha)
    //     + "\tBeta = " + Math.floor(beta)
    //     + "\tGamma = " + Math.floor(gamma);
    //   if (lastPrintEl){
    //       outEl.insertBefore(element, lastPrintEl);

    //   } else {
    //     outEl.innerHTML = ""; // clear warning message
    //     outEl.appendChild(element);
    //   }
    //   lastPrintEl = element;
    //   printTimeout = setTimeout(function () {
    //     printTimeout = undefined;
    //   }, 3000);
    // }
  }
  catch (ex) {
    if (!errorShown) {
      errorShown = true;
      alert(ex);
    }
  }
}
