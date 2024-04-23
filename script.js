document.getElementById('uploadButton').addEventListener('click', function() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  
  if (file) {
    var formData = new FormData();
    formData.append('file', file);
    uploadFile(formData);
  } else {
    alert('Please select a file.');
  }
});

function uploadFile(formData) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec');
  
  xhr.upload.addEventListener('progress', function(event) {
    var percent = (event.loaded / event.total) * 100;
    console.log(percent + '% uploaded');
    // Показываем анимацию загрузки
    document.getElementById('loader').classList.remove('hidden');
  });
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('File uploaded successfully.');
      // Скрываем анимацию загрузки после завершения загрузки
      document.getElementById('loader').classList.add('hidden');
    } else {
      console.error('Error uploading file.');
    }
  };
  
  xhr.send(formData);
}
