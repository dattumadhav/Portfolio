// sign in progress

document.addEventListener('DOMContentLoaded', function() {
    const signInButton = document.getElementById('signInButton');
    const profileButton = document.getElementById('profileButton');
  
    //  to check if the user is signed in
    function checkSignInStatus() {
        return localStorage.getItem('isSignedIn') === 'true';
    }
  
    //  to update button visibility based on sign-in status
    function updateButtonVisibility() {
        if (checkSignInStatus()) {
            signInButton.classList.add('hidden');
            profileButton.classList.remove('hidden');
        } else {
            signInButton.classList.remove('hidden');
            profileButton.classList.add('hidden');
        }
    }
    updateButtonVisibility();
    // localStorage.removeItem('isSignedIn')
  });
  
  // sidebar
  function toggleSidebar() {
    var sidebar = document.getElementById("profile-sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
  }

//   genres

document.addEventListener('DOMContentLoaded', function() {
    const genres = [
        'Art', 'Biography', 'Business', 'Children', 'Comics', 
        'Computers', 'Cooking', 'Education', 'Fiction', 'Health', 
        'History', 'Horror', 'Music', 'Mystery', 'Poetry', 
        'Psychology', 'Romance', 'Science', 'Self-Help', 'Sports', 
        'Travel'
    ];
    const genreList = document.getElementById('genre-list');
    const bookList = document.getElementById('book-list');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const apiKey = ''; // Add your Google Books API key here
    const maxResults = 40;
    const totalBooks = 150;

    // Populate genre list
    genres.forEach(genre => {
        const li = document.createElement('li');
        li.textContent = genre;
        li.addEventListener('click', () => fetchBooksByGenre(genre));
        genreList.appendChild(li);
    });

    // Fetch books by genre
    async function fetchBooksByGenre(genre) {
        bookList.innerHTML = '';
        let books = [];
        for (let startIndex = 0; startIndex < totalBooks; startIndex += maxResults) {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=newest&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`);
            const data = await response.json();
            if (data.items) {
                books = books.concat(data.items);
            }
        }
        displayBooks(books.slice(0, totalBooks));
    }

    // Display books
    function displayBooks(books) {
        bookList.innerHTML = '';
        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <a href="display.html?bookId=${book.id}">
                    <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195'}" alt="${book.volumeInfo.title}">
                </a>
                <h3>${book.volumeInfo.title}</h3>
            `;
            bookList.appendChild(bookItem);
        });
    }

    // Search books
    searchButton.addEventListener('click', async () => {
        const query = searchBar.value;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=${maxResults}&key=${apiKey}`);
        const data = await response.json();
        displayBooks(data.items);
    });

    // Fetch all books on initial load
    fetchBooksByGenre('Fiction');
});