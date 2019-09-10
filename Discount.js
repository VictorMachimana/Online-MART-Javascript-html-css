
//----------Button on click should remove from cart-------//
let removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons);
for(let i = 0; i < removeCartItemButtons.length; i++){
	let button = removeCartItemButtons[i];
	button.addEventListener('click', removeCartItem)
}

function removeCartItem(event){
		additemsArray = JSON.parse(localStorage.getItem("item"));
		additemsArray.splice(event,1);
	let buttonClicked = event.target;
			buttonClicked.parentElement.parentElement.remove()
		localStorage.setItem("item", JSON.stringify(additemsArray));
		location.reload()
	}



//----------choose quantity of items-------//
let quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(let i = 0; i < quantityInputs.length; i++){
	let input = quantityInputs[i];
	input.addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
	let input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1
	}
	
}



//----------Purchase Button-------//
function purchaseButtonClicked(){
	document.getElementsByClassName('btn-purchase').addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
	
	alert('Thank you for your purchase')
	alert('Your Tracking Code is:' + ' ' + Math.random().toString(36).substr(2, 9));
	let cartItems = document.getElementsByClassName('cart-items')[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}

}

//----------Button on click should add to cart-------//

let addToCartbuttons = document.getElementsByClassName('shop-item-button')
for(let i = 0; i < addToCartbuttons.length; i++){
	let button = addToCartbuttons[i];
	button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event){
	let button = event.target;
	let shopItem = button.parentElement.parentElement;
	let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
	let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
	let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
	console.log(imageSrc, title, price)
	CartShopItem(imageSrc, title, price)

}


//----------Store items to Array on Click Stringfy-------//
var additemsArray = [];
let cartTotal = [0];
function CartShopItem (imageSrc, title, price) {
		let item = {src: `${imageSrc}`, name: `${title}`, amount: `${price}`};

		for (let i = 0; i < additemsArray.length; i++) {
			if(item.src == additemsArray[i].src) {
				alert("this item has already been added to your cart");
				return;
			}
		}
		alert("The total value of your cart is " + item.amount);
	
	additemsArray.push(item);

	let mytotal = 0;
	let vat = 0.15
	for (i = 0; i < additemsArray.length; i++) {
	mytotal += Number(additemsArray[i].amount.replace("R", " "));
	mytotal += vat
	mytotal = Math.round(mytotal * 100) / 100
	cartTotal.push(mytotal);
	}
	localStorage.setItem("item", JSON.stringify(additemsArray));
	localStorage.setItem("mytotal", JSON.stringify(cartTotal));
	console.log(window.localStorage);
}


//----------discount-coupons-------//

let deliveryTotal = [];
function discountCode(){
let inputCode = document.getElementById("discount").value;
let coupons = ['HY3G56IP91', 'VVI7I8D56T', 'HFI3M567R4', 'N12V5JUY9M', 'X7I0FG7D8D'];

let newCartTotal = JSON.parse(localStorage.getItem("mytotal"));
for (let i = 0; i < newCartTotal.length; i++) {
	let total = newCartTotal[i];
	document.getElementById('discount-total-price').innerHTML = "R" + total;
	

	if(coupons.includes(inputCode)){
		let totalCost = total - (total*5/100);
		totalCost = Math.round(totalCost * 100) / 100;
		parseFloat(document.getElementById('discount-total-price').innerHTML.replace('R', ''))
		document.getElementById('discount-total-price').innerHTML = totalCost;
		cartTotal.push(totalCost);
		}
		else{
		document.getElementById('discount-total-price').innerHTML = "R" + total;
	}
		localStorage.setItem("totalCost", JSON.stringify(cartTotal));
	} 

};

discountCode()