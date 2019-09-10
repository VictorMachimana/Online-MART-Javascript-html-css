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


//--------delivery--option------//

function getSelectValue(){

	let newDeliveryTotal = JSON.parse(localStorage.getItem("totalCost"));

	for (let i = 0; i < newDeliveryTotal.length; i++) {
		let total = newDeliveryTotal[i];
		document.getElementById('delivery-price').innerHTML = "R" + total;
		
		let id = document.getElementById('list');
		let selectedValue = id.options[id.selectedIndex].value;
		let cost = selectedValue * 1;
		let totalSum = total + cost;
		totalSum = Math.round(totalSum * 100) / 100;
		document.getElementById('delivery-total-price').innerText = "R" + totalSum;
	}

}
getSelectValue()
