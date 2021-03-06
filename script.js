var state = 'page1';

// Selecting page elements
var page1El = document.querySelector('#page1');
var page2El = document.querySelector('#page2');
var page3El = document.querySelector('#page3');
var page4El = document.querySelector('#page4');

// Selecting container divs for our buttons
var homeBtn1 = document.querySelector('#home1');
var homeBtn2 = document.querySelector('#home2');
var homeBtn3 = document.querySelector('#home3');
var button3 = document.querySelector('#btn3');
var button2 = document.querySelector('#btn2');
var button1 = document.querySelector('#btn1');
var song3to2 = document.querySelector('#threeToTwo');
var song3to1 = document.querySelector('#threeToOne');
var song2to1 = document.querySelector('#twoToOne');
var song2to3 = document.querySelector('#twoToThree');
var song1to2 = document.querySelector('#oneToTwo');
var song1to3 = document.querySelector('#oneToThree');

// Date, moment and last update
var dateEl = document.querySelector('#date');
var today = moment().format("dddd, MMMM Do, YYYY");
var updateEl = document.querySelector('#update');

// First artist group
var artistName1El = document.querySelector("#artistName1");
var album1El = document.querySelector('#album1');
var artistStart1El = document.querySelector("#artistStart1");
var artistGenre1El = document.querySelector("#artistGenre1");
var artistBio1El = document.querySelector("#bio1");

// Second artist group
var artistName2El = document.querySelector("#artistName2");
var album2El = document.querySelector('#album2');
var artistStart2El = document.querySelector("#artistStart2");
var artistGenre2El = document.querySelector("#artistGenre2");
var artistBio2El = document.querySelector("#bio2");

// Third artist group
var artistName3El = document.querySelector("#artistName3");
var album3El = document.querySelector('#album3');
var artistStart3El = document.querySelector("#artistStart3");
var artistGenre3El = document.querySelector("#artistGenre3");
var artistBio3El = document.querySelector("#bio3");

// Selecting gifs and album cover div
var gif1El = document.querySelector("#gif1");
var gif2El = document.querySelector("#gif2");
var gif3El = document.querySelector("#gif3");
var cover3El = document.querySelector('#cover3');
var cover2El = document.querySelector('#cover2');
var cover1El = document.querySelector('#cover1');


// Sets up what state will be shown on each page 
function displayPages() {
    if (state === 'page1') {
        page1El.style.display = 'block';
        page2El.style.display = 'none';
        page3El.style.display = 'none';
        page4El.style.display = 'none';
    }

    if (state === 'page2') {
        page1El.style.display = 'none';
        page2El.style.display = 'block';
        page3El.style.display = 'none';
        page4El.style.display = 'none';
    }

    if (state === 'page3') {
        page1El.style.display = 'none';
        page2El.style.display = 'none';
        page3El.style.display = 'block';
        page4El.style.display = 'none';
    }

    if (state === 'page4') {
        page1El.style.display = 'none';
        page2El.style.display = 'none';
        page3El.style.display = 'none';
        page4El.style.display = 'block';
    }
}

// Using the audio db API we bring in the top 3 album names and the artists and save them as variables
function getAlbum() {
    fetch('https://theaudiodb.com/api/v1/json/523532/trending.php?country=us&type=itunes&format=albums')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cover3 = data.trending[3].strAlbumThumb;
            var artist3 = data.trending[3].strArtist;
            var album3 = data.trending[3].strAlbum;
            var cover2 = data.trending[4].strAlbumThumb;
            var artist2 = data.trending[4].strArtist;
            var album2 = data.trending[4].strAlbum;
            var lastUpdate = data.trending[5].dateAdded;
            var cover1 = data.trending[5].strAlbumThumb;
            var artist1 = data.trending[5].strArtist;
            var album1 = data.trending[5].strAlbum;

            updateEl.append(lastUpdate);
            artistName1El.append("By:  " + artist3);
            artistName2El.append("By:  " + artist2);
            artistName3El.append("By:  " + artist1);
            album1El.append("Album:  " + album3);
            album2El.append("Album:  " + album2);
            album3El.append("Album:  " + album1);

            // Creating img tag and dynamically adding the image of the album cover
            var img3 = document.createElement("img");
            img3.setAttribute("src", cover3);
            img3.style.height = "300px";
            img3.style.width = "300px";
            img3.style.borderStyle = "solid";

            var img2 = document.createElement("img");
            img2.setAttribute("src", cover2);
            img2.style.height = "300px";
            img2.style.width = "300px";
            img2.style.borderStyle = "solid";

            var img1 = document.createElement("img");
            img1.setAttribute("src", cover1);
            img1.style.height = "300px";
            img1.style.width = "300px";
            img1.style.borderStyle = "solid";
            cover1El.append(img1);
            cover2El.append(img2);
            cover3El.append(img3);

            callGif(artist3, 2);
            callGif(artist2, 3);
            callGif(artist1, 4);

            getArtist(artist3, 2);
            getArtist(artist2, 3);
            getArtist(artist1, 4);
        });
}

// Using the giphy API we bring in a gif with the search query of the name of the artist in the top 3
function callGif(nameEl, pageNumber) {
    fetch('https://api.giphy.com/v1/gifs/search?api_key=ZCIh2UkoAMZsDdlMKYVbI8ksUZ3kYD1z&q=' + nameEl + '&limit=25&offset=0&rating=g&lang=en')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var embedId = data.data[0].id
            var gif = document.createElement('img');
            gif.setAttribute("src", "https://media3.giphy.com/media/" + embedId + "/giphy.gif?cid=bec880e0eoieekw325f2kfkvfsgumqn6rdhddg9pituv5w7v&rid=giphy.gif&ct=g");

            switch (pageNumber) {
                case 2:
                    gif1El.append(gif);
                    break;
                case 3:
                    gif2El.append(gif);
                    break;
                case 4:
                    gif3El.append(gif);
                    break;
                default:
            }
            gif.style.border = "2px solid black";
        })
}

// Using the audio db API we take in the artist name again from the top 3 but this time return
// info on the artist, biography, start date and genre
function getArtist(nameEl, pageNumber) {
    fetch('https://theaudiodb.com/api/v1/json/2/search.php?s=' + nameEl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var artistBio = data.artists[0].strBiographyEN;
            var artistStart = data.artists[0].intFormedYear;
            var artistGenre = data.artists[0].strGenre;

            switch (pageNumber) {
                case 2:
                    artistStart1El.append("Started in:  " + artistStart);
                    artistGenre1El.append("Genre:  " + artistGenre);
                    artistBio1El.append(artistBio);
                    break;
                case 3:
                    artistStart2El.append("Started in:  " + artistStart);
                    artistGenre2El.append("Genre:  " + artistGenre);
                    artistBio2El.append(artistBio);
                    break;
                case 4:
                    artistStart3El.append("Started in:  " + artistStart);
                    artistGenre3El.append("Genre:  " + artistGenre);
                    artistBio3El.append(artistBio);
                    break;
                default:

            }

        })
}

// All the event listeners we use to toggle between pages

homeBtn1.addEventListener("click", function () {
    state = 'page1';
    displayPages();
    getArtist(nameEl);
    callGif(nameEl);
});

homeBtn2.addEventListener("click", function () {
    state = 'page1';
    displayPages();
    getArtist(nameEl);
    callGif(nameEl);
});

homeBtn3.addEventListener("click", function () {
    state = 'page1';
    displayPages();
    getArtist(nameEl);
    callGif(nameEl);
});

button3.addEventListener("click", function () {
    state = 'page2';
    displayPages();
});

button2.addEventListener("click", function () {
    state = 'page3';
    displayPages();
});

button1.addEventListener("click", function () {
    state = 'page4';
    displayPages();
});

song1to2.addEventListener("click", function () {
    state = 'page3';
    displayPages();
});

song1to3.addEventListener("click", function () {
    state = 'page2';
    displayPages();
});

song2to1.addEventListener("click", function () {
    state = 'page4';
    displayPages();
});

song2to3.addEventListener("click", function () {
    state = 'page2';
    displayPages();
});

song3to1.addEventListener("click", function () {
    state = 'page4';
    displayPages();
});

song3to2.addEventListener("click", function () {
    state = 'page3';
    displayPages();
});

// Initializer function
function init() {
    dateEl.append("Today's Date: " + today);
    displayPages();
    getAlbum();
}

init();