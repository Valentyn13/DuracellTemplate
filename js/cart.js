const LOCAL_STORAGE_CART_KEY = "CART";
let cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];


function toggleCart() {
    const cartModal = document.querySelector('.cart')
    cartModal.classList.toggle('cart-active')
    renderCart()
}


function addToCart (e) {
    e.preventDefault()
    let shoulPush = true
    const {type,price,name,image} = e.target.dataset
    const form = e.target

    const formData = new FormData(form)

    const {amount} = Object.fromEntries(formData.entries())

    cartItems.forEach((item) =>{
        if (item.type === type) shoulPush = false
    })

    if (shoulPush){
        cartItems.push({
            type,
            price: +price,
            name,
            amount: +amount,
            image,
            id: Date.now().toString()
        })
        saveCart()
        console.log(cartItems)
    }else {
        console.error('Product already in cart, please check the cart!')
    }
    form.reset()
}

function renderCart() {
    const cartList = document.querySelector('.cart__list')
    const totalContainer = document.querySelector('.t-price')
    let totalPrice = 0
    clearChildElements(cartList)
    cartItems.forEach((item) => {
        totalPrice += item.price * item.amount
        const newItem = document.createElement('div')
        newItem.classList.add('cart__element')
        newItem.innerHTML = `
        <div class="cart__element-top">
        <div class="cart__element-image"" >
            <img src=${item.image} alt="elem image">
        </div>
        <div class="cart__element-name">${item.name}</div>
        <div class="cart_element-delete">
        <img src="/img/trash.png" alt="elem image" data-id="${item.id}" onclick="deleteItem(event)">
        </div>
    </div>
    <div class="cart__element-bottom">
        <div class="cart_element-amount">
            <button onclick="decrease(event)" data-id="${item.id}" >-</button>
            <div>${item.amount}</div>
            <button onclick="increase(event)" data-id="${item.id}"  >+</button>
        </div>
        <div class="cart__element-price">${item.price * item.amount}₴</div>
    </div>
        `
        cartList.appendChild(newItem)
    })
    totalContainer.innerHTML = `${totalPrice}₴`
}

function deleteItem (e) {
    const id = e.target.dataset.id

    const filteredItems = cartItems.filter((el) => {
        return el.id != id
    })
    cartItems = filteredItems
    saveCart()
    renderCart()
}

function saveCart (){
    const amoutnDiv = document.querySelector('.cart-section__amount')
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    amoutnDiv.textContent = cartItems.length
}

function increase(e) {
    const id = e.target.dataset.id
    cartItems.forEach((item) => {
        if (item.id === id){
            item.amount += 1
        }
      });
      saveCart()
      renderCart();
}
function decrease(e){
    const id = e.target.dataset.id
    cartItems.forEach((item) => {
        if (item.id === id){
            if(item.amount > 1) item.amount -= 1
        }
      });
      saveCart()
      renderCart();
}

function clearChildElements(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  window.addEventListener("load", () => {
    const amoutnDiv = document.querySelector('.cart-section__amount')
    amoutnDiv.textContent = cartItems.length
  });
