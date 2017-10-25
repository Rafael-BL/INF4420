// Check browser support
if (typeof(Storage) !== "undefined") {
  //Store Content of shoppingCart in local storage
  var shoppingCart = {
	  1: 3,
	  2: 4,
	  5: 3,
	  4: 5
  };
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
} 
else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}

//3.3.1: Update badge
if(Object.keys(shoppingCart).length == 0) {
  $(function() {
    $("span.count").hide();
  });
}
else {
  $(function() {
    $("span.count").html(Object.keys(shoppingCart).length);
  });
}