// Client facing scripts here

const addToBasket = function (id, name, price) {
    const cartItems = getCart();

    const existItem = cartItems.find(item => item.id===id);
    if(existItem){
      existItem.quantity +=1;
    }else{
      cartItems.push({
        id,
        name,
        price,
        quantity: 1
      })
    }
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Storing the data in browser storage
    return false;
  }

 const getCart = function() {
  const cartItemsStorage = localStorage.getItem('cart');
  let cartItems = [];
  if (cartItemsStorage) {
    cartItems = JSON.parse(cartItemsStorage);
  }
  return cartItems;
 }

 const printCart = function() {
  let cartProducts = getCart();
  let totalPrice = 0;
  const orderPanelElement = document.getElementById("orderPanel"); // Order box
  const orderTotalElement = document.getElementById("orderTotal"); // Total price element

  let html = '';
  cartProducts.forEach(product => {
    const currentPrice = product.quantity * product.price;
    totalPrice += currentPrice;
    html += `
      <div class="order-item">
        <h3 class="order-number">${product.name}</h3>
        <p class="order-description">${product.quantity}</p>
        <p>-$${currentPrice}</p>
      </div>
      <div class="divider"></div>
    `
  });
  orderPanelElement.innerHTML = html; // Replacing HTML with out new code
  orderTotalElement.innerHTML = `$${totalPrice}`;
 }

const submitOrder = function(){
  // TODO: call api to save data
  localStorage.removeItem('cart')
}

