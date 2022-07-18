const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function accessVideo() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    })
        .then(mediaStream => {
            video.srcObject = (mediaStream);
            video.play();
        })
        .catch(error => console.error(error));
}
function displayVideo(){
    const [w,h] = [video.clientWidth,video.clientHeight];
    canvas.clientHeight = w;
    canvas.clientWidth = h;
    //console.log(w,h)
    setInterval(()=>{
        ctx.drawImage(video,0,0,w,h);
    },16);
}
function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const imgData = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'image';
    link.innerHTML = `<img src = ${imgData} alt="image"/>`
    strip.insertBefore(link,strip.firstChild);
}

accessVideo();
displayVideo();
