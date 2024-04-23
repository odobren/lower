function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const loader = document.getElementById('loader');
  const status = document.getElementById('status');

  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  loader.style.display = 'block';

  const formData = new FormData();
  formData.append('file', file);

  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loader.style.display = 'none';
    status.textContent = 'File uploaded successfully!';
    const fileUrl = data.fileUrl;
    addToGoogleSheets(fileUrl);
  })
  .catch(error => {
    loader.style.display = 'none';
    status.textContent = 'Error uploading file: ' + error.message;
  });
}

function addToGoogleSheets(fileUrl) {
  const spreadsheetId = '132llDQJRFBF2dtuX16mF5t4p3v-Z6zgmL36uYh2H1wU';
  const folderId = '1rVx0u2giWedD--e7slojv2617r8umpbO';
  // You need to implement the code to add the file URL to Google Sheets using Apps Script
}
