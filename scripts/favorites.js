// favorites.js

// Add a favorited shop item to the favorites-grid
function addFavoritedItem(productName, productImgName, productImgId, websiteLink, websiteName) {

    const favoritesGrid = document.querySelector('.favorites-grid');

    // Create the website-link (shop item) div
    const div = document.createElement("div");
    div.setAttribute('class', 'website-link');
    div.innerHTML = `
        <div>
            <p class="product-name">${productName}</p>
        </div>
        <div>
            <img class="product-image" id="${productImgId}" src="${productImgName}">
        </div>
        <div>
            <a class="website-button" target="_blank" href="${websiteLink}">${websiteName}</a>
            <button class="favorites-button">
                <img class="clear-heart" src="images/heart-color-red.png">
            </button>
        </div>
    `;

    // Add the new div to the favorites-grid
    favoritesGrid.appendChild(div);
}
function addFavoritedSong(songName, artist, songLink) {
    const musicTable = document.querySelector('.music-table');
    const tbody = musicTable.querySelector('tbody');

    const newSongRow = document.createElement('tr');

    const heartCell = document.createElement('th');
    const songNameCell = document.createElement('td');
    const artistCell = document.createElement('td');
    const songLinkCell = document.createElement('td');

    heartCell.setAttribute('scope', 'row');
    heartCell.innerHTML = `
    <button class="favorites-button">
        <img class="clear-heart" src="images/heart-color-red.png">
    </button>`;
    songNameCell.textContent = songName;
    artistCell.textContent = artist;
    songLinkCell.innerHTML = `<a class="website-button" target="_blank" href="${songLink}">play</a>`;

    newSongRow.appendChild(heartCell);
    newSongRow.appendChild(songNameCell);    
    newSongRow.appendChild(artistCell);
    newSongRow.appendChild(songLinkCell);
    
    tbody.appendChild(newSongRow);
}

function showContent(selectedOption) {
    const shopItems = document.getElementById('shop-items');
    const songs = document.getElementById('songs');

    if (selectedOption === 'shop-items') {
        shopItems.style.display ='block';
        songs.style.display = 'none';
    } else if (selectedOption === 'songs') {
        shopItems.style.display = 'none';
        songs.style.display = 'block';
    } else if (selectedOption === 'all') {
        shopItems.style.display = 'block';
        songs.style.display = 'block';
    }
}
    
    // Get all favorited shop items from Local Storage and add them to the favorites.html grid
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve existing favorites from local storage or initialize an empty object
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    // if the item is favorited, add it to the favorites-grid
    for (const itemName in favorites) {
        const item = favorites[itemName];
        if (item.favorited) {
            addFavoritedItem(item.productName, item.productImgName, item.productImgId, item.websiteLink, item.websiteName);
        }
    }
});

// Get all favorited songs from Local Storage and add them to the favorites.html grid
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve existing favorites from local storage or initialize an empty object
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};

    // if the item is favorited, add it to the favorites-grid
    for (const songName in favoriteSongs) {
        const song = favoriteSongs[songName];
        if (song.favorited) {
            addFavoritedSong(song.songName, song.artist, song.songLink);
        }
    }   
});