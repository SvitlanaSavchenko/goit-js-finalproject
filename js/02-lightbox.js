import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Отримання посилання на елемент ul.gallery
const galleryList = document.querySelector(".gallery");

// Рендер розмітки галереї
function createMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
          </a>
        </li>
      `
    )
    .join("");
}

// Вставка створеної розмітки в елемент ul.gallery
galleryList.innerHTML = createMarkup(galleryItems);

// Підключення скрипту і стилів бібліотеки SimpleLightbox (CDN)
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt", // Використовувати атрибут 'alt' як підпис
  captionDelay: 250, // Затримка перед показом підпису
});

// Рендер галереї при завантаженні сторінки
window.addEventListener("load", () => {
  createMarkup(galleryItems);
});
