function initMap() {
  var uluru = { lat: -22.208912, lng: -54.764962 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru
  });

  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">IFMS</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Olá</b>, IFMS,' +
    '(visitado Março 31, 2019).</p>' +
    '</div>' +
    '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'IFMS (Ensino de qualidade)'
  });
  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
}