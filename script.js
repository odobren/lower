document.getElementById('uploadBtn').addEventListener('click', async function() {
  const files = document.getElementById('fileInput').files;
  if (files.length === 0) {
    alert('Please select at least one file to upload.');
    return;
  }

  // Show loader animation
  document.getElementById('loader').style.display = 'block';

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i]);
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const data = await response.json();
      alert('Files uploaded successfully. Google Sheets URL: ' + data.sheetUrl);
    } else {
      throw new Error('Failed to upload files.');
    }
  } catch (error) {
    alert('Error uploading files: ' + error.message);
  } finally {
    // Hide loader animation
    document.getElementById('loader').style.display = 'none';
  }
});
