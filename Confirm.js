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

//----------Purchase Button-------//
function orderNumber(){
	document.getElementById("gen-output").innerHTML =  Math.random().toString(36).substr(2, 9);
}

function removeallItems(){
		let data = JSON.parse(localStorage.getItem("item"));
		data.additemsArray = [];
		localStorage.setItem("item", JSON.stringify(additemsArray));

		//----remove total------//
		let amount = JSON.parse(localStorage.getItem("mytotal"));
		amount.cartTotal = [];
		localStorage.setItem("mytotal", JSON.stringify(cartTotal));
	}
	removeallItems()