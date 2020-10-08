const diskID = "disk-image";
const diskImageCount = 24;
const diskImagesPerLine = 8;
const diskImageHeight = 183;
const diskImageWidth = 183;
const diskImageLines = Math.ceil(diskImageCount / diskImagesPerLine);

const flowerID = "flower-image";
const flowerImageCount = 12;
const flowerImagesPerLine = 6;
const flowerImageLines = Math.ceil(flowerImageCount / flowerImagesPerLine);
const flowerImageHeight = 183;
const flowerImageWidth = 183;

const framesPerSecond = 8;
const milliSecondsPerFrame = 1000/framesPerSecond;

let disk = document.getElementById(diskID);
let disk_x = 0;
let disk_y = 0;
let currentDiskImage = 0;

let flower = document.getElementById(flowerID);
let flower_x = 0;
let flower_y = 0;
let currentFlowerImage = 0;

let automated = false;
let timeSinceLastFrame;
let animation;

document.addEventListener('keydown', onkeyDown);
checkAutomation();

function onkeyDown(event) 
{
    if(event.keyCode == 37 || event.keyCode == 76)
    {
        onLeft();
    }
    else if(event.keyCode == 39 || event.keyCode == 82) 
    {
        onRight();
    } 
    else if(event.keyCode == 65)
    {
        automated = !automated;
        checkAutomation();
        console.log("Automated? " + automated)
    }
}

function checkAutomation()
{
    if(automated)
    {
        timeSinceLastFrame = null;
        animation = window.requestAnimationFrame(automate);
    }
    else if(animation != undefined && animation != null)
    {
        window.cancelAnimationFrame(animation);
    }
}

function onLeft()
{
    if(currentDiskImage <= 0)
    {
        currentDiskImage = diskImageCount - currentDiskImage;
    }
    currentDiskImage = (currentDiskImage - 1) % diskImageCount;
    calcDiskImagePosition();

    if(currentFlowerImage <= 0)
    {
        currentFlowerImage = flowerImageCount - currentFlowerImage;
    }
    currentFlowerImage = (currentFlowerImage - 1) % flowerImageCount;
    calcFlowerImagePosition();
}

function onRight()
{
    currentDiskImage = (currentDiskImage + 1) % diskImageCount;
    currentFlowerImage = (currentFlowerImage + 1) % flowerImageCount;
    calcDiskImagePosition();
    calcFlowerImagePosition();
}

function calcDiskImagePosition()
{
    disk_x = currentDiskImage % diskImagesPerLine;
    disk_y = Math.floor(currentDiskImage / diskImagesPerLine);
    let xPos = disk_x * diskImageWidth;
    let yPos = disk_y * diskImageHeight;
    disk.style.backgroundPosition = (-xPos) + "px " + (-yPos) + "px";
}

function calcFlowerImagePosition()
{
    flower_x = currentFlowerImage % flowerImagesPerLine;
    flower_y = Math.floor(currentFlowerImage / flowerImagesPerLine);
    let xPos = flower_x * flowerImageWidth;
    let yPos = flower_y * flowerImageHeight;
    flower.style.backgroundPosition = (-xPos) + "px " + (-yPos) + "px";
}

function automate(timestamp)
{
    if(timeSinceLastFrame === null)
    {
        timeSinceLastFrame = timestamp
    }
    const elapsed = timestamp - timeSinceLastFrame;
    if(elapsed > milliSecondsPerFrame)
    {
        onRight();
        timeSinceLastFrame = timestamp;
    }
    animation = window.requestAnimationFrame(automate);
}