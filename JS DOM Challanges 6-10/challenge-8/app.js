const cartItems = document.getElementById('cart-items');
emptyCart = document.getElementsByClassName('empty-cart')[0];
let quantityObj = {};
function addToCart(productName, price) {
      if(document.getElementsByClassName('empty-cart').length)
            document.getElementsByClassName('empty-cart')[0].remove();
      if (quantityObj[productName] === undefined) {
            quantityObj[productName] = 1;

            const cartItemDiv = document.createElement('div'),
                  p = document.createElement('p'),
                  secondItemDiv = document.createElement('div'),
                  decreamentButton = document.createElement('button'),
                  increamentButton = document.createElement('button'),
                  removeCartButton = document.createElement('button'),
                  quantityElement = document.createElement('p'),
                  totalPrice = document.createElement('p');

            decreamentButton.innerText = "-";
            increamentButton.innerText = "+";

            cartItemDiv.setAttribute('data-product', productName)
            cartItemDiv.classList.add('cart-item');
            p.innerText = productName;

            secondItemDiv.classList.add('quantity-controls')
            secondItemDiv.appendChild(decreamentButton);
            quantityElement.innerText = quantityObj[productName];
            secondItemDiv.appendChild(quantityElement);

            increamentButton.classList.add('increament-product')
            increamentButton.addEventListener('click', function () {
                  quantityObj[productName] = ++quantityObj[productName];
                  quantityElement.innerText = quantityObj[productName];
                  const totalPriceAmount = quantityObj[productName] * price;
                  totalPrice.innerText = totalPriceAmount.toFixed(2);
            });

            decreamentButton.addEventListener('click', function () {
                  quantityObj[productName] = --quantityObj[productName];
                  quantityElement.innerText = quantityObj[productName];
                  const totalPriceAmount = quantityObj[productName] * price;
                  if( quantityObj[productName] === 0 ) {
                        cartItemDiv.remove(); 
                  } 
                  else totalPrice.innerText = totalPriceAmount.toFixed(2);

                  if( cartItems.childElementCount === 0 )
                        cartItems.append(emptyCart);
            });

            secondItemDiv.appendChild(increamentButton);

            totalPrice.innerText = quantityObj[productName] * price;
            secondItemDiv.appendChild(totalPrice);
            secondItemDiv.appendChild(removeCartButton);

            removeCartButton.innerText = "Remove";



            removeCartButton.addEventListener('click', function (e) {
                  cartItemDiv.remove();
            })
            cartItemDiv.appendChild(p);
            cartItemDiv.appendChild(secondItemDiv);


            cartItems.append(cartItemDiv);
      } else {
            let existingProduct;
            for(let i = 0; i < cartItems.children.length; i++){
                  const cartItem = cartItems.children[i];
                  if( cartItem.getAttribute('data-product') === productName ){
                        existingProduct = cartItem
                        break;
                  }
            }

            console.log(existingProduct);
            existingProduct.getElementsByClassName("increament-product")[0].click()
            quantityObj[productName] = ++quantityObj[productName];
      }
}