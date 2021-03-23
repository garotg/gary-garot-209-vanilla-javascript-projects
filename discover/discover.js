// Select all the DOM elements 

const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

//Function that will show the time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    //Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    //Function that will set 12hours format
    hour = hour % 12 || 12;

    //Give us the time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

//Function to add zero in front of the minutes and seconds
function addZero(n) {
    return(parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Function that would set the background and change greeting based on the time of the day
function setBackGreet() {
    let today = new Date(),
        hour = today.getHours();

    if(hour < 12) {
        //Morning
        document.body.style.backgroundImage ="url('morning.jpg')";
        greeting.textContent = 'Good Morning, ';
        document.body.style.color = 'white';
        document.body.style.minHeight = '500px';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';

    } else if(hour < 18) {
        //Afternoon
        document.body.style.backgroundImage ="url('afternoon.jpg')";
        greeting.textContent = 'Good Afternoon, ';
        document.body.style.color = 'black';
        document.body.style.minHeight = '500px';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';


    } else {
        //Evening
        document.body.style.backgroundImage ="url('night.jpg')";
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
        document.body.style.minHeight = '500px';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
    }
}


//Get name from the user
function getName() {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Enter Name]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
}


//Set name
function setName(e){
    if(e.type === 'keypress'){
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else{
        localStorage.setItem('name', e.target.innerText);
    }
}

//Get focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
      focus.textContent = '[Enter Focus]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
}

//Set focus
function setFocus(e){
    if(e.type === 'keypress'){
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else{
        localStorage.setItem('focus', e.target.innerText);
    }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


//Run all the functions
showTime();
setBackGreet();
getName();
getFocus();
