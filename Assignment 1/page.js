// function show(event) {
//     (document.getElementsByClassName('cart')).hover(
//         function() {
//             (document.getElementsByClassName('cartbox')).fadeIn();
//         }
//     )
// }

var removeCartItemButtons = document.getElementsByClassName('remove-btn')
console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart-row-quantity')
for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

var addToCartButton = document.getElementsByClassName('product_addtocart')
for (var i = 0; i < addToCartButton.length; i++){
    var button = addToCartButton[i]
    button.addEventListener('click', addToCartButtonClicked)
}

function addToCartButtonClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product_name')[0].innerText
    var price = shopItem.getElementsByClassName('product_price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('product_image-item')[0].src
    console.log(title, price, imgSrc)
    addItemToCart(title, price, imgSrc)
    updateCartTotal()
}

function purchaseClicked(event) {
    alert('Thank You for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addItemToCart(title, price, imgSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-items')
    var cartItems = document.getElementsByClassName('cart-items')[0]  
    var cartItemNames = cartItems.getElementsByClassName('cart-row-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('Item already in the cart!')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-row">
        <div class="cart-row-image">
            <img src="${imgSrc}" alt="">
            <span class="cart-row-title">${title}</span>
        </div>
        <div class="cart-row-price">
            <span>${price}</span>
        </div>
        <div class="cart-row-quantity">
            <input type="number" value="1">
        </div>
        <div class="cart-row-remove">
            <button class="remove-btn">Remove</button>
        </div>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-row-quantity')[0].addEventListener('change', quantityChanged)
    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked)
}

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value<=0){
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    // var cartTotal = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-row-price')[0]
        var quantityElement = cartRow.querySelector('input[type="number"]')
        var price = parseFloat(priceElement.innerText.replace('Rs', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        }
        
    // cartTotal = (cartRows[0].querySelector('input[type="number"]').value) + (cartRows[1].querySelector('input[type="number"]').value)
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs ' + total
    cartTotalelement = document.getElementsByClassName('cart-total')[0].innerText = cartTotal
    console.log(cartTotalelement)
    
    
    // var cartTotalelementContent = `
    // <div class="cart-div2">
    //     <span class="cart-total">${cartTotal}</span>
    //     <img class="cart" src="./images/cart.png" alt="">
    // </div>`
    
    // cartTotalelement.innerHTML = cartTotalelementContent
}

var cartDiv = document.querySelector('.cart');
var cartBox = document.querySelector('.cartbox');

// function cartisClicked(event) {
cartDiv.addEventListener('mouseover', function() {
    cartBox.style.display = 'flex';
    cartBox.style.flexDirection = 'column';
    cartBox.style.zIndex = '1';
    // cartBox.style.position = 'absolute';
});

cartDiv.addEventListener('click', function() {
    cartBox.style.display = 'none';
});
// }

// cartDiv.addEventListener('click', cartisClicked());
