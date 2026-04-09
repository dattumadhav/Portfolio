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

//   main content

document.addEventListener("DOMContentLoaded", function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bookId = urlParams.get('bookId');

    if (bookId) {
        fetchBookDetails(bookId);
    }

    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', handleRating);
    });

    document.getElementById('add-to-list').addEventListener('click', addToReadingList);
    document.getElementById('save-rating').addEventListener('click', saveRating);

    const myRatings = JSON.parse(localStorage.getItem('myRatings')) || [];
    const savedRating = myRatings.find(r => r.bookId === bookId)?.rating || 0;
    const ratingDiv = document.getElementById('rating-div');
    ratingDiv.dataset.rating = savedRating;
    ratingDiv.querySelectorAll('.star').forEach(star => {
        if (star.dataset.value <= savedRating) {
            star.classList.remove('empty');
        } else {
            star.classList.add('empty');
        }
    });
});

async function fetchBookDetails(bookId) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const book = await response.json();
        displayBookDetails(book);
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

function stripHtmlTags(str) {
    var doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.body.textContent || "";
}

function displayBookDetails(book) {
    const bookCover = document.getElementById('book-cover');
    const bookTitle = document.getElementById('book-title');
    const bookAuthors = document.getElementById('book-authors');
    const bookPublisher = document.getElementById('book-publisher');
    const bookPublishedDate = document.getElementById('book-published-date');
    const bookCategories = document.getElementById('book-categories');
    const bookAverageRating = document.getElementById('book-average-rating');
    const bookDescription = document.getElementById('book-description');
    const bookPreview=document.getElementById('book-preview');
    const bookLink = document.getElementById('book-link');

    bookCover.src = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/200x300';
    bookTitle.textContent = book.volumeInfo.title;
    bookAuthors.textContent = book.volumeInfo.authors?.join(', ');
    bookPublisher.textContent = `Publisher: ${book.volumeInfo.publisher || 'Unknown'}`;
    bookPublishedDate.textContent = `Published Date: ${book.volumeInfo.publishedDate || 'Unknown'}`;
    bookCategories.textContent = `Categories: ${book.volumeInfo.categories?.join(', ') || 'N/A'}`;
    bookAverageRating.textContent = `Average Rating: ${book.volumeInfo.averageRating || 'N/A'}`;
    bookDescription.textContent = `Description: ${stripHtmlTags(book.volumeInfo.description || 'No description available.')}`;
    bookPreview.href=book.volumeInfo.previewLink;
    bookLink.href = book.volumeInfo.infoLink;

    bookCover.dataset.book = JSON.stringify(book);
}

function handleRating(event) {
    const stars = document.querySelectorAll('.star');
    const rating = event.target.getAttribute('data-value');
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.remove('empty');
        } else {
            star.classList.add('empty');
        }
    });

    document.querySelector('.rating').dataset.rating = rating;
}

function addToReadingList() {
    const bookCover = document.getElementById('book-cover');
    const bookData = bookCover.dataset.book;

    if (bookData) {
        const book = JSON.parse(bookData);

        let myBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
        myBooks.push(book);
        localStorage.setItem('myBooks', JSON.stringify(myBooks));

        alert('Book added to your reading list!');
    } else {
        alert('Error: No book data found.');
    }
}

function saveRating() {
    const bookCover = document.getElementById('book-cover');
    const bookData = bookCover.dataset.book;
    const rating = document.querySelector('.rating').dataset.rating;

    if (bookData && rating) {
        const book = JSON.parse(bookData);

        let myRatings = JSON.parse(localStorage.getItem('myRatings')) || [];
        const existingRatingIndex = myRatings.findIndex(r => r.bookId === book.id);
        if (existingRatingIndex !== -1) {
            myRatings[existingRatingIndex].rating = rating;
        } else {
            myRatings.push({ bookId: book.id, rating: rating });
        }
        localStorage.setItem('myRatings', JSON.stringify(myRatings));

        alert('Rating saved!');
    } else {
        alert('Please select a rating for the book.');
    }
}