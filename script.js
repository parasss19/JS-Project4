// Get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipBtns = player.querySelectorAll('[data-skip]')
const rangeBtns = player.querySelectorAll('.player__slider')


//***************** Build out function ***********************

//1 video play/pause func
function toggleplay(){
    if(video.paused) {
        video.play()
    }
    else {
        video.pause()
    }
    updateBtn();    // Ensure the button icon updates when togglePlay is called
}

//2 update button symbol when play/pause
function updateBtn(){
   const icon = this.paused ? '▶️' : '⏸️'
   toggle.textContent = icon
}

//3 skip button function
function skipfunc(){
//   console.log(this.dataset.skip)  //it return string (25 or -10)
  video.currentTime += parseFloat(this.dataset.skip)   //convert string into floating point num
}

//4 handle range func
function handleRange(){
  //console.log(this.name)
  //console.log(this.value)
  video[this.name] = this.value   
}
// Note
// video[this.name] = this.value in handleRange function is part of a dynamic assignment to a property of the video object
// video[this.name] is equivalent to video["volume"] or video["playbackRate"]
// The value of the name attribute (e.g., "volume") determines which property of video will be updated, and it's set to the current value of the range input.


//5 handle video progress
function handleProgress(){
    const percent = (video.currentTime/ video.duration)*100
    console.log(percent)
    progressBar.style.flexBasis = `${percent}%`
}








//************************ Hook up the event listeners *******************************

//A when we click on video it will play/pause vid and update icon of toggle button
video.addEventListener('click', toggleplay) 
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
  
//B When we click on only toggle button it will also play/pause and update icon
toggle.addEventListener('click', toggleplay)  

//C skip eventlistener(here we use foreach coz we have 2 buttons for forward and backward the vid not a single element and we want to use eventlistern for both)
skipBtns.forEach((btn) => {
    btn.addEventListener('click', skipfunc)
});

//D range eventlisterner - we want when someone when change the speed and volume of video or even slide/mousemove handleRange even fire
rangeBtns.forEach(range => {
    range.addEventListener("change", handleRange)
});
rangeBtns.forEach(range => {
    // range.addEventListener("mousemove", handleRange)  //it work
    range.addEventListener("input", handleRange)  //it work
});
//Note
// Why input is Better
// The input event fires continuously as the user moves the slider handle.
// It works seamlessly on <input type="range"> elements and is designed for this purpose.


//E progressbar
video.addEventListener('timeupdate', handleProgress);
