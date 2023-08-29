import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  searchButton: document.querySelector('#submit'),
  searchBox: document.querySelector('.search-box'),
  gallery: document.querySelector('.gallery'),
};

const perPage = 40;
let currentPage = 1;
let query = '';

refs.form.addEventListener('submit', searchImages);

async function searchImages(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  currentPage = 1;
  query = refs.searchBox.value.trim();

  try {
    const getData = await getImages(query);
    const { hits, totalHits } = getData;

    if (!hits) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

    refs.gallery.insertAdjacentHTML('beforeend', createGallery(hits));

    new SimpleLightbox('.link-lightbox', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Error fetching images');
  }
}

function createGallery(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}" class="link-lightbox">
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div> 
      </div>
      </a>`;
      }
    )
    .join(' ');
}

// Поле match: Ви використовуєте деструктуризацію для отримання поля match з getData, але ви не показали структуру getData. Зрозуміло, що там має бути поле match, але його наявність та структура не є зрозумілою.

// Відсутність параметру page при виклику getImages: Якщо ви плануєте підтримувати пагінацію, вам потрібно буде передати currentPage як другий аргумент функції getImages.
// HTML Injection: При створенні галереї ви вставляєте дані без екранування, що може призвести до атак на безпеку (наприклад, XSS-атаки).
// Відсутність декларацій типів: Хоча JavaScript не вимагає декларації типів, ви можете покращити читабельність і надійність коду, використовуючи JSDoc або TypeScript.
// Створення Lightbox: Метод createLightbox() краще викликати після успішної вставки HTML для гарантії, що всі елементи наявні в DOM.
// Орфографія та кодування: У вас є невелика неузгодженість в назвах класів і ідентифікаторів. Зазвичай краще дотримуватися одного стилю.
// Зробіть виправлення, і ваш код буде набагато надійнішим та безпечнішим.

// function createLightbox() {
//   const lightbox = new SimpleLightbox('.gallery a', {
//     captions: true,
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
//   lightbox.refresh();
// }
