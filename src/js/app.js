const timeline = document.getElementById('timeline');

// Функция для добавления текстовой записи в ленту
function addPost(text, coordinates) {
    const post = document.createElement('li');
    post.classList.add('post');
    post.innerHTML = `
        <p>${text}</p>
        <p>Координаты: ${coordinates.lat}, ${coordinates.long}</p>
    `;
    timeline.prepend(post);
}

// Функция для добавления аудио записи
function addAudioPost(file, coordinates) {
    const post = document.createElement('li');
    post.classList.add('post');
    const url = URL.createObjectURL(file);
    post.innerHTML = `
        <audio controls>
            <source src="${url}" type="${file.type}">
            Ваш браузер не поддерживает аудио.
        </audio>
        <p>Координаты: ${coordinates.lat}, ${coordinates.long}</p>
    `;
    timeline.prepend(post);
}

// Функция для добавления видео записи
function addVideoPost(file, coordinates) {
    const post = document.createElement('li');
    post.classList.add('post');
    const url = URL.createObjectURL(file);
    post.innerHTML = `
        <video controls width="300">
            <source src="${url}" type="${file.type}">
            Ваш браузер не поддерживает видео.
        </video>
        <p>Координаты: ${coordinates.lat}, ${coordinates.long}</p>
    `;
    timeline.prepend(post);
}

// Обработчик текстового ввода
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('postInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const text = event.target.value;
        if (text.trim() === '') return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coordinates = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                };
                addPost(text, coordinates);
                event.target.value = '';
            }, () => {
                alert('Не удалось получить координаты. Пожалуйста, введите их вручную в формате: широта,долгота');
            });
        } else {
            alert('Геолокация не поддерживается вашим браузером.');
        }
    }
}); 


  // Обработчик аудио загрузки
  document.getElementById('audioInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coordinates = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                };
                addAudioPost(file, coordinates);
            }, () => {
                alert('Не удалось получить координаты. Пожалуйста, введите их вручную в формате: широта,долгота');
            });
        } else {
            alert('Геолокация не поддерживается вашим браузером.');
        }
    }
});

// Обработчик видео загрузки
document.getElementById('videoInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coordinates = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                };
                addVideoPost(file, coordinates);
            }, () => {
                alert('Не удалось получить координаты. Пожалуйста, введите их вручную в формате: широта,долгота');
            });
        } else {
            alert('Геолокация не поддерживается вашим браузером.');
        }
    }
});
});

module.exports = { addPost, addAudioPost, addVideoPost};