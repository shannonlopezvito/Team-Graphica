var apiKey = "laktuo6dkdd22o5m";
var animalname = "";

var loadedImages = [];
var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];
var found = 0;


$(document).ready(function(){	
	var hidden_index =  $("#koala").css("z-index")
	if (hidden_index == 0){
		$( "#hidden" ).hide();
	}
	$("#koala").click(function(){
		$("#koala").css({"z-index": 2});
		$( "#hidden" ).show();
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
		animalname = $(this).attr('id');
		if (habitat_id=="grassland"){
			$('.modal-content').css({"margin-left":"50%"});
			$('.tab').css({"margin-left":"50%"});
		}
		modal.style.display = "block";
		openCity(event, 'Description');
		getArticle();
		getImage();
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
		// clear the HTML div that will display the results
		$.each(data.response.zone[0].records.article, function(index, value) {
		count++
	});
	var number = Math.floor(Math.random() * count) + 1;
	console.log(number);
	$.each(data.response.zone[0].records.article, function(index, value) {
		if (index==number){
			$("#Article").html("<h3>" + "Article from Trove about " + animalname + "</h3>" + "<p>" + value.articleText +"</p>");
		}
	});
});
					
	
}

function openCity(evt, cityName) {
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
	if (evt.currentTarget.id==animalname){
		$(tablinks[0]).parent().css("background-color", "#ccc");
	}
	$(evt.currentTarget).parent().css("background-color", "#ccc");
    document.getElementById(cityName).style.display = "block";
}

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
    } else { // Could not reliably load image for item
		console.log("Not available: " + imgUrl);
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


