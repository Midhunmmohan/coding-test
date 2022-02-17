const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_year = document.querySelector('.date-picker .dates .month .mth .mth-year');
const mth_date = document.querySelector('.date-picker .dates .month .mth .mth-date');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const day_element = document.querySelector('.date-picker .dates .days day');
const weeks_element = document.querySelector('.date-picker .dates .week');
const years_element = document.querySelector('.date-picker .dates .pick-years');
const months_element = document.querySelector('.date-picker .dates .pick-months');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const years = ["1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2009","2010","2011","2012","2013","2014","2015","2016","2017","2019","2020","2021","2022","2023","2024","2025","2026","2027","2029"]

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_year.textContent =  year;
mth_date.textContent = months[month];

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

var day_of_the_week = new Date(year, month, 1).getDay();
populateWeeks ()
populateDates();

date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);


function toggleDatePicker (e) {
	if (!checkEventPathForClass(e.path, 'dates')) {
		dates_element.classList.toggle('active');
		populateDates();
	}
}

function goToNextMonth (e) {
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	mth_year.textContent =  year;
    mth_date.textContent = months[month];
	day_of_the_week = new Date(year, month, 1).getDay()
	populateDates();
}

function goToPrevMonth (e) {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
    mth_year.textContent =  year;
	mth_date.textContent = months[month];
	day_of_the_week = new Date(year, month, 1).getDay()
	populateDates();
}

function populateWeeks () {
    weeks_element.innerHTML = '';
	let week_days = 7;

	for (let i = 0; i < weekDays.length; i++) {
		const week_element = document.createElement('div');
		week_element.classList.add('weeks');
		week_element.textContent = weekDays[i];

		weeks_element.appendChild(week_element);
	}
}

function populateDates (e) {
	days_element.innerHTML = '';
	var d= new Date(year, month+1, 0).getDate();

	for(let j = 0; j<day_of_the_week; j++){
		const empty_element = document.createElement('div');
		empty_element.classList.add('day')
		days_element.appendChild(empty_element)
	}

	for (let i = 0; i < d; i++) {
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
			day_element.classList.add('selected');
		}

		day_element.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

			selected_date_element.textContent = formatDate(selectedDate);
			selected_date_element.dataset.value = selectedDate;
			populateDates();
		});

		days_element.appendChild(day_element);
	}
}

function populateYears () {
    years_element.innerHTML = '';


	for (let i = 0; i < years.length; i++) {
		const year_element = document.createElement('div');
		year_element.classList.add('years');
		year_element.textContent = years[i];

		years_element.appendChild(year_element);

		if (year_element.textContent == year ) {
			year_element.classList.add('selected');
		}

        year_element.addEventListener('click', function () {
			
            
			year=year_element.textContent;

            mth_year.textContent =  year;

			$('.pick-months').removeClass('active');
			$('.day-selection').addClass('active');
            $('.pick-years').removeClass('active');
		});
	}
}

function populateMonths () {
    months_element.innerHTML = '';


	for (let i = 0; i < months.length; i++) {
		const month_element = document.createElement('div');
		month_element.classList.add('months');
		month_element.textContent = months[i];

		months_element.appendChild(month_element);

		if (month_element.textContent == month ) {
			month_element.classList.add('selected');
		}

        month_element.addEventListener('click', function () {
			month=month_element.textContent;
            mth_date.textContent =  month;
					
            $('.pick-months').removeClass('active');
			$('.day-selection').addClass('active');
			
		});
	}
}

function checkEventPathForClass (path, selector) {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	
	return false;
}
function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let month = d.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = d.getFullYear();

	return day + ' / ' + month + ' / ' + year;
}


mth_year.addEventListener('click', event => {
	document.querySelector('.day-selection').classList.remove("active");
	months_element.classList.remove("active");
    populateYears ();
	years_element.classList.add("active");
})

mth_date.addEventListener('click', event => {
	document.querySelector('.day-selection').classList.remove("active");
	years_element.classList.remove("active");	
    populateMonths ();
	months_element.classList.add("active");	
})

$(document).on('click','.day', function(){
	$('.dates').removeClass('active')
})