function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loader.style.display = 'none';
    console.log('File uploaded successfully. Link:', data.link);
    // You can do something with the link here, like display it to the user
  })
  .catch(error => {
    loader.style.display = 'none';
    console.error('Error uploading file:', error);
  });
}
