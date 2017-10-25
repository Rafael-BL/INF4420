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

//3.3.1: Entête
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

//3.3.2 Page des produits (products)
//3.3.2.1
//Initial load on document ready (prix bas-haut par défaut)
$(document).ready(function () {
  $.getJSON("http://localhost:8000/data/products.json", function (data) {
    var html = [];

	//Sort by default (prix bas-haut)
    var lowHigh = data.slice(0);
    lowHigh.sort(function(a,b) {
      return a.price - b.price;
    });
	
    $.each(lowHigh, function(key, value){
      html += '<div class="product">';
      html += '<a href="./product.html" title="En savoir plus...">';
	  html += '<h2>'+value.name+'</h2>';
	  html += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	  html += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	  html += '</a>';
	  html += '</div>';
    });
    $('#products-list').html(html); 
	
  //3.3.2.2
  $("#appareils_photo").click(function() {
      console.log(data);
	  var appareils_photo = [];
	
      $.each(data, function(key, value){
		if(value.category == "cameras") {
          html += '<div class="product">';
          html += '<a href="./product.html" title="En savoir plus...">';
	      html += '<h2>'+value.name+'</h2>';
	      html += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	      html += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	      html += '</a>';
	      html += '</div>';
		}
      });
      $('#products-list').html(html); 	
    });
	
	
	
	
	
	
	
	
	
  });	
});
  
  
  
  
  
  
/*  //3.3.2.2
  $("#appareils_photo").click(function() {
    $.getJSON("http://localhost:8000/data/products.json", function (data) {
      console.log(data);
	
      var html = [];
      $.each(data, function(key, value){
		if(value.category == "cameras") {
          html += '<div class="product">';
          html += '<a href="./product.html" title="En savoir plus...">';
	      html += '<h2>'+value.name+'</h2>';
	      html += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	      html += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	      html += '</a>';
	      html += '</div>';
		}
      });
      $('#products-list').html(html); 	
    });
  });
	
  $("#consoles").click(function() {
    console.log("#consoles clicked");
  });
  $("#ecrans").click(function() {
    console.log("#ecrans clicked");
  });
  $("#ordinateurs").click(function() {
    console.log("#ordinateurs clicked");
  });
  $("#tous_les_produits").click(function() {
    console.log("#tous_les_produits clicked");
  });
});*/
































