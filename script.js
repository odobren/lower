const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const loader = document.getElementById('loader');
const resultMessage = document.getElementById('resultMessage');
const viewResultButton = document.getElementById('viewResultButton');

const googleSheetId = '132llDQJRFBF2dtuX16mF5t4p3v-Z6zgmL36uYh2H1wU';
const googleDriveFolderId = '1rVx0u2giWedD--e7slojv2617r8umpbO';

uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    loader.style.display = 'block';

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            loader.style.display = 'none';

            if (data.startsWith('Error:')) {
                resultMessage.textContent = data;
                viewResultButton.style.display = 'none';
            } else {
                resultMessage.textContent = 'File uploaded successfully!';
                viewResultButton.style.display = 'block';

                // Copy file link to Google Sheets
                const fileLink = data;
                const sheetUrl = `https://docs.google.com/spreadsheets/d/${googleSheetId}/edit#gid=0&range=A1`;

                fetch(sheetUrl, {
                    method: 'PUT',
                    body: JSON.stringify([{ values: [fileLink] }]),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('File link copied to Google Sheets:', data);
                    })
                    .catch(error => {
                        console.error('Error copying file link to Google Sheets:', error);
                    });
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Error uploading file:', error);
        });
});

function openResultSheet() {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${googleSheetId}/edit#gid=0&range=A1`;
    window.open(sheetUrl);
}
