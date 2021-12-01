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

  // html that will be added when data is updated
  let html = '';
  cartProducts.forEach(product => {
    const currentPrice = product.quantity * product.price;
    totalPrice += currentPrice;
    html += `
      <div class="order-item">
        <h3 class="order-number">${product.name}</h3>
        <p class="order-quantity">qty: ${product.quantity}</p>
        <p class="meal-price"> $${currentPrice}</p>
      </div>
      <div class="divider"></div>
    `
  });
  orderPanelElement.innerHTML = html; // Replacing HTML with out new code
  orderTotalElement.innerHTML = `Total: $${totalPrice}.00`;
 }

const submitOrder = function(){
  // TODO: call api to save data
  localStorage.removeItem('cart')
}


// TODO- Not important: <button type="button" class="btn btn-danger remove-button">Remove</button>
