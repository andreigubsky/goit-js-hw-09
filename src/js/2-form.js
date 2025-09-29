// 1. Оголоси поза будь-якими функціями об’єкт formData з полями email та message,
// які спочатку мають порожні рядки як значення: { email: "", message: "" }.
let formData = {
  email: '',
  message: '',
};

// 2. Використовуй метод делегування для відстеження змін
// у формі через подію input. Зберігай актуальні дані
// з полів email та message у formData та записуй цей об’єкт у локальне сховище.
// Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

// 3. При завантаженні сторінки перевір, чи є дані у локальному сховищі.
// Якщо так, використовуй їх для заповнення форми та об'єкта formData.
// Якщо ні, залиш поля форми порожніми.
const emailLocal = document.querySelector('.feedback-form input[type="email"]');
const messageLocal = document.querySelector('.feedback-form [name="message"]');

window.addEventListener('load', () => {
  const savedItem = localStorage.getItem(localStorageKey);
  if (savedItem) {
    const parsedItem = JSON.parse(savedItem);
    console.log(parsedItem);
    emailLocal.value = parsedItem.email;
    messageLocal.textContent = parsedItem.message;
  }
});

form.addEventListener('input', event => {
  if (event.target.name === 'email') {
    formData.email = event.target.value;
  } else {
    formData.message = event.target.value;
  }
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

//4.1 Перед відправленням форми переконайся,
// що обидва поля форми заповнені.
// Якщо будь-яке з полів (властивостей об’єкта
// formData) порожнє, показуй сповіщення
// з текстом «Fill please all fields».

form.addEventListener('submit', event => {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    // 4.2 Якщо всі поля заповнені, виведи у консоль об’єкт formData
    // з актуальними значеннями, очисти локальне сховище,
    // об’єкт formData і поля форми.
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    formData = {
      email: '',
      message: '',
    };
    form.reset();
    messageLocal.textContent = '';
  }
});
