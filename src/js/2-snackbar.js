import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const state = event.target.state.value;
  const delay = event.target.delay.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      }

      reject(delay);
    }, delay);
  })
    .then(message =>
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(message =>
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );
});
