function toggleFavorite(itemName, itemImgSrc, itemImgId, itemWebsiteLink, itemWebsiteName) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  if (!favorites [itemName]) {
      favorites[itemName] = {
       productName: itemName,
       productImgName: itemImgSrc,
       productImgId: itemImgId,
       websiteLink: itemWebsiteLink,
       websiteName: itemWebsiteName,
       favorited: true,
      };
  } else {
    favorites[itemName].favorited = !favorites[itemName].favorited;
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function applyFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const heartButtons = document.querySelectorAll('.favorites-button');
  for (let button of heartButtons) {
      // use the item name as the item's id
      const itemName = button.closest('.website-link').querySelector('.product-name').textContent.trim();

      if (favorites[itemName]) {
          if (favorites[itemName].favorited) {
              // apply the red style
              button.querySelector('.clear-heart').setAttribute('src', "images/heart-color-red.png");
          }
          else {
              // apply the clear style
              button.querySelector('.clear-heart').setAttribute('src', "images/heart-clear.png");
          }
      }
  }
}

  // Attach click event listener to heart buttons
document.addEventListener('DOMContentLoaded', () => {
  const heartButtons = document.querySelectorAll('.favorites-button');

  for (let button of heartButtons) {
      button.onclick = function() {
          const itemName = button.closest('.website-link').querySelector('.product-name').textContent.trim();
          const itemImgSrc = button.closest('.website-link').querySelector('.product-image').getAttribute('src');
          const itemImgId = button.closest('.website-link').querySelector('.product-image').getAttribute('id');
          const itemWebsiteLink = button.closest('.website-link').querySelector('.website-button').getAttribute('href');
          const itemWebsiteName = button.closest('.website-link').querySelector('.website-button').textContent.trim();
          toggleFavorite(itemName, itemImgSrc, itemImgId, itemWebsiteLink, itemWebsiteName);
          applyFavorites(); // Update favorites on click
      }
  }

  // Apply favorites on initial page load
  applyFavorites();
});