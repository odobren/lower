document.addEventListener('DOMContentLoaded', function() {
    const addFileBtn = document.getElementById('addFileBtn');
    const fileList = document.getElementById('fileList');
    const fileBtn = document.getElementById('fileBtn');
    const form = document.getElementById('myForm');
    let filesArray = []; // массив для хранения выбранных файлов

    addFileBtn.addEventListener('click', function() {
        fileBtn.click();
    });

    fileBtn.addEventListener('change', function() {
        const files = Array.from(fileBtn.files);
        files.forEach(file => {
            filesArray.push(file); // добавляем файл в массив
            const listItem = document.createElement('div');
            const fileName = document.createElement('span');
            fileName.textContent = file.name;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = ''; // Используем символ "✖️" вместо "×"
            // Устанавливаем размер кнопки равным размеру символа "✖️"
            removeBtn.style.width = '1em';
            removeBtn.style.height = '1em';
            // Удаляем фон у кнопки removeBtn
            removeBtn.style.backgroundColor = 'transparent';
            removeBtn.style.border = 'none';
            removeBtn.addEventListener('click', function() {
                listItem.remove();
                filesArray = filesArray.filter(item => item !== file); // удаляем файл из массива
            });
            listItem.appendChild(fileName);
            listItem.appendChild(removeBtn);
            fileList.appendChild(listItem);
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        document.getElementById('loader').style.display = 'block';
        const emailInput = document.getElementById('email').value;
        const dateInput = document.getElementById('date').value;

        // Используем Promise.all для отправки всех файлов одновременно
        Promise.all(filesArray.map(file => {
            const fr = new FileReader();
            fr.readAsArrayBuffer(file);
            return new Promise((resolve, reject) => {
                fr.onload = function(f) {
                    const url = "https://script.google.com/macros/s/AKfycby_nWolfRgCK08OSMKYDre2QjFgEwb6lP4TpII3vkFrpfGerqVEehf-3civmmB_-807/exec";
                    const qs = new URLSearchParams({
                        filename: file.name,
                        mimeType: file.type,
                        name: document.getElementById('name').value,
                        phone: document.getElementById('phone').value,
                        email: emailInput,
                        date: dateInput
                    });
                    fetch(`${url}?${qs}`, {
                        method: "POST",
                        body: JSON.stringify([...new Int8Array(f.target.result)]),
                    })
                    .then((res) => res.json())
                    .then(resolve)
                    .catch(reject);
                };
            });
        }))
        .then((responses) => {
    document.getElementById('loader').style.display = 'none';
    checkAllFilesUploaded(); // Вызов функции после успешной загрузки
})


        .catch(console.error);
    });
});
