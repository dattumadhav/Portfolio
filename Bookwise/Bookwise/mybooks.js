document.addEventListener("DOMContentLoaded", function () {
    const myBooksContainer = document.getElementById('my-books');
    const books = JSON.parse(localStorage.getItem('myBooks')) || [];

    books.forEach(book => {
        addBookToContainer(book);
    });

    function addBookToContainer(book) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        bookElement.innerHTML = `
            <div class="book-image">
                <img src="${book.cover}" alt="Book Cover">
            </div>
            <div class="book-info">
                <h2>${book.title}</h2>
                <h3>${book.authors.join(', ')}</h3>
                <p>Average Rating: ${book.averageRating}</p>
                <div class="book-actions">
                    <select class="status-selector">
                        <option value="want-to-read">Want to Read</option>
                        <option value="in-progress">In Progress</option>
                        <option value="already-read">Already Read</option>
                    </select>
                    <div class="review-box hidden">
                        <textarea placeholder="Write your review here..."></textarea>
                        <div class="rating">
                            <span class="star" data-value="1">&#9733;</span>
                            <span class="star" data-value="2">&#9733;</span>
                            <span class="star" data-value="3">&#9733;</span>
                            <span class="star" data-value="4">&#9733;</span>
                            <span class="star" data-value="5">&#9733;</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const statusSelector = bookElement.querySelector('.status-selector');
        const reviewBox = bookElement.querySelector('.review-box');

        statusSelector.addEventListener('change', function () {
            if (this.value === 'already-read') {
                reviewBox.classList.remove('hidden');
            } else {
                reviewBox.classList.add('hidden');
            }
        });

        myBooksContainer.appendChild(bookElement);
    }

    // Function to add new book to the list and save in local storage
    window.addBook = function(book) {
        books.push(book);
        localStorage.setItem('myBooks', JSON.stringify(books));
        addBookToContainer(book);
    }
});
