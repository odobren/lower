function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert('Файл успешно загружен в Google Sheets.');
      } else {
        alert('Произошла ошибка при загрузке файла.');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при загрузке файла.');
    });
  } else {
    alert('Выберите файл для загрузки.');
  }
}
