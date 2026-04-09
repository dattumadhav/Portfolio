const categories = [
    'Art', 'Biography', 'Business', 'Children', 'Comics', 
    'Computers', 'Cooking', 'Education', 'Fiction', 'Health', 
    'History', 'Horror', 'Music', 'Mystery', 'Poetry', 
    'Psychology', 'Romance', 'Science', 'Self-Help', 'Sports', 
    'Travel'
];

const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || [];

function loadCategories() {
    const container = document.getElementById('categories');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.className = 'category';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = category.toLowerCase();
        input.name = 'category';
        input.value = category;
        if (selectedCategories.includes(category)) {
            input.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = category.toLowerCase();
        label.textContent = category;

        div.appendChild(input);
        div.appendChild(label);
        container.appendChild(div);
    });
}

function submitCategories() {
    const checkboxes = document.querySelectorAll('input[name="category"]:checked');
    let selectedCategories = [];
    checkboxes.forEach((checkbox) => {
        selectedCategories.push(checkbox.value);
    });
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    alert('Selected Categories: ' + selectedCategories.join(', '));
    // Redirect to another page (if needed)
    // window.location.href = 'anotherpage.html';
}

window.onload = loadCategories;
