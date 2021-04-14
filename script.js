let calendar = document.querySelector('.calendar')

// Declaring Json Events
let events = [{
        "Date": "4/12/21",
        "time": "10:00",
        "eventName": "Meeting with Joe"
    },
    {
        "Date": "4/12/21",
        "time": "14:00",
        "eventName": "Meeting with Team"
    },
    {
        "Date": "4/15/21",
        "time": "10:00",
        "eventName": "Team Meeting"
    },
    {
        "Date": "4/15/21",
        "time": "11:00",
        "eventName": "Meeting with Development team on new Product concept"
    },
    {
        "Date": "4/15/21",
        "time": "15:00",
        "eventName": "Meeting with UI team"
    },
    {
        "Date": "4/16/21",
        "time": "10:00",
        "eventName": "Private Investors in San Jose"
    },
    {
        "Date": "4/16/21",
        "time": "15:00",
        "eventName": "Meeting at Deron"
    },
    {
        "Date": "4/19/21",
        "time": "12:00",
        "eventName": "Lunch @TF"
    },
    {
        "Date": "4/19/21",
        "time": "16:00",
        "eventName": "One more Long meeting for the day and then no more"
    }
];

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Checking weather it is a leap year or not
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

//Main Funcution to return calendar
generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    let days = "";
    let first_day = new Date(year, month, 1)

    // check events
    let event_dates = []
    for (let event of events) {

        event_dates.push(Number(event.Date.split("/")[1]))
    }
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');

        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
            <span></span>
            <span></span>
            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')

                if (event_dates.includes(i)) {
                    days += `<div class="event">${i}</div>`;
                } else {
                    days += `<div >${i}</div>`;
                }
            }
        }
        calendar_days.appendChild(day)
    }
}

// Presenting all month list to select one
let month_list = calendar.querySelector('.month-list')
month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})
let month_picker = calendar.querySelector('#month-picker')
month_picker.onclick = () => {
    month_list.classList.add('show')
}

// Arrows to change year
document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector(".calendar-days").addEventListener("click", printEvents);

// Function to show events
function printEvents(e) {
    document.querySelector(".print-events").innerHTML = "";
    let userSelectedDate = Number(e.target.textContent);
    for (let event of events) {
        if (userSelectedDate == event.Date.split("/")[1]) {
            const div = document.createElement("div");
            div.className = "event";
            div.innerHTML = `
            <h2>Event name: ${event.eventName}</h2>
            <h2>Event date: ${event.Date}</h2>
            <h2>Event time: ${event.time}</h2><hr> `;
            document.querySelector(".print-events").appendChild(div);
        }
    }
}