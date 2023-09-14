<template>
  <div id="map">
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import L from 'leaflet';
import { useRouter } from 'vue-router';

//import axios from 'axios';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

/*import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'*/

import markerUrl from '../assets/marker.png'
import markerShadowUrl from '../assets/markerShadow.png'

const results = inject('records');
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


const addRecordMarker = (record) => {
  const marker = L.marker([parseFloat(record.Lat.value), parseFloat(record.Long.value)], { icon: markerIcon });
  const popupContent = customPopup(record);
  marker.addTo(markersLayer).bindPopup(popupContent).on("popupopen", () => {
    setTimeout(() => {
      const customLeafletPopup = document.querySelector(".custom-leaflet-popup");
      if (customLeafletPopup) {
        customLeafletPopup.addEventListener("click", () => handlePopupClick(record));
      }
    }, 200); // Delay needed to avoid adding while prev popup still there
  });
}

function customPopup(record) {
  return `
    <div class="custom-leaflet-popup" style="cursor: pointer; box-shadow: 0 3px 14px rgba(0,0,0,0.4); overflow: clip; display: flex;
    flex-direction: column; border-radius: 8px; padding: 8px; width: 150px;
    height: 250px; background-color: #1a1c1d;">
      <div style="overflow:clip; height:100%; 
      background-color: #1a1c1d;">
        <img src="${record.Image.value}" alt="" 
        style="width: 100%; height: 100%; overflow: clip;
        object-fit: cover;border-radius: 8px;">
      </div>
      <div style="word-wrap:break-word; padding-top:8px;  overflow: hidden;
      display: flex; align-items: center; height:50px">
        <div style="overflow: hidden;
            -webkit-line-clamp: 2; display: -webkit-box;
            -webkit-box-orient: vertical; text-overflow: ellipsis;
            white-space: normal;">${record.Title.value}</div>
      </div>
    </div>
    `
}

const handlePopupClick = (record) => {
  const currentRoute = router.currentRoute.value;
  const queryParams = { ...currentRoute.query, record: record.uniqueId.value };
  router.push({ path: currentRoute.path, query: queryParams });
};

onMounted(async () => {
  // Create and initialize the map
  map = L.map('map', {
    minZoom: 5
  }).setView([47, 1], 5);

  // Add a tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  markersLayer = L.markerClusterGroup();

  for (const result of results.value) {
    if (result.Lat && result.Long) {
      addRecordMarker(result);
    }
  }
  map.addLayer(markersLayer);
})
</script>


<style >

.leaflet-container a.leaflet-popup-close-button {
  border-radius: 50%;
  top: 2px;
  right: 2px;
  background: #1a1c1d;
}

.leaflet-control-zoom.leaflet-bar.leaflet-control a:hover {
  background-color: #1a1c1d;
  background-color: #3a3a3a;
  border-bottom: 1px solid #858585;
}

.leaflet-control-zoom.leaflet-bar.leaflet-control a {
  background-color: #1a1c1d;
  background-color: #181818;
  border-bottom: 1px solid #858585;
  color: rgb(247, 247, 247);
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
  background-color: #1a1c1d
}

</style>

<style scoped>
#map {
  height: 100%;
	width: 100%;
	z-index: 0;
}
</style>
