document.getElementById('uploadBtn').addEventListener('click', uploadFile);

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  // Display loader animation
  document.getElementById('loader').style.display = 'block';

  const formData = new FormData();
  formData.append('file', file);

  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('loader').style.display = 'none'; // Hide loader after upload
    alert('File uploaded successfully!\nGoogle Sheets link: ' + data.link);
  })
  .catch(error => {
    console.error('Error uploading file:', error);
    alert('Error uploading file. Please try again.');
    document.getElementById('loader').style.display = 'none'; // Hide loader on error
  });
}
