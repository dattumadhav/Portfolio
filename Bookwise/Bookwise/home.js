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
  localStorage.removeItem('isSignedIn')
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

// APIKEY
const apiKey = 'AIzaSyAPg4INxVOy4lFVx3G5rhEU0bzd0LbLfWk'; 

// search-dropdown
const searchBar = document.getElementById('search');
const dropdown = document.getElementById('dropdown');

async function searchBooks() {
    const query = searchBar.value.trim();
    if (!query) {
        dropdown.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
        const data = await response.json();

        if (data.totalItems === 0 || !data.items) {
            dropdown.innerHTML = '<div class="book-item" style="justify-content:center;">Not found</div>';
            dropdown.style.display = 'block';
        } else {
            dropdown.innerHTML = data.items.slice(0, 10).map(book => {
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/40x60?text=No+Cover';
                const title = book.volumeInfo.title;

                return `
                    <div class="book-item" onclick="redirectToBook('${book.id}')">
                        <img src="${thumbnail}" alt="${title.replace(/"/g, '&quot;')}" class="book-image">
                        <div class="book-title">${title}</div>
                    </div>
                `;
            }).join('');
            dropdown.style.display = 'block';
        }
    } catch (e) {
        console.error(e);
        dropdown.style.display = 'none';
    }
}

function redirectToBook(bookId) {
    window.location.href = `display.html?bookId=${bookId}`;
}

// Close dropdown if clicked outside
document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target) && e.target !== searchBar) {
        dropdown.style.display = 'none';
    }
});
// bestsellers
    const container = document.getElementById('books-container');

    function displayBooks(books) {
      books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');

        const img = document.createElement('img');
        img.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'placeholder.png'; // Replace with a placeholder image
        img.alt = book.volumeInfo.title;
        img.addEventListener('click', () => {
          window.location.href = `display.html?bookId=${book.id}`;
        });
        bookItem.appendChild(img);

        const title = document.createElement('h3');
        title.textContent = book.volumeInfo.title;
        bookItem.appendChild(title);

        container.appendChild(bookItem);
      });
    }

    function scrollLeftCustom() {
      container.scrollBy({
        left:-300,
        behavior: 'smooth'
      });
    }

    function scrollRight() {
      container.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=popular+books+2024&orderBy=relevance&maxResults=20&printType=books&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          displayBooks(data.items);
        } else {
          console.error('No books found.');
        }
      })
      .catch(error => console.error(error));

      // recommendation-content