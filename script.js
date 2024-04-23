function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const loadingAnimation = document.getElementById('loadingAnimation');

  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  loadingAnimation.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loadingAnimation.style.display = 'none';
    alert('File uploaded successfully!');
    console.log('File uploaded:', data);
  })
  .catch(error => {
    loadingAnimation.style.display = 'none';
    console.error('Error uploading file:', error);
    alert('An error occurred while uploading the file. Please try again.');
  });
}
