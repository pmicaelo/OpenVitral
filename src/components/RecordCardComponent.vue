<template>
    <div class="card" style="cursor: pointer">
        <div class="card-image">
            <img v-if="record.Image" :src="record.Image.value" loading="lazy" @error="failedToLoadImage" alt="Card Image">
        </div>
        <div class="card-text">
            <div v-if="record.Title" class="title" :title="record.Title.value">{{ record.Title.value }} </div>
            <div v-else class="title" title="Untitled Record">Untitled Record</div>
        </div>
    </div>
</template>
  
<script setup>

import logoURL from '../assets/iconV.png'

/*const props = defineProps({
record: {
  type: Object,
  required: true,
  default: () => null
}
})*/

const { record } = defineProps(['record']);

const failedToLoadImage = (event) => {
    event.target.src = logoURL;
}


</script>
  
<style scoped>
.card {
    text-decoration: none;
    overflow: clip;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-radius: 8px;
    
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 350px;
    /*aspect-ratio: 4/7;*/
    background-color: #181818;
    background-color: #1a1c1d;
    
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
}

.card:hover {
    /*opacity: .6;*/
    filter: brightness(1.4);
    transition: 0.2s ease-in-out;
}

.card .card-image {
    overflow: clip;
    height: 100%;
    width: 100%;
}

.card-image img {
    overflow: clip;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 10px solid transparent;
}

.card:hover .card-image img {
    border-radius: 0px;
    border: 0px solid transparent;
    transition: 0.25s ease-in-out;
}

.card .card-text {
    color: rgb(247, 247, 247);

    font-family: "Overpass", sans-serif;
    font-weight: 500;
    font-size: 15.5px;

    padding: 10px;
    word-wrap: break-word;

    display: flex;
    align-items: center;
    padding-top: 6px;
    line-height: 21px;
    height: 65px;
    overflow: hidden;
}

.card-text .title {
    overflow: auto;

    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}
</style>
  