<template>
  <div id="map">
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import { useRouter } from 'vue-router';

//import axios from 'axios';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

/*import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'*/

import logoURL from '../assets/iconV.png'
import markerUrl from '../assets/marker.png'
import markerShadowUrl from '../assets/markerShadow.png'

const { records } = defineProps(['records']);
const router = useRouter();


const markerIcon = L.icon({
  iconUrl: markerUrl,
  shadowUrl: markerShadowUrl,

  iconSize: [35, 39], // size of the icon
  shadowSize: [30, 30], // size of the shadow
  iconAnchor: [17.5, 39], // point of the icon which will correspond to marker's location
  shadowAnchor: [10, 30],  // the same for the shadow
  popupAnchor: [0.5, 2] // point from which the popup should open relative to the iconAnchor
});


let map = null
let markersLayer = null;


function addRecordMarker (record, layer) {
  try {
    const marker = L.marker([parseFloat(record.Lat.value), parseFloat(record.Long.value)], { icon: markerIcon });
    const popupContent = customPopup(record);
    marker.addTo(layer).bindPopup(popupContent).on("popupopen", () => {
      setTimeout(() => {
        const customLeafletPopup = document.querySelector(".custom-leaflet-popup");
        customLeafletPopup.addEventListener("click", () => handlePopupClick(record));
      }, 200); // Delay needed to avoid adding event while previous popup still open
    });
  } catch (error) {
      console.error('Error adding the marker:', error);
      return;
    }
}

function customPopup(record) {
  const Title = ref ("Untitled Record")
  const Image = ref(logoURL)
  if (record.Title){
    Title.value = record.Title.value
  }
  if (record.Image){
    Image.value = record.Image.value
  }
  return `
    <div class="custom-leaflet-popup">
      <div class="custom-popup-image">
        <img src="${Image.value}" alt="">
      </div>
      <div class="custom-popup-text" >
        <div class="custom-popup-text-title">${Title.value}</div>
      </div>
    </div>
    `
}

/*function customPopup(record) {
  const Title = ref ("Untitled Record")
  const Image = ref(logoURL)
  if (record.Title){
    Title.value = record.Title.value
  }
  if (record.Image){
    Image.value = record.Image.value
  }
  return `
    <div class="custom-leaflet-popup" style="cursor: pointer; box-shadow: 0 3px 14px rgba(0,0,0,0.4);
    overflow: hidden; display: flex;
    flex-direction: column; border-radius: 8px; padding: 8px; width: 150px;
    height: 250px; background-color: #1a1c1d;">
      <div style="overflow:hidden; height:100%; 
      background-color: #1a1c1d;">
        <img src="${Image.value}" alt="" 
        style="width: 100%; height: 100%;   overflow: hidden;
        object-fit: cover;border-radius: 8px;">
      </div>
      <div style="word-wrap:break-word; padding-top:8px;  overflow: hidden;
      display: flex; align-items: center; height:50px">
        <div style="overflow: hidden; font-weight:500;
            -webkit-line-clamp: 2; display: -webkit-box;
            -webkit-box-orient: vertical; text-overflow: ellipsis;
            white-space: normal;">${Title.value}</div>
      </div>
    </div>
    `
}*/

function handlePopupClick (record) {
  const currentRoute = router.currentRoute.value;
  const queryParams = { ...currentRoute.query, record: record.uniqueId.value };
  router.push({ path: currentRoute.path, query: queryParams });
};

onMounted(async () => {
  
  // Create and initialize the map
  map = L.map('map', {
    minZoom: 5,
    zoomControl: true
  }).setView([47, 1], 5);
  map.zoomControl.setPosition('topright');

  // Add a tile layer to the map (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add markers to cluster then add the cluster to the map
  markersLayer = L.markerClusterGroup();
  for (const result of records) {
    if (result.Lat && result.Long) {
      addRecordMarker(result, markersLayer);
    }
  }
  map.addLayer(markersLayer);

  // Add geocoder to the map
  L.Control.geocoder({
    defaultMarkGeocode: false, position: 'topleft', 
    placeholder: "Search location"
  }).on('markgeocode', function (markedArea) {
    var center = markedArea.geocode.center;
    var bbox = markedArea.geocode.bbox;
    map.setView(center, map.getBoundsZoom(bbox));
  }).addTo(map);
})

</script>


<style>
.leaflet-control-zoom.leaflet-bar.leaflet-control a:hover {
  background-color: #3a3a3a;
  border-bottom: 1px solid #858585;
}

.custom-leaflet-popup{
  cursor: pointer; 
  box-shadow: 0 3px 14px rgba(0,0,0,0.4);
  overflow: hidden; 
  display: flex;
  flex-direction: column; 
  border-radius: 8px; 
  padding: 8px; 
  width: 150px;
  height: 250px; 
  background-color: #1a1c1d;
}

/*.custom-leaflet-popup:hover{
  filter: brightness(1.4);
  transition: 0.0s ease-in-out;
}*/

.custom-leaflet-popup .custom-popup-image{
  overflow:hidden; 
  height:100%
}

.custom-leaflet-popup .custom-popup-image img{
  width: 100%; 
  height: 100%; 
  overflow: hidden;
  object-fit: cover;
  border-radius: 8px;
}

.custom-leaflet-popup .custom-popup-text {
  word-wrap:break-word; 
  padding-top:8px;  
  overflow: hidden;
  display: flex; 
  align-items: center; 
  height:50px
}

.custom-leaflet-popup .custom-popup-text .custom-popup-text-title{
  overflow: hidden; 
  font-weight:500;
  -webkit-line-clamp: 2; 
  display: -webkit-box;
  -webkit-box-orient: vertical; 
  text-overflow: ellipsis;
  white-space: normal;
}

.leaflet-control-zoom.leaflet-bar.leaflet-control a {
  background-color: #181818;
  border-bottom: 1px solid #858585;
  color: rgb(247, 247, 247);
}

.leaflet-container a.leaflet-popup-close-button {
  border-radius: 50%;
  top: 2px;
  right: 2px;
  background: #1a1c1d;
}

.leaflet-popup-content-wrapper {
  background-color: transparent;
  box-shadow: none;
  padding: 0;
}

.leaflet-popup-content {
  margin: 0px;
}

.leaflet-popup-tip {
  background-color: #1a1c1d;
}

.leaflet-control-geocoder-alternatives li:hover {
  background-color: #3a3a3a;
}

.leaflet-control-geocoder-alternatives li a {
  color: #969696;
}

.leaflet-control-geocoder-alternatives li a .leaflet-control-geocoder-address-context {
  color: #969696;
}

.leaflet-control-geocoder {
  background-color: #181818;
}

.leaflet-touch .leaflet-control-geocoder-icon {
  width: 34px;
  height: 34px;
}

.leaflet-control-geocoder-icon {
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12.2 13l3.4 6.6c.6 1.1 2.5-.4 2-1.2l-4-6.2z' fill='rgb(247, 247, 247)' stroke='rgb(247, 247, 247)'/%3E%3Ccircle cx='10.8' cy='8.9' r='3.9' fill='none' stroke='rgb(247, 247, 247)' stroke-width='1.5'/%3E%3C/svg%3E");
}

.leaflet-control-geocoder-form input::placeholder {
  color: #adadad;
}
</style>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
