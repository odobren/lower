document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById('uploadButton').setAttribute('disabled', 'true');
  document.getElementById('loading').classList.add('active');
  
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append('file', file);
  
  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      alert('File uploaded successfully!');
      document.getElementById('uploadButton').removeAttribute('disabled');
      document.getElementById('loading').classList.remove('active');
      fileInput.value = ''; // Clear the file input
    } else {
      alert('Failed to upload file.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
});
