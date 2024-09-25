
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');


openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});


const products = [
    {
        id:23 ,
        name: 'Hyd Chicken Biriyani',
        image: 'hyd chicken.jfif',
        price: 250
    },
    {
        id:24 ,
        name: 'Hyd Mutton Biriyani',
        image: 'hyd mutton.jfif',
        price: 350
    },
    {
        id:25 ,
        name: 'Mughalai Biriyani',
        image: 'mugali.jfif',
        price: 230
    },
    {
        id:26 ,
        name: 'Ambur Biriyani',
        image: 'ambur.jfif',
        price: 250
    },
    {
        id:27 ,
        name: 'Panner Biriyani',
        image: 'panner.jpg',
        price: 180
    },
    {
        id:28 ,
        name: 'Hyd SPL Biriyani',
        image: 'spl.jfif',
        price: 250
    },
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
