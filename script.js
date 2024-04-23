function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const loader = document.getElementById('loader');

  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  loader.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loader.style.display = 'none';
    alert("File uploaded successfully. Link: " + data.link);
  })
  .catch(error => {
    loader.style.display = 'none';
    alert("An error occurred: " + error.message);
  });
}
