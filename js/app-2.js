const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];



const galleryList = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalCurrantImg = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('button[data-action="close-lightbox"]');
let currentLenght = 1;
// console.log(modalEl);


// Обьявляем максимальную длину существующего массива
const maxlenght = galleryItems.length;
console.log(maxlenght)

// 1. Обьявляем текущий индекс, который будет равен нулю. 
let currentIndex = 0;

const markup = createGalleryMarkup(galleryItems);

galleryList.insertAdjacentHTML('afterbegin', markup);

function createGalleryMarkup(galleryItems) {



  return galleryItems.map(({ preview, original, description }, index) => {
    return `
     <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-num="${index}"
      alt="${description}"
    />
  </a>
</li>
      `;
  }).join('');

}

galleryList.addEventListener('click', onClickOnImgGallery);


function onClickOnImgGallery(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {

    return;

  } else {
    modalEl.classList.add('is-open');
    modalCurrantImg.src = evt.target.dataset.source;
    modalCurrantImg.alt = evt.target.alt;

    // 2. При клике на картинку мы присваиваем currentIndex значение текущего элемента, который можно посмотреть если раскомитить соnsole.log()
    currentIndex = evt.target.dataset.num;
    console.log('Присвоили СurrentIndex значение индекса картинки, на которую кликнули', currentIndex);


    window.addEventListener('keydown', onPressToKey);
    window.addEventListener('click', onClickClosedBtn);

  }
  console.log(evt.target.dataset.source);
  console.log(modalCurrantImg);


}


function onClickClosedBtn(evt) {
  if (evt.target.tagName !== 'IMG') {
    modalEl.classList.remove('is-open');
    modalCurrantImg.src = '';
    modalCurrantImg.alt = '';
    // console.log(modalCurrantImg);

    // console.log(modalCurrantImg);
    // console.log(modalEl);

  }
}

 // функция содержит весь доступный арсенал кнопок, при которых происходит действие

function onPressToKey(evt) {
  
  // 3. Для нажатия клавиши влево, мы ставим условие - если значение кнопки совпадает, то исполняем содержимое
  if (evt.code === 'ArrowLeft') {
    // 3-1. Проверяем видит ли текущий индекс с помощью console.log(). Для посмотреть - раскомитить
    // console.log(currentIndex);
     3-2. Ставим условие, что если от нашего текущего индекса отнять один и это будет меньше нуля, значит мы автоматически закрываем модальное окно
    if (currentIndex - 1  < 0) {
      modalEl.classList.remove('is-open');
    modalCurrantImg.src = '';
      modalCurrantImg.alt = '';

      // 3 - 2. п.1.Обязательно ставим в конце ретурн, для прекращения исполнения функции.
      // Иначе после автоматического закрытия модалки функция попробует исполнить условие ниже и выдаст ошибку.Для проверки - закомментровать ретурн
      return;
    }
    // 3 - 2. В случае, если наш текущий индекс имеет значение больше 0, тогда от индекса отнимается один и в модальное окно записывается новая картинка,
    // соответствующая текущему индексу. Что важно, большую картинку мы берем с главного массива обьектаов, где хранятся наши картинки - galleryItems
    currentIndex -= 1;
    modalCurrantImg.src = galleryItems[currentIndex].original;


    // 4. Для нажатия клавиши вправо, мы ставим условие - если значение кнопки совпадает, то исполняем содержимое
  } else if (evt.code === 'ArrowRight') {
    console.log(currentIndex);

    // 4 - 1. Ставим условие, что если наш текущий индекс позволяет добавить один и это будет больше galleryItem.length минус 1(минусуем один, потому что index в массиве 
    //   ведет счет от 0, а length показывает общее число обьектов и счет ведет от 1  до последнего числа), значит мы автоматически закрываем модальное окно
    if (Number(currentIndex) + 1 > maxlenght - 1) {
      modalEl.classList.remove('is-open');
    modalCurrantImg.src = '';
      modalCurrantImg.alt = '';
      // 4-2. Не забываем про ретурн
      return;
    }
    currentIndex ++;
    modalCurrantImg.src = galleryItems[currentIndex].original;
    

    // 5. Для нажатия клавиши Esc, мы ставим условие - если значение кнопки совпадает, то исполняем содержимое
  }  if (evt.code === 'Escape') {
    modalEl.classList.remove('is-open');
    modalCurrantImg.src = '';
    modalCurrantImg.alt = '';
    console.log(modalCurrantImg);
  }

}