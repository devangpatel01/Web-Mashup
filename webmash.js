// Put your zillow.com API key here
/* Devang Patel uta id: 1001352106*/
var username = "devangpatel01";
var request = new XMLHttpRequest();
var infowindow;
var marker;
var geocoder;
var map;
var Address;
var lat;
var lng;
var xml;
var temperature;
var bn;
var c;
//initMap() which initiates map to a location
function initMap() {
    var mapchar = {
		center:new google.maps.LatLng(32.75, -97.13),
		zoom:17
	}
	//initialize map
	map = new google.maps.Map(document.getElementById("map"), mapchar);
	geocoder = new google.maps.Geocoder;
	infowindow = new google.maps.InfoWindow;
	//Initialize a mouse click event on map which then calls reversegeocode function
    google.maps.event.addListener(map, 'click', function(event) {
			//alert(event.latLng);
		lat = event.latLng.lat()
        lng = event.latLng.lng()
		request.onreadystatechange = reversegeocode(geocoder,map,infowindow,event.latLng);
		
	});
	
}



// Reserse Geocoding 
function reversegeocode(geocoder,map,infowindow,latlangclicked) {
        //alert(latlangclicked);
  //get the latitude and longitude from the mouse click and get the address.
  geocoder.geocode({'location': latlangclicked}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        Address = results[0].formatted_address;
		if (marker) {
        marker.setMap(null);
        }
		marker = new google.maps.Marker({
          position: latlangclicked,
          map: map
        });
		request.onreadystatechange = sendRequest();
        /* infowindow.setContent(Address);
        infowindow.open(map, marker); */
	  } else {
			window.alert('No results found');
		}
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
    
      
  //call geoname api asynchronously with latitude and longitude 
  //request.onreadystatechange = sendRequest();
}// end of geocodeLatLng()



function sendRequest() {
    request.onreadystatechange = displayResult();
    request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username);
    request.withCredentials = false;
    request.send(null);
}

function displayResult() {
    if (request.readyState == 4) {
        xml = request.responseXML.documentElement;
        temperature = xml.getElementsByTagName("temperature")[0].innerHTML;
		bn = xml.getElementsByTagName("windSpeed")[0].innerHTML;
		c = xml.getElementsByTagName("clouds")[0].innerHTML;
	    document.getElementById('tx1').innerHTML = document.getElementById('tx1').innerHTML +"postal address:"+Address+" Temperature"+temperature+"\n";
		document.getElementById('tx1').innerHTML = document.getElementById('tx1').innerHTML +" windSpeed:"+bn+" clouds:"+c+"\n";
		infowindow.setContent(Address+" Temperature"+temperature+" clouds:"+c+" windSpeed:"+bn);
		infowindow.open(map, marker);
		
    }
}

function cleartextarea(){
    document.getElementById('tx1').innerHTML = "";
}  