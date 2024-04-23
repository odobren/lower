function uploadFile() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append('file', file);

  var data = {
    // Дополнительные данные, которые вы хотите отправить
    // Например: имя пользователя, дата, и т.д.
    // Замените на нужные вам данные
    username: "John Doe",
    date: new Date().toLocaleDateString()
  };

  formData.append('data', JSON.stringify(data));

  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log('File uploaded successfully');
      // Дополнительные действия после успешной загрузки
    } else {
      console.error('Error uploading file');
    }
  })
  .catch(error => {
    console.error('Error uploading file:', error);
  });
}
