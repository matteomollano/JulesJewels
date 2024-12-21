function toggleFavorite(songName, artist, songLink) {
  const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};
  if (!favoriteSongs [songName]) {
      favoriteSongs[songName] = {
          artist:artist,
          songName:songName,
          songLink:songLink,
      favorited: true,
    };
  } else {
    favoriteSongs[songName].favorited = !favoriteSongs[songName].favorited;
  }
  localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
}

function applyFavorites() {
  const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};
  const heartButtons = document.querySelectorAll('.favorites-button');
  for (let button of heartButtons) {
      // use the item name as the item's id
      const songName = button.closest('tr').querySelector('.song-name').textContent.trim();

      if (favoriteSongs[songName]) {
          if (favoriteSongs[songName].favorited) {
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
        const songName = button.closest('tr').querySelector('.song-name').textContent.trim();
        const artist = button.closest('tr').querySelector('.artist').textContent.trim();
        const songLink = button.closest('tr').querySelector('.song-link').querySelector('.website-button').getAttribute('href');
          toggleFavorite(songName, artist, songLink);
          applyFavorites(); // Update favorites on click
      }
  }

  // Apply favorites on initial page load
  applyFavorites();
});
 
