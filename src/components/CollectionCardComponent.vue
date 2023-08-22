<template>
    <router-link class="card" :to="{
                name: 'collectionrecords',
                params: { collection: collection },
            }">
        <div class="card-image">
            <img v-if="image" :src="image" @error="failedToLoadImage" alt="Card Image">
        </div>
        <div class="card-text" >
            <div class="title" :title="collection" v-if="collection">{{ collection }}</div>
        </div>
    </router-link>
</template>
<script setup>

const { collection, image } = defineProps(['collection', 'image']);

const failedToLoadImage = (event) => {
    event.target.src = '/src/assets/iconV.png';
}

</script>
  
<style scoped>
.card {
    text-decoration: none;
    overflow: clip;
    border-radius: 8px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 350px;

    background-color: #181818;
    background-color: #1a1c1d;

    box-shadow: 0px 0px 5px rgb(10, 10, 10);
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;

}

.card:hover {
    /*opacity: .6;*/
    filter: brightness(1.4);
    transition: 0.2s ease-in-out;
}

.card .card-image {
    height: 100%;
    width: 100%;
    overflow: clip;
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
    transition: 0.2s ease-in-out;
}

.card .card-text {
    color: rgb(247, 247, 247);
    font-weight: 500;
    font-family: "Overpass", sans-serif;
    font-size: 0.97rem;

    padding: 10px;
    word-wrap: break-word;

    display: flex;
    padding-top: 6px;
    align-items: center;
    line-height: 1.3rem;
    height: 65px;
    overflow: hidden;

}

.card .title {
    max-height: 100%;
    overflow: auto;

    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;

}

</style>
  