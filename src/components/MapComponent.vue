<template>
  <div id="map">
    <div id="markers-container"></div>
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import L from 'leaflet';
import { useRouter } from 'vue-router';

//import axios from 'axios';

import 'leaflet/dist/leaflet.css';

/*import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'*/

import markerUrl from '../assets/marker.png'
import markerShadowUrl from '../assets/markerShadow.png'

const results = inject('records');
const router = useRouter();
//const name= "Map"


const markerIcon = L.icon({
  iconUrl: markerUrl,
  shadowUrl: markerShadowUrl,

  iconSize: [35, 39], // size of the icon
  shadowSize: [30, 30], // size of the shadow
  iconAnchor: [17.5, 39], // point of the icon which will correspond to marker's location
  shadowAnchor: [10, 30],  // the same for the shadow
  popupAnchor: [0.5, 2] // point from which the popup should open relative to the iconAnchor
});

const props = defineProps({
  markers: {
    type: Array,
    required: false,
    default: () => []
  }
})

// Create and initialize the map
let map = null

/*function addMarker  (latitude, longitude)  {
   const marker = L.marker([latitude, longitude]);
   props.markers.push(marker);
   console.log(props.markers)
   marker.addTo(map);
}*/

const addMarker = (record) => {
  const marker = L.marker([parseFloat(record.Lat.value), parseFloat(record.Long.value)], { icon: markerIcon });
  props.markers.push(marker);
  const popupContent = customPopup(record);
  marker.addTo(map).bindPopup(popupContent).on("popupopen", () => {
    setTimeout(() => {
      const customLeafletPopup = document.querySelector(".custom-leaflet-popup");
      if (customLeafletPopup) {
        customLeafletPopup.addEventListener("click", () => handlePopupClick(record));
      }
    }, 200); // Delay needed to avoid adding while prev popup still there
  });
  /*const customLeafletPopup = document.querySelector(".custom-leaflet-popup");
    customLeafletPopup.addEventListener("click", () => handlePopupClick(record));
  });*/
  /*marker.addTo(map).bindPopup(popupContent);
  marker.on("popupopen", (event) => {
    const customLeafletPopup = event.popup;
    const contentElement = customLeafletPopup._contentNode;
    contentElement.addEventListener("click", () => handlePopupClick(record));
  });*/
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
  map = L.map('map').setView([47, 15], 5);

  // Add a tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  /*for (const result of results.value) {
    if (result.SpatialLabel) {
      const locationName = result.SpatialLabel.value
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${locationName}&format=json&limit=1`);
        console.log(response)
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          const latitude = parseFloat(lat);
          const longitude = parseFloat(lon);
          console.log(lat +" "+ lon)
          addMarker(latitude, longitude);
          console.log("marker added at" + locationName)
        }
      } catch (error) {
        console.error(`Error fetching coordinates for ${locationName}:`, error);
      }
    }
  }*/

  for (const result of results.value) {
    if (result.Lat && result.Long) {
      addMarker(result);
    }
  }
})
</script>


<style >
#map {
  height: 100%;
}

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

/*#markers-container {
position: absolute;
z-index: 1000;
pointer-events: none;
}*/
</style>

<style scoped>
#map {
  height: 100%;
}

/*#markers-container {
position: absolute;
z-index: 1000;
pointer-events: none;
}*/
</style>
