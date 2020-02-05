
function createMonthDropDown(select,monthObj) {
    monthObj.map((month) => {
        let option = document.createElement('option');
        option.value = month.name;
        option.name = month.name;
        let text = document.createTextNode(month.name);
        option.appendChild(text);
        select.appendChild(option);
        select.onchange = function(e){
            createCalendarContainer(e.target.value);
        }

    });
    // select.addEventListener("change",function(e){
    //     createCalendarContainer.bind({name:'January',days:31});
    // });
}

function createCalendarContainer(name){
    let monthName = document.createElement('h1');
    let monthText = document.createTextNode(name);
    monthName.appendChild(monthText);
    let calendarConatiner = document.querySelector('.calendarContainer');

    calendarConatiner.appendChild(monthName);

    let calendarDays = document.createElement('div');
    for(let i=1;i<=31;i++){
        let day = document.createElement('div');
        day.className = 'dayContainer';
        let dayText = document.createTextNode(i);
        day.appendChild(dayText);
        calendarDays.appendChild(day);
        calendarConatiner.appendChild(calendarDays);
    }
    console.log("done with loop")

}
window.onload = function () {
    let select = document.querySelector('select');
    let monthObj = [{
        name: "January",
        days: 31
    },
    {
        name: "February",
        days: 28
    },
    {
        name: "March",
        days: 31
    },
    {
        name: "April",
        days: 30
    },
    {
        name: "May",
        days: 31
    },
    {
        name: "June",
        days: 30
    },
    {
        name: "July",
        days: 31
    },
    {
        name: "August",
        days: 30
    },
    {
        name: "September",
        days: 30
    },
    {
        name: "October",
        days: 31
    },
    {
        name: "November",
        days: 30
    },
    {
        name: "December",
        days: 31
    }];
    createMonthDropDown(select,monthObj);
    // createCalendarContainer(monthObj);
}

