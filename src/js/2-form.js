// Oголошуємо об'єкт formData

let formData = { email: '', message: '' };

// Отримуємо посилання на форму
const form = document.querySelector('.feedback-form');

// Додаємо обробників подій input і submit до форми
form.addEventListener('input', handlerInput);
form.addEventListener('submit', handlerSubmit);

// Викликаємо функцію для заповнення форми при завантаженні сторінки
populateForm();

// Функція для обробки події input
function handlerInput(event) {
  const value = event.target.value.trim();
  const key = event.target.name;
  formData[key] = value;

  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (err) {
    console.error(err);
    return;
  }
}
// Функція, яка перевіріє, чи є дані у локальному сховищі.Якщо є, використовує їх для заповнення форми та об'єкта formData.

function populateForm() {
  try {
    const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (savedData) {
      formData = savedData;
      for (const key in formData) {
        if (formData[key]) {
          form.elements[key].value = formData[key];
        }
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }
}

//Функція для обробки події submit
function handlerSubmit(event) {
  event.preventDefault();

  if (
    !form.elements.email.value.trim() ||
    !form.elements.message.value.trim()
  ) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data submitted:', formData);

  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };
  form.reset();
}
