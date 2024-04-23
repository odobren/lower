document.getElementById('uploadBtn').addEventListener('click', async function() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const loadingAnimation = document.getElementById('loadingAnimation');
  loadingAnimation.classList.remove('hide');

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
      method: 'POST',
      body: formData
    });
    const responseData = await response.json();
    if (responseData.success) {
      alert('File uploaded successfully. Link: ' + responseData.fileUrl);
    } else {
      alert('Failed to upload file.');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('An error occurred while uploading the file.');
  } finally {
    loadingAnimation.classList.add('hide');
  }
});
