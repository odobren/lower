function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const loader = document.getElementById('loader');
  loader.style.display = 'block'; // Показываем анимированную загрузку

  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById('resultMessage').textContent = data;
      document.getElementById('viewResultButton').style.display = 'block'; // Показываем кнопку "Посмотреть результат"
      loader.style.display = 'none'; // Скрываем анимированную загрузку после завершения
    })
    .catch(error => {
      console.error('Error:', error);
      loader.style.display = 'none'; // Скрываем анимированную загрузку в случае ошибки
    });
}
