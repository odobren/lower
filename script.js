function uploadFiles() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i]);
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Files uploaded successfully.');
    } else {
      console.error('Failed to upload files.');
    }
    hideLoader();
  };
  xhr.onerror = function() {
    console.error('Error occurred while uploading files.');
    hideLoader();
  };

  showLoader();
  xhr.send(formData);
}

function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}
