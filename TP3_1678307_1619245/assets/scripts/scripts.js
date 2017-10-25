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

//Function to display products depending on current criteria and category
var categorie = "tous_les_produits";
var criteria = "bas-haut";
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
	var product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "cameras") {
		console.log(value.id);
		var 
        html_product_list += '<div class="product">';
	    html_product_list += '<a href="./product.html?id" value.category>';
	    html_product_list += '<h2>'+value.name+'</h2>';
	    html_product_list += '<img alt='+value.name+' src="./assets/img/'+value.image+'">';
	    html_product_list += '<p><small>Prix</small> '+value.price+'&thinsp;$</p>';
	    html_product_list += '</a>';
	    html_product_list += '</div>';
		product_count++;
	  }
	  console.log(html_product_list);
      });
    $('#products-list').html(html_product_list); 
      break;
	  
    case "consoles":
	var product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "consoles") {
        html_product_list += '<div class="product">';
	    html_product_list += '<a href="./product.html" title="En savoir plus...">';
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
	var product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "screens") {
        html_product_list += '<div class="product">';
	    html_product_list += '<a href="./product.html" title="En savoir plus...">';
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
	var product_count = 0;
	var html_product_list = [];
	  $.each(data, function(key, value){
      if(value.category == "computers") {
        html_product_list += '<div class="product">';
	    html_product_list += '<a href="./product.html" title="En savoir plus...">';
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
	var product_count = 0;
	var html_product_list = [];
      $.each(data, function(key, value){
        html_product_list += '<div class="product">';
        html_product_list += '<a href="./product.html" title="En savoir plus...">';
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
	document.getElementById('products-count').innerHTML = product_count; 
}

$(document).ready(function () {
  $.getJSON("http://localhost:8000/data/products.json", function (data) {
	//Initial load on document ready (prix bas-haut par défaut)
    add_to_product_list(data, categorie, criteria);

  //3.3.2.2
  //Categorie buttons
  $("#appareils_photo").click(function() {
	categorie = "appareils_photo";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  })
  $("#consoles").click(function() {
	categorie = "consoles";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  });	
  $("#ecrans").click(function() {
	categorie = "ecrans";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  });	
  $("#ordinateurs").click(function() {
	categorie = "ordinateurs";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
  });	
  $("#tous_les_produits").click(function() {
	categorie = "tous_les_produits";  
	add_to_product_list(data, categorie, criteria);
    $(this).siblings().removeClass('selected')
    $(this).addClass('selected');
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
  });
});