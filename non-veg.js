// Selecting elements from the DOM
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

// Event listeners for opening and closing the shopping cart
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Array of products
const products = [
    {
        id: 1,
        name: 'Fried Chicken',
        image: 'fried.jpg',
        price: 250
    },
    {
        id: 2,
        name: 'Chilli Chicken',
        image: 'chilli.png',
        price: 280
    },
    {
                id: 3,
                name: 'Tandoori Chicken',
                image: 'tandoori.jpg',
                price: 300
            },
            {
                id: 4,
                name: 'Chicken 65',
                image: '65.jfif',
                price: 250
            },
            {
                id: 5,
                name: 'Mutton Ghee Roast',
                image: 'Mutton-Ghee-roast.jpg',
                price: 380
            },
            {
                id: 6,
                name: 'Mutton Fry',
                image: 'mutton.jfif',
                price: 350
            },
    // Add more product entries as needed following the same structure
];

function initApp() {
    products.forEach((product) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${product.image}" alt="${product.name}">
            <div class="title">${product.name}</div>
            <div class="price">${product.price.toLocaleString()}</div>
            <button onclick="addToGlobalCart(${product.id})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}

function reloadCart() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        count += item.quantity;

        const newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <img src="image/${item.image}" alt="${item.name}">
            <div>${item.name}</div>
            <div>${(item.price * item.quantity).toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${index}, ${item.quantity - 1})">-</button>
                <div class="count">${item.quantity}</div>
                <button onclick="changeQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function addToGlobalCart(id) {
    const productToAdd = products.find((product) => product.id === id);
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const product = { ...productToAdd, quantity: 1 };
        cartItems.push(product);
    }

    console.log(`Adding item with ID ${id} to the global cart.`);
    reloadCart();
}

function changeQuantity(index, quantity) {
    if (quantity <= 0) {
        cartItems.splice(index, 1);
    } else {
        cartItems[index].quantity = quantity;
    }
    reloadCart();
}

let cartItems = [];
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    reloadCart();
}

initApp();