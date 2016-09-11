var apiKey = "laktuo6dkdd22o5m";
var animalname = "";

$(document).ready(function(){
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
$("img").click(function(){
	animalname = $(this).attr('id');
    modal.style.display = "block";
	openCity(event, 'Description');
	getArticle();
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
	$("#Article").html("<h3>" + "Article" + "</h3>" + "<p>" + "loading..." +"</p>");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		$("#Article").html("<h3>" + "Article" + animalname + "</h3>" + "<p>" + "loading..." +"</p>");
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



