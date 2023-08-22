<template>
    <a class="card" :href="record.item.value" target="_blank" rel="noopener noreferrer">
        <div class="card-image">
            <img v-if="record.Image" :src="record.Image.value" @error="failedToLoadImage" alt="Card Image">
        </div>
        <div class="card-text" :title="record.Title.value">
            <div class="title" v-if="record.Title">{{ record.Title.value }} </div>
            <!--<div class="params">
                <p v-if="record.DataProvider">Institution: {{ record.DataProvider.value }}</p>
                <p v-if="record.Date">Date: {{record.Date.value }}</p>
                <p v-if= "record.description">Description: {{ record.description.value }}</p>
            </div>-->
        </div>
    </a>
</template>
  
<script setup>
//just the card, no popup

/*const props = defineProps({
record: {
  type: Object,
  required: true,
  default: () => null
}
})*/

const { record } = defineProps(['record']);

const failedToLoadImage = (event) => {
    event.target.src = '/src/assets/iconV.png';
}
</script>
  
<style scoped>
.card {
    overflow: clip;
    border-radius: 8px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 350px;
    text-decoration: none;

    color: rgb(247, 247, 247);
    background-color: #181818;
    background-color: #18191b;
    background-color: rgba(167, 167, 167, 0.1);
    background-color: #232425;
    background-color: #1e1f20;
    background-color: #1a1c1d;


    box-shadow: 0px 0px 5px rgb(10, 10, 10);
    /*box-shadow: 0px 0px 10px rgb(61, 61, 61);*/
}

.card:hover {
    /*opacity: .6;*/
    filter: brightness(1.5);
    transition: 0.2s ease-in-out;
}

.card .card-image {
    overflow: clip;
    height: 100%;
    width: 100%;
}

.card-image img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 10px solid transparent;
}

.card-image img:hover {
    border-radius: 0px;
    border: 0px solid transparent;
    transition: 0.3s ease-in-out;
}

.card .card-text {
    padding: 10px;
    word-wrap: break-word;
    max-height: 25%;

    display: flex;
    align-items: center;
    padding-top: 6px;
    line-height: 1.3rem;
    height: 65px;
    overflow: hidden;

}

.card-text .title {
    max-height: 100%;
    overflow: auto;

    font-family: "Overpass", sans-serif;
    font-weight: 500;
    font-size: 0.97rem;

    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
}

.card-text .params {
    font-size: 0.90rem;
}

.params p {
    font-family: "Overpass", sans-serif;
}</style>
  