/* Home Page */

/* Images Page*/
// Load Pictures
function increment() {
  imgIndex++;
  if (imgIndex % imgs.length == 0) {
    imgIndex = 0;
  }
}
function decrement() {
  --imgIndex;
  if (imgIndex == -1) {
    imgIndex = imgs.length - 1;
  }
}
function updateImg() {
  activeImg.src = imgs[imgIndex].src;
  activeImg.description = imgs[imgIndex].description;
  document.getElementById("img-caption").innerHTML = imgs[imgIndex].description;
}
function OpenCloseWindow() {
  // set prevWindow to opened window
  var prevWindow = window.open(imgs[imgIndex].link, "_blank");
  // time out window and close it
  setTimeout(() => {
    prevWindow.close();
  }, 3000);
}

//Set up floating image
var posX = 0;
var posY = 0;
var spd = [
  Math.floor(Math.random() * 5) + 1,
  Math.floor(Math.random() * 5) + 1,
];

function MoveImg(elemID) {
  elem = document.getElementsByClassName(elemID)[0];
  let id = setInterval(frame, 10);
}

//frame function to bounce image. inverse speed when at edge
function frame() {
  if (posX > window.outerHeight * 0.8 || posX < -10) {
    spd[0] = spd[0] * -1;
  }
  if (posY > window.outerWidth * 0.9 || posY < -10) {
    spd[1] = spd[1] * -1;
  }
  posX += spd[0];
  posY += spd[1];
  elem.style.top = posX + spd[0] + "px";
  elem.style.left = posY + spd[1] + "px";
}
//function to adjust speed when mousehover
function reverse() {
  spd = [
    -1 * (Math.floor(Math.random() * 5) + 1),
    -1 * (Math.floor(Math.random() * 5) + 1),
  ];
}

/* Register Page */
function Form_submit() {
  return confirm(
    "This will submit your form and you will not be able to make any further changes.\nContinue?"
  );
}

/* Register Page */
function Form_submit_purchase() {
  return confirm(
    "This will submit your purchase for payment and you will not be able to make any further changes.\nContinue?"
  );
}

function Form_reset() {
  return confirm(
    "This will reset your form and you will lose all your changes.\nContinue?"
  );
}

function HoverForm(element) {
  element.nextElementSibling.style.display = "inline";
}

function HoverFormExit(element) {
  element.nextElementSibling.style.display = "none";
}
