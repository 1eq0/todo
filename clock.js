const h1 = document.querySelector("h1");

function paintClock(){
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    h1.innerText=`${hour<10 ? `0${hour}`:`${hour}`}:${minute<10 ? `0${minute}` : `${minute}`}:${second<10 ? `0${second}` : `${second}` }`;
}

function init(){
    setInterval(paintClock,1000);
}
init();