const LOCAL_STORAGE_CART_KEY = "CART";
let cartItems =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

const openCart = () => {
  const cartModal = document.querySelector(".my-cart-wrapper");
  cartModal.classList.toggle("my-cart-wrapper-active");

  renderCart();
};

function addOne(event) {
    const id = event.target.dataset.id
    cartItems.forEach((el) => {
        if (el._id == id){
             el.amount += 1
        }
      });
      saveItems()
      renderCart();
}

function grabOne(event) {
    const id = event.target.dataset.id
  cartItems.forEach((el) => {
    if (el._id == id){
        if(el.amount > 1) el.amount -= 1
    }
  });
  saveItems()
  renderCart();
}

function deleteElement (event) {
    const id = event.target.dataset.id

    console.log(id)
    const filteredItems = cartItems.filter((el) => {
        return el._id != id
    })
    console.log(filteredItems)
    cartItems = filteredItems
    saveItems()
    renderCart()
}

function clearChildElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}


function renderCart() {
const cartItemsCountainer = document.querySelector(".cartItemList");
const totalPriceDiv = document.querySelector('.cart-total-price')
let totalPrice = 0
  clearChildElements(cartItemsCountainer);

  cartItems.forEach((elem) => {
    
    const newElement = document.createElement("div");
    newElement.classList.add("my-cart-element");

    const productsPrice = elem.price * elem.amount
    totalPrice += productsPrice
    newElement.innerHTML = `
    <div class="element-image">
        <img src="${elem.image}" alt="element image">
    <div/>
    `;
    newElement.innerHTML += `
    <div class="delete-item"><img src="../img/close-cart.png" data-id=${elem._id} onClick="deleteElement(event)" alt="element image"><div/>
    `;
    newElement.innerHTML += `
    <div class="element-content">
        <div>${elem.name}<div/>
        <div>Кількість: ${elem.amount}<div/>
        <div>Ціна: ${productsPrice.toFixed(2)}₴<div/>
        <div class="amount-button-container">
            <button class="addOne" data-id=${elem._id} onClick="grabOne(event)">-1</button>
            <button class="addOne" data-id=${elem._id} onClick="addOne(event)">+1</button>
        <div/>
    <div/>
    `;
    cartItemsCountainer.appendChild(newElement);
  });
totalPriceDiv.innerHTML = `Усього: <span>${totalPrice.toFixed(2)} ₴</span>`

}

//../643577be43537834790fad7f/64357e285cf78f5bfc6db00e_micro-1.png
const addToCart = (event, data) => {
  const { price, name, image } = data;
  event.preventDefault();
  const form = event.target;

  //const cartItemsAmount = document.querySelector(".cart-items-count");
  // const formButton = document.querySelector('.submit-add-product-from')
  // const formActionResult = document.querySelector('.form-action-result')
  // formActionResult.textContent = ''

  const formData = new FormData(form);
  const { amount } = Object.fromEntries(formData.entries());

  cartItems.push({
    _id: Date.now(),
    amount: Number(amount),
    price,
    name,
    image,
  });
  console.log(cartItems);
    saveItems()
};

window.addEventListener("load", () => {
  const cartItemsAmount = document.querySelector(".cart-items-count");
  cartItemsAmount.textContent = String(cartItems.length);
});



function saveItems() {
    const cartItemsAmount = document.querySelector(".cart-items-count");
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    cartItemsAmount.textContent = String(cartItems.length);
}