//Global variable
var apiKey = "laktuo6dkdd22o5m";
var animalname = "";

var loadedImages = [];
var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];
var found = 0;

var existing_animal=[];
// A dictionary that stores all description of the animals
var animaldictionary = {};
animaldictionary["koala"] = "The Koala is a unique Australian marsupial, often incorrectly called a Koala Bear. The males are larger than females. Koalas from southern areas are about 30% larger than the Queensland koalas Koala's fur is thick soft. Ears have long white hairs on the tips. Koalas can live as long as 17 years, however life expectancy is usually less than 10 years due to disease, attacks by dogs, road kills. Koalas sleep for about 75% of the time, becoming active after sunset. During the night they can be heard growling at other koalas.";
animaldictionary["Gouldian_Finch"]="The Gouldian Finch is a beautiful finch with a bright green back, yellow belly and a purple breast. Most birds have a black face, but about 25% have red faces, and yellow-faced forms are rare. The males are brighter colours than the females. Juveniles are grey on the head and neck, and olive on the back and tail. The underparts are pale brownish white.";
animaldictionary["Australian_Fur_Seal"]="The Australian Fur Seal is dark brown to brownish grey with mane of coarse hair. Pups black with silver. External ears visible.";
$(document).ready(function(){	
// Functions that be ran every time the browser was opened
	
	updataDisplay();
	
	//function for the hidden animal
	var hidden_index =  $(".hidden_an").css("z-index")
	if (hidden_index == 0){
		// if the animal is hidden, hide the more info text
		$(".hidden").hide();
	}
	// When the user clicks on the koala, show the image and the more info text
	$(".hidden_an").click(function(){
		$(this).css({"z-index": 2});
		$(this).children().show();
	});
	
	//Code snippets from (Source: Highlight nav links when scrolling the page from blyk)
	// A function that highlights a link, when the user's move enter a section
	$(".bgimg").mouseenter(function(){
		var id = $(this).attr('id')+"_link";
		$(".link").removeClass('active');
		$("#"+id).addClass('active');
   });
   

	// Get the modal
	var modal = document.getElementById('myModal');
	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal
	$(".more_info").click(function(){
		var habitat = $(this).parent();
		var habitat_id = $(this).parent().attr('id');
		habitat.append(modal);
		animalname = $(this).find('img').attr('id');
		if (habitat_id=="grassland"){
			// reset the margin style
			$('.modal-content').css({"margin-right":""});
			$('.tab').css({"margin-right":""});
			$('.modal-content').css({"margin-left":"50%"});
			$('.tab').css({"margin-left":"50%"});
		} else{
			$('.modal-content').css({"margin-left":""});
			$('.tab').css({"margin-left":""});
			$('.modal-content').css({"margin-right":"50%"});
			$('.tab').css({"margin-right":"50%"});
		}
		modal.style.display = "block";
		opentab(event, 'Description');
		// Call three functions to get the content of the modal
		getArticle();
		getImage();
		getDescription();
	});

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
		$("#Article").html("<h3>" + "Article" + "</h3>" + "<p>" + "loading..." +"</p>");
		$("#Images").html("<h3>" + "Images" + "</h3>" + "<p>" + "loading..." +"</p>");
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			$("#Article").html("<h3>" + "Article" + "</h3>" + "<p>" + "loading..." +"</p>");	
			$("#Images").html("<h3>" + "Images" + "</h3>" + "<p>" + "loading..." +"</p>");	
		}
	}
});

function updataDisplay() {
	for (i = 1; i <= 3; i++) {
		getphp_s(i);
		getphp_g(i);
		getphp_u(i);
		getphp_se(i);
	}
}

function getphp_s(i){
	$.post("postData.php", { action: 0 }, function(ajaxresult){
			var div_name="#sky_"+i;
			var data=ajaxresult.split(":");
			var id = data[0], 
			name = data[1],
			image = data[2];
			height = data[3];
			description = data[4];
		if ($.inArray(name, existing_animal)==-1){
			existing_animal.push(name);	
			//alert(name);
			$(div_name).find('img').attr('src',image);
			$(div_name).find('img').height(height);
			$(div_name).find('img').attr('alt',name);
			$(div_name).find('img').attr("id",name);
			animaldictionary[name] = description;
		} else{
			getphp_s(i);
		}
		});
}

function getphp_g(i){
	$.post("postData.php", { action: 1 }, function(ajaxresult){
			var div_name="#grassland_"+i;
			var data=ajaxresult.split(":");
			var id = data[0], 
			name = data[1],
			image = data[2];
			height = data[3];
			description = data[4];
		if ($.inArray(name, existing_animal)==-1){
			existing_animal.push(name);	
			//alert(name);
			$(div_name).find('img').attr('src',image);
			$(div_name).find('img').height(height);
			$(div_name).find('img').attr('alt',name);
			$(div_name).find('img').attr("id",name);
			animaldictionary[name] = description;
		} else{
			getphp_g(i);
		}
		});
}

function getphp_u(i){
	$.post("postData.php", { action: 2 }, function(ajaxresult){	
			var div_name="#underground_"+i;
			var data=ajaxresult.split(":");
			var id = data[0], 
			name = data[1],
			image = data[2];
			height = data[3];
			description = data[4];
		if ($.inArray(name, existing_animal)==-1){
			existing_animal.push(name);	
			$(div_name).find('img').attr('src',image);
			$(div_name).find('img').height(height);
			$(div_name).find('img').attr('alt',name);
			$(div_name).find('img').attr("id",name);
			animaldictionary[name] = description;
		} else{
			getphp_u(i);
		}
		});
}

function getphp_se(i){
	$.post("postData.php", { action: 3 }, function(ajaxresult){	
			var div_name="#sea_"+i;
			var data=ajaxresult.split(":");
			var id = data[0], 
			name = data[1],
			image = data[2];
			height = data[3];
			description = data[4];
		if ($.inArray(name, existing_animal)==-1){
			existing_animal.push(name);	
			$(div_name).find('img').attr('src',image);
			$(div_name).find('img').height(height);
			$(div_name).find('img').attr('alt',name);
			$(div_name).find('img').attr("id",name);
			animaldictionary[name] = description;
		} else{
			getphp_se(i);
		}
		});
}
			
// A function that open the tab content
function opentab(evt, tabName) {
	event.preventDefault();
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
		$(tablinks[i]).parent().css("background-color", "#ECECEC");
    }  
	// check if the modal just opened, highlight the default tab "description"
	if (evt.currentTarget.id==animalname){
		$(tablinks[0]).parent().css("background-color", "#ccc");
	}
	$(evt.currentTarget).parent().css("background-color", "#ccc");
    document.getElementById(tabName).style.display = "block";
}

//Code snippets from (Source: Trove Ultra Basic Example Code from DECO1800/7180 Course Rescource)
// Function that get a random article from Trove
function getArticle(){
// Get the values from our search form
	var searchTerm = animalname;			  
	var searchZone = "newspaper";
	var sortBy = "relevance";
	var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&encoding=json&zone=" + searchZone + "&sortby=" + sortBy + "&q=" + searchTerm + "&s=0&n=5&include=articletext,pdf&encoding=json&callback=?";
	var text=null;
	var count=0;
	var index = 0;
				    
	console.log(url);
			    	
	$.getJSON(url, function(data) {
		$.each(data.response.zone[0].records.article, function(index, value) {
		count++
	});
	var number = Math.floor(Math.random() * count) + 1;
	console.log(number);
	$.each(data.response.zone[0].records.article, function(index, value) {
		if (index==number){
			$("#Article").html("<h3>" + "Article" + "</h3>" + "<p>" + value.articleText +"</p>"+ "<p>"+ "<i>"+"Article from Trove"+"<i>"+"</p>");
		}
	});
});
					
	
}

//Code snippets from (Source: Images & Trove from DECO1800/7180 Course Rescource)
function waitForFlickr() {
	if(found == loadedImages.length) {
		printImages();
	}else if(found+1 == loadedImages.length||found-1 == loadedImages.length){
		// error in the sample code?
		printImages();
	}else {
		setTimeout(waitForFlickr, 250);
	}
}

function getImage(){
	found = 0;
	loadedImages = [];
    //get input values
    var searchTerm = animalname;
    searchTerm = searchTerm.replace(/ /g, "%20");
    var sortBy = "relevance";
    //create searh query
    var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=100&q=" + searchTerm + "&callback=?";
    //get the JSON information we need to display the images
    $.getJSON(url, function(data) {
        console.log(data);
        $.each(data.response.zone[0].records.work, processImages);
		waitForFlickr(); // Waits for the flickr images to load
    });
}

/*
*   Depending where the image comes from, there is a special way to get that image from the website.
*   This function works out where the image is from, and gets the image URL
*/
function processImages(index, troveItem) {
    var imgUrl = troveItem.identifier[0].value;
    if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr
		found++;
        addFlickrItem(imgUrl, troveItem);
    } else if (imgUrl.indexOf(urlPatterns[1]) >= 0) { // nla.gov
		found++;
        loadedImages.push(
            imgUrl + "/representativeImage?wid=900" // change ?wid=900 to scale the image
        );
    } else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch
		found++;
        loadedImages.push(
        "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg"
    );
    } else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch
		found++;
        loadedImages.push(
        "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl)
        );
    } else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa 
        found++;
        loadedImages.push(
        imgUrl.slice(0, imgUrl.length - 3) + "jpg"
	);     
    } else { // Could not reliably load image for item, only for debug
		//console.log("Not available: " + imgUrl);
    }
}

function addFlickrItem(imgUrl, troveItem) {
    var flickr_key = "a4d0bf2f4bde0595521b7bd8317ec428";
    var flickr_secret = "efc7221b694ff55e";
    var flickr_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + flickr_key + "&photo_id=";
    var url_comps = imgUrl.split("/");
    var photo_id = url_comps[url_comps.length - 1];

    $.getJSON(flickr_url + photo_id + "&format=json&nojsoncallback=1", function(data) {
        if (data.stat == "ok") {
            var flickr_image_url = data.sizes.size[data.sizes.size.length - 1].source;
            loadedImages.push(
                flickr_image_url
            );
        }
    });
}

function printImages() {
	// Print out one random image
	var length = loadedImages.length;
	var value = Math.floor(Math.random() * length) + 1;
    for (var i in loadedImages) {
		if (i==value){
			var image = new Image();
			image.src = loadedImages[i];
			image.style.display = "inline-block";
			image.style.width = "48%";
			image.style.display="block";
			image.style.margin = "auto";
			image.style.verticalAlign = "top";
				
			$("#Images").html("<h3>" + "Images" + "</h3>" + "<p>" +"</p>");
			$("#Images").append(image);
			$("#Images").append("<p>"+ "<i>"+"Image from Trove"+"<i>"+"</p>");
		}
    }
}

// from http://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable, url) {
    var query = url.split("?");
    var vars = query[1].split("&");
    for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

// A function that gets the corresponding animal description
function getDescription(){
	for (var key in animaldictionary){
		if (key==animalname){
			$("#Description").html("<h3>" + "Description" + "</h3>" + "<p>" + animaldictionary[key] +"</p>" + "<p>"+ "<i>"+"Description from Ozanimal.com"+"<i>"+"</p>");
		}
}
}

//Refresh Button
function refresh() {
    location.reload();
}

