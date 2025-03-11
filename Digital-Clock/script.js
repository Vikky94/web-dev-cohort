const currentTime = document.getElementById('currentTime'),
todayDate = document.getElementById('todayDate');
function updateClock(){
    const currentDate = new Date(),
          hours = currentDate.getHours() < 10 ? currentDate.getHours() :currentDate.getHours() % 12 ,  
          minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes(),  
          seconds = currentDate.getSeconds() < 10 ? `0${currentDate.getSeconds()}` : currentDate.getSeconds(),
          amOrPM =   currentDate.getHours() > 12 ? 'PM' : 'AM',
          currentDay = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate(),
          currentMonth = currentDate.getMonth()  < 10 ? `0${currentDate.getMonth()+1}` : currentDate.getMonth()+1,
          currentYear = currentDate.getFullYear();

    currentTime.innerText = `0${hours}:${minutes}:${seconds} ${amOrPM}`;
    todayDate.innerText = `${currentDay}/${currentMonth}/${currentYear}`;
}

updateClock();
setInterval(updateClock, 1000);

