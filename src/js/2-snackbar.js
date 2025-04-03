import iziToast from 'izitoast';

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const state = event.target.state.value;
  const delay = event.target.delay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      }

      reject(delay);
    }, delay);
  });

  promise
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
