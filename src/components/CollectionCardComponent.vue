<template>
    <router-link class="card" :to="{
        name: 'collectionrecords',
        params: { collection: collection },
    }">
        <div class="card-image">
            <img v-for="(img, index) in getImages(records)" :key="index" :src="img" @error="failedToLoadImage"
                alt="Card Image" />
            <div class="record-number-indicator">{{records.length}}</div>
        </div>
        <div class="card-text">
            <div class="title" :title="collection" v-if="collection">{{ collection }}</div>
        </div>
    </router-link>
</template>
<script setup>

import logoURL from '../assets/iconV.png'


const { collection, records } = defineProps(['collection', 'records']);

const failedToLoadImage = (event) => {
    event.target.src = logoURL;
}

function getImages(records) {
    const images = []
    while (images.length < 3) {
        for (let i = 0; i < 3 && records[i] && images.length < 3; i++) {
            if(records[i].Image){ images.push(records[i].Image.value);}
            else {images.push(logoURL)}
        }
    }
    return images;
}

</script>
  
<style scoped>
.card {
    text-decoration: none;
    overflow: hidden;
    /*overflow: clip;*/
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    /*height: 235px;
    width: 350px;*/
    
    width: 100%;
    aspect-ratio: 70/47;
    
    max-width: 540px;

    padding: 10px;
    padding-bottom: 0;
    background-color: #181818;
    background-color: #1a1c1d;

    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
}

.card:hover {
    filter: brightness(1.4);
    transition: 0.2s ease-in-out;
}

.card .card-image {
    border-radius: 8px;
    overflow: hidden;

    /*overflow: clip;*/
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}

.card-image img {
    overflow: hidden;

    /*overflow: clip;*/
    width: 33.3%;
    height: 100%;
    object-fit: cover;
}

.record-number-indicator {
    position: absolute;
    bottom: 3px;
    right: 3px;

    border-radius: 50%;
    text-decoration: none;

    background-color: rgba(42, 42, 42, .8);

    height: 35px;
    width: 35px;

    font-size: 13.5px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card .card-text {
    padding-bottom: 5px;
    padding-top: 5px;
    color: rgb(247, 247, 247);
    font-weight: 500;
    font-family: "Overpass", sans-serif;
    font-size: 15px;

    word-wrap: break-word;

    display: flex;
    align-items: center;
    line-height: 21px;
    height: 75px;
    overflow: hidden;
}

.card .title {
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}
</style>
  