const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const loadingIcon = document.getElementById('loadingIcon');

async function uploadFile() {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    showLoading();
    const response = await fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      const result = await response.text();
      alert(result);
    } else {
      alert('Failed to upload file.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  } finally {
    hideLoading();
  }
}

function showLoading() {
  form.style.display = 'none';
  loadingIcon.style.display = 'block';
}

function hideLoading() {
  form.style.display = 'block';
  loadingIcon.style.display = 'none';
}
