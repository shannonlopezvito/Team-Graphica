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
var click=4;
$(document).ready(function(){	
// Functions that be ran every time the browser was opened
	$.ajax({
		url: 'postData.php',
		success: function(){
		updataDisplay();
	},
	error: function(){
		animaldictionary["flying fox"] = "The Grey-headed Flying-fox has dark brown body and grey head, Reddish collar round the neck. Thick leg fur down to ankle. Roosts in large camps in branches of large trees.";
		animaldictionary["kookaburra"] = "The Laughing Kookaburra is a stocky bird with large head and a short neck and blunt tail. Beak is fairly long and sturdy. The wings are brown with blue mottling, the back is brown and the tail reddish. The males have a patch of blue-green feathers in the center of the rump - this less noticeable on the females.";
		animaldictionary["numbat"] = "The Numbat is a red-brown marsupial with six or seven vertical white bars on the back. It has a black stripe along the head. The snout is pointed , and they have a small mouth and a long, sticky tongue . The long bushy tail resembles a bottlebrush.";
		animaldictionary["Tasmanian Devil"] = "The Tasmanian Devil is the largest surviving carnivorous marsupial in the world. It has a thick-set, squat build, with a relatively large, broad head and short, thick tail. The fur is mainly black, but white markings often occur on the rump and chest. Body size also varies greatly, depending on the diet and habitat. Adult males are usually larger than adult females. Large males weigh up to 12 kg, and stand about 30 cm high at the shoulder. " ;
		animaldictionary["Wallaby"] = "The Agile Wallaby is a medium sized wallaby. Light sandy brown with paler underneath. Has pale cheek stripe and light stripe on thigh. The edges of ears are black. They live in small social groups and can often seen feeding out in the open in late afternoon.";
		animaldictionary["blueshark"] = "Blue sharks are found in very deep waters. They prefer cooler water though so they are often found in sub tropical areas where it doesn’t get too warm.  It isn’t very often you will see one unless you are diving in the depths of the ocean. Most divers are well aware of what a blue shark looks like and strive to stay as far away from them as possible.";
		animaldictionary["turtle"] = "The Green Turtle has a small head and strong front flippers. It gets its name from the colour of its fat rather than the colour of its shell.";
		animaldictionary["fairypenguin"] = "The Fairy Penguin is the smallest species of penguin and the only one to breed in Australia. To keep them warm and dry, their feathers are oily due to oil glands in the penguins tail. Fairy penguins come ashore in groups to their burrows after dark when most predators are not around, returning to the sea before sunrise."; 
		animaldictionary["palm cockatoo"] = "The Palm Cockatoo is a large dark-grey cockatoo with large dark grey bill. It has orange-red facial skin patches. The crest is long and erect. The female is smaller with less red on face. Young ones have pale yellow margins on feathers of the underside, and paler bill.";
		animaldictionary["bilby"] ="The Bilby has long rabbit-like ears and pointed nose. The fur is silvery blue. It has a longish black and white tail. It has strong claws for digging."
		animaldictionary["echidna"] ="The Short-beaked Echidna has a long sticky tongue for catching ants and other insects. It is a monotreme - that means it lays eggs. The prickly coat gives it protection - much like a hedgehog or porcupine. Has strong claws for digging and tearing termite mounds apart. Males have spur on ankle These are not venomous (unlike the Platypus spurs which are venomous).";
		animaldictionary["wombat"] = "Wombats are stout marsupials and can weigh up to 36 kg. They have a large, blunt head and a short, neck. Their sharp claws and stubby, powerful legs make them great diggers. Wombats can live for up to 27 years in captivity. It digs burrows and tunnels in the ground for shelter and to escape from danger. Despite their slow appearance they can run quite fast.";
	}
	});

	
	
	//updataDisplay();
	
	//function for the hidden animal
	var hidden_index =  $(".hidden_an").css("z-index")
	if (hidden_index == 0){
		// if the animal is hidden, hide the more info text
		$(".hidden").hide();
	}
	// When the user clicks on the koala, show the image and the more info text
	$(".hidden_an").click(function(){
		if ($(this).css("z-index")<2){
		click-=1;
		$("#counter").html("Number of hidden animals left to find: "+click);
		alert("Cheers! You found a hidden animal!")
		}
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

