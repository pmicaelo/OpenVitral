<template>
  <div v-if="loaded" class="app">
    <!-- Navbar -->
    <NavbarComponent />
    <!-- Content -->
    <router-view v-slot="{ Component , route}">
      <Transition :name="route.meta.transition" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </router-view>
  </div>
  <LoadingScreenComponent v-else />
</template>

<script setup>
import LoadingScreenComponent from './components/LoadingScreenComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import { onMounted, ref, provide, readonly } from 'vue';
import axios from 'axios';

const records = ref([]);
const loaded = ref(true);
provide('records', readonly(records));

onMounted(async () => {
  loaded.value = false;
  records.value = await queryAll();
  loaded.value = true;
});

/*await axios.get("https://corpusvitrearum.de/id/F4435/about.json")
  .then(response => {
    const data = response.data;

    // Extract latitude and longitude
    const latitude = data['exif:GPSLatitude'];
    const longitude = data['exif:GPSLongitude'];

    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });*/

async function queryEndpoint(sparqlEndpoint, sparqlEndpointQuery) {
  try {
    const response = await axios.get(sparqlEndpoint, {
      params: {
        query: sparqlEndpointQuery,
        format: 'json',
      },
    });
    console.log(response.data.results.bindings);
    return response.data.results.bindings;
  } catch (error) {
    console.error('Error querying the endpoint:', error);
    return []
  }
}

async function queryEuropeanaEndpoint() {
  return await queryEndpoint('https://sparql.europeana.eu/', `
    PREFIX dc: <http://purl.org/dc/elements/1.1/> 
    PREFIX edm: <http://www.europeana.eu/schemas/edm/> 
    PREFIX ore: <http://www.openarchives.org/ore/terms/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX dcterms: <http://purl.org/dc/terms/> 
    PREFIX wgs84_pos: <http://www.w3.org/2003/01/geo/wgs84_pos#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 

    SELECT DISTINCT (SAMPLE(?item) AS ?item) (SAMPLE(?DataProvider) AS ?DataProvider) (SAMPLE(?Title) AS ?Title) (SAMPLE(?Description) AS ?Description) (SAMPLE(?Image) AS ?Image) (SAMPLE(?Date) AS ?Date) (SAMPLE(?Provider) AS ?Provider) (SAMPLE(?Creator) AS ?Creator) (SAMPLE(?Spatial) AS ?Spatial) (SAMPLE(?Lat) AS ?Lat) (SAMPLE(?Long) AS ?Long) (SAMPLE(?SpatialLabel) AS ?SpatialLabel)
    WHERE { 
      ?item ?prop ?subject . 

      OPTIONAL { ?item dc:title ?Title . }
      OPTIONAL { ?item dc:description ?Description . }
      OPTIONAL { ?item dc:date ?Date . } 
      OPTIONAL { ?item dc:creator ?Creator. } 
      OPTIONAL { ?item dcterms:spatial ?Spatial. OPTIONAL {?Spatial wgs84_pos:lat ?Lat.
       ?Spatial wgs84_pos:long ?Long. } OPTIONAL{?Spatial skos:prefLabel ?SpatialLabel}} 


      ?item ore:proxyIn ?Aggregation .

      ?Aggregation edm:dataProvider ?DataProvider . 
      ?Aggregation edm:object ?Image .
      OPTIONAL { ?Aggregation edm:provider ?Provider . } 

      FILTER(?subject IN ("stained glass", "Stained Glass",
        "Stained glass", "Glasmalerei", "Glassmaleri", "Витраж", "Вітраж", "Lasimaalaus",
        "Vitral", "Стъклопис", "Vitražas", "Vitrāža", "Vitraj", "Vitrail", "Üvegfestés",
        "Vitraž", "Vitráž (chrám)", "Gloine dhaite", "Vitrall", "Glasmålning",
        "스테인드 글라스", "Vidreira gótica", "Υαλογραφία", "Vetrata", "花窗玻璃",
        "Beirate", "زجاج معشق", "Gwydr lliw", "ステンドグラス", "Witraż", "Vitraliu",
        "Gebrandschilderd glas"
      )) 
    } 
    GROUP BY ?item
    LIMIT 10000
    `)
}

/*async function querynNFDI4CultureEndpoint() {
  return await queryEndpoint('https://nfdi4culture.de/sparql', `
      PREFIX schema: <http://schema.org/>
      PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
  
      SELECT ?item ?Title ?Height ?Width ?DataProvider ?Image ?Coords
      WHERE {
        ?item schema:height ?Height ;
                schema:width ?Width;
                schema:name ?Title;
                schema:contentLocation ?DataProvider ;
                schema:contentUrl ?Image ;
                schema:keywords ?Coords
        FILTER(contains(str(?item), "corpusvitrearum") && contains(str(?Coords),"geonames"))
      }
      `)
}*/

async function queryAll() {
  //records.value = [];
  const all = [];
  all.push(...await queryEuropeanaEndpoint())
  //all.push(...await querynNFDI4CultureEndpoint())
  //records.value = all;
  all.map((element, index) => {
    element.uniqueId = { type: 'literal', value: `record${index}` };
    return element;
  });
  console.log(all);
  return all;
}


</script>

<style >
:root {
  --primary: #f88c27;
  --grey: #64748b;
  --dark: #181818;
  --dark-alt: #313336;
  --light: #fafafa;
  --logo-font: #f2f7fc;
  --bg: #303135;
  --navbar-height: 55px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Overpass", sans-serif;
  color: rgb(247, 247, 247);
}

body {
  background: var(--dark-alt);
  background: rgb(41, 41, 41);
  background: #0c0c0c;
  background: #0f0f0f;

  /*overflow: clip;/*prevent scrollbar from appearing on nav when super small height*/
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
  flex-direction: column;
  overflow: clip;
  height: 100vh;
}

.app main {
  
  z-index: 0;
  height: 100%;
  overflow: auto;
  /*behind navbar (index 1)*/
  flex: 1 1 0;
  padding: 2rem 2rem;

  /*position: relative;
  top: var(--navbar-height);
  z-index: 0;
  max-height: calc(100% - var(--navbar-height));*/
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Target the scrollbar handle (thumb) */
::-webkit-scrollbar-thumb {
  background-color: #6e6e6e;
  border-radius: 10px;
}

/* Target the scrollbar handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a0;
}

.slide-left-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.slide-left-enter-active{
  transition: all 0.4s ease-out;
}

.slide-left-leave-to{
  opacity:0;
  transform: translateX(-100px)
}

.slide-left-leave-active{
  transition: all 0.2s ease-in;
}

.slide-right-enter-from{
  opacity: 0;
  transform: translateX(-100px);
}
.slide-right-enter-active{
  transition: all 0.4s ease-out;
}

.slide-right-leave-to{
  opacity:0;
  transform: translateX(100px)
}

.slide-right-leave-active{
  transition: all 0.2s ease-in;
}

.slide-in-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-in-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-in-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.slide-in-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.slide-out-enter-active,
.slide-out-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-out-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.slide-out-enter-from{
  opacity: 0;
  transform: scale(1.1);
}


</style>
