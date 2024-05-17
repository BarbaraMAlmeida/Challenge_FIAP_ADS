let map;
let service;
let infowindow;
let paramlat = -20.230886967979405;
let paramlgn = -44.39787984140217;
let selectToll = document.getElementById('admin_selection').value;

window.addEventListener('load', () => {
    verifyToll();
    initMap();
   
    document.getElementById('admin_selection').addEventListener('change', () => {
        verifyToll()
        initMap();
    });

});

function verifyToll() {
    selectToll = document.getElementById('admin_selection').value;

    if(selectToll.indexOf("Fernão") !== -1) {
        paramlat = -20.230886967979405;
        paramlgn = -44.39787984140217;
    } else {
        paramlat = -23.15064918144046;
        paramlgn = -46.96079732002399;
    }
}

function initMap() {
  const locale = new google.maps.LatLng(paramlat, paramlgn);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: locale,
    zoom: 15,
  });

  const request = {
    query: `${selectToll}`,
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      results.forEach(createMarker);
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map, marker);
  });
}
