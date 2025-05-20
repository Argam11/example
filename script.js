const p = document.querySelector("#p");

window.addEventListener("deviceorientation", handleOrientation, true);
//    window.addEventListener("deviceorientationabsolute", handleOrientation, true);


var printTimeout;
var lastPrintEl;
var errorShown = false;

function handleOrientation(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    p.innerHTML = alpha + '/' + beta + '/' + gamma + '/' + 11;

    console.log('alpha', alpha);
    console.log('beta', beta);
    console.log('gamma', gamma);
}
