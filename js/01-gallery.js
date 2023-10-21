import { galleryItems } from "./gallery-items.js";

// Отримання посилання на елемент ul.gallery
const galleryList = document.querySelector(".gallery");

// Рендер розмітки галереї
function renderGalleryItems(items) {
  const galleryMarkup = items
    .map(
      (item, index) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            data-index="${index}"
            alt="${item.description}"
          />
        </a>
      </li>
    `
    )
    .join("");

  galleryList.innerHTML = galleryMarkup;
}

// Обробник кліку на галереї
function onGalleryItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  // Отримання URL великого зображення
  const largeImageURL = basicLightbox.create(
    `<img class="gallery__image-big" src="${event.target.dataset.source}">`,
    // Відкриття модального вікна
    {
      onShow: () => window.addEventListener("keydown", onKeydownEsc),
      onClose: () => window.removeEventListener("keydown", onKeydownEsc),
    }
  );

  const onKeydownEsc = (event) => {
    if (event.code === "Escape") largeImageURL.close();
  };

  largeImageURL.show();
}

// Додавання обробника кліку для галереї
galleryList.addEventListener("click", onGalleryItemClick);

// Рендер галереї при завантаженні сторінки
window.addEventListener("load", () => {
  renderGalleryItems(galleryItems);
});
