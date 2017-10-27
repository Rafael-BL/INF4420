//GLOBAL VARIABLES
var shoppingCart = {};
var categorie = "tous_les_produits";
var criteria = "bas-haut";
var product_count = 0;

//GLOBAL FUNCTIONS
$.init = function() {
  if (JSON.parse(localStorage.getItem("shopping-cart")) == null) {
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  } 
}
//Update cart badge
function updateCartBadge() {
  var obj = JSON.parse(localStorage.getItem("shopping-cart"));
  var length = Object.keys(obj).length;
  if(length == 0) {
	$(function() {
      $("span.count").hide();
    });
  }
  else {
    $(function() {
      $("span.count").html(Object.keys(obj).length);
    });	  
  }
}
//Function to display products depending on current criteria and category
function add_to_product_list (data, categorie, criteria) {
	//Sort the data depending on selected criteria
	switch(criteria) {
    case "bas-haut":
      data = data.slice(0).sort(function(a,b) {
        return a.price - b.price;
      });
      break;
	  
    case "haut-bas":
      data = data.slice(0).sort(function(a,b) {
        return b.price - a.price;
      });
      break;
	  
	case "a-z":
      data = data.slice(0).sort(function(a,b) {
		var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
		if (nameA < nameB)
		  return -1;
		if (nameA > nameB)
		  return 1;
		return 0;
      });
	  break;
	  
	case "z-a":
      data = data.slice(0).sort(function(a,b) {
		var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
		if (nameA < nameB)
		  return 1;
		if (nameA > nameB)
		  return -1;
		return 0;
	  });
      break;
	}
	  
	//Display the data depending on criteria and categorie
	switch(categorie) {
    case "appareils_photo":
	product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "cameras") {
        html_product_list += '<div class="product">';
	    html_product_list += '<a href=./product.html?id='+value.id+'>';
	    html_product_list += '<h2>'+value.name+'</h2>';
	    html_product_list += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	    html_product_list += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	    html_product_list += '</a>';
	    html_product_list += '</div>';
		product_count++;
	  }
      });
    $('#products-list').html(html_product_list); 
      break;
	  
    case "consoles":
	product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "consoles") {
        html_product_list += '<div class="product">';
	    html_product_list += '<a href=./product.html?id='+value.id+'>';
	    html_product_list += '<h2>'+value.name+'</h2>';
	    html_product_list += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	    html_product_list += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	    html_product_list += '</a>';
	    html_product_list += '</div>';
		product_count++;
	  }
      });
    $('#products-list').html(html_product_list); 
      break;
	  
	case "ecrans":
	product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "screens") {
        html_product_list += '<div class="product">';
	    html_product_list += '<a href=./product.html?id='+value.id+'>';
	    html_product_list += '<h2>'+value.name+'</h2>';
	    html_product_list += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	    html_product_list += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	    html_product_list += '</a>';
	    html_product_list += '</div>';
		product_count++;
	  }
      });
    $('#products-list').html(html_product_list); 
	  break;
	  
	case "ordinateurs":
	product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "computers") {
        html_product_list += '<div class="product">';
	    html_product_list += '<a href=./product.html?id='+value.id+'>';
	    html_product_list += '<h2>'+value.name+'</h2>';
	    html_product_list += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	    html_product_list += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	    html_product_list += '</a>';
	    html_product_list += '</div>';
		product_count++;
	  }
      });
    $('#products-list').html(html_product_list); 
      break;

	case "tous_les_produits":
	product_count = 0;
	var html_product_list = [];
      $.each(data, function(key, value){
        html_product_list += '<div class="product">';
	    html_product_list += '<a href=./product.html?id='+value.id+'>';
	    html_product_list += '<h2>'+value.name+'</h2>';
	    html_product_list += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	    html_product_list += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	    html_product_list += '</a>';
	    html_product_list += '</div>';
		product_count++;
      });
      $('#products-list').html(html_product_list);
      break;
	}	  
}
//3.3.3 Page d'un produit (product.html)
//Function to get URL param id
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results==null){
         return null;
      }
      else{
        return decodeURI(results[1]) || 0;
      }
    }
function update_product(product_id, data) {
  if(product_id != null) {
    $.each(data, function(key, value){
      //Check for validity of id
	  if(value.id == product_id) {
	    $('#product_no_title').show();
        $('#product-name').text(data[product_id - 1].name);
        $('#product-image').attr('src', "./assets/img/"+data[product_id - 1].image);
        $('#product-desc').text(data[product_id - 1].description);
        $('#product-features').empty();
        for(i = 0; i  < data[product_id - 1].features.length; i++) {
          $('#product-features').append('<li>'+data[product_id - 1].features[i]+'</li>');
        }
        $('#product-price').text(data[product_id - 1].price);
	    return false;
	  }
	  else {
	    $('#product-name').text('Page non trouvée!');
	    $('#product_no_title').hide();
	  }
    });
  }
}
	
	
$(document).ready(function () {
  $.init();
  updateCartBadge();
  $.getJSON("http://localhost:8000/data/products.json", function (data) {
  //Set the default page for products (all products and low-high
  add_to_product_list(data, categorie, criteria);
	
  //Categorie buttons
  $("#appareils_photo").click(function() {
	categorie = "appareils_photo";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
	document.getElementById('products-count').innerHTML = product_count; 
  })
  $("#consoles").click(function() {
	categorie = "consoles";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
	document.getElementById('products-count').innerHTML = product_count; 
  });	
  $("#ecrans").click(function() {
	categorie = "ecrans";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
	document.getElementById('products-count').innerHTML = product_count; 
  });	
  $("#ordinateurs").click(function() {
	categorie = "ordinateurs";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
	document.getElementById('products-count').innerHTML = product_count; 
  });	
  $("#tous_les_produits").click(function() {
	categorie = "tous_les_produits";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
	document.getElementById('products-count').innerHTML = product_count; 
  });	
  
  //Criteria buttons  
  $("#bas-haut").click(function() {
	criteria = "bas-haut";
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  });
  $("#haut-bas").click(function() {
	criteria = "haut-bas";
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  }); 
  $("#a-z").click(function() {
	criteria = "a-z";
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  });
  $("#z-a").click(function() {
	criteria = "z-a";
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  });    
  
  //Update product page with url id
  var product_id = $.urlParam('id');
  update_product(product_id, data);
  
  //Check if an item was added to the cart
   $("#add-to-cart-form button").click(function(event) {
	event.preventDefault();	
	shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
	var quantity = $("#product-quantity").val();
    if(product_id in shoppingCart) { 
	  shoppingCart[product_id] += Number(quantity);
	}
	else {
	  shoppingCart[product_id] = Number(quantity);
	}
	localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
	updateCartBadge();
	
	$(function() {
      $("#dialog").css("visibility", "visible");
    });
	setTimeout(function() {
      $("#dialog").css("visibility", "hidden");
    }, 5000);
  });
  });	
});


    