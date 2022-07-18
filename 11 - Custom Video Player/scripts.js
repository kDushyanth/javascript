const viewer = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const playerSliders = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');

function togglePlay(){
    viewer.paused = !viewer.paused;
    viewer.paused ? viewer.play() : viewer.pause();
}
function updateToggleButton(){
    toggle.textContent = viewer.paused ? '▶' : '⏸';
}
function sliderHandler(e){
    viewer[this.name] = e.target.value;
}
function updateProgressBar(){
    progressBar.style.flexBasis = (viewer.currentTime/viewer.duration)*100 +'%';
}
function skipHandler(){
    viewer.currentTime += parseInt(this.dataset.skip);
}
function scrub(e){
    viewer.currentTime = (e.offsetX / viewer.offsetWidth) * viewer.duration;
}

let clicked = false;
viewer.addEventListener('click',togglePlay);
viewer.addEventListener('play',updateToggleButton);
viewer.addEventListener('pause',updateToggleButton);
viewer.addEventListener('timeupdate',updateProgressBar);
toggle.addEventListener('click',togglePlay);
playerSliders.forEach( playerSlider => playerSlider.addEventListener('change',sliderHandler));
playerSliders.forEach( playerSlider => playerSlider.addEventListener('mousemove',sliderHandler));
skipButtons.forEach( skipButton => skipButton.addEventListener('click',skipHandler));
progress.addEventListener('mouseup',()=> clicked = false);
progress.addEventListener('mousedown',()=> clicked = true);
progress.addEventListener('mouseout',()=> clicked = false);
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> clicked && scrub(e));