import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
refs.startBtn.disabled = true;

flatpickr(refs.timePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate - Date.now() <= 0) {
      iziToast.error({
        title: 'Incorrect data',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      refs.startBtn.disabled = true;
      return;
    }

    userSelectedDate = selectedDate;
    refs.startBtn.disabled = false;
  },
});

refs.startBtn.addEventListener('click', element => {
  refs.timePicker.disabled = true;
  element.target.disabled = true;

  const timerId = setInterval(() => {
    const ms = userSelectedDate - Date.now();

    if (ms <= 0) {
      clearInterval(timerId);
      refs.timePicker.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
