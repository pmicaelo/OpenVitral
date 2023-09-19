<template>
    <!--<Teleport to="#popupp" v-if="record">-->
    <div class="modal" @click="goBack">
        <div class="modal-content" @click.stop>
            <div class="close-button" title="Close" @click="goBack" style="cursor: pointer">
                <span class="material-symbols-rounded">close</span>
            </div>
            <div v-if="record.Image" class="modal-image">
                <img :src="record.Image.value" @error="failedToLoadImage" alt="Modal Image">
                <a class="open-image-button" title="Open image in a new tab" :href="record.Image.value" target="_blank"
                    rel="noopener noreferrer">
                    <span class="material-symbols-rounded">search</span>
                </a>
                <div v-if="!fav" class="add-fav-button" title="Add record to favourites" @click="toggleFav"
                    style="cursor: pointer">
                    <span class="material-symbols-rounded">star</span>
                </div>
                <div v-else class="remove-fav-button" title="Remove record from favourites" @click="toggleFav"
                    style="cursor: pointer">
                    <span class="material-symbols-rounded">star</span>
                </div>
            </div>
            <div style="word-wrap: break-word; margin-top:15px ;text-align: center;" v-if="record.Title">
                <span style="color: rgb(247, 247, 247); font-weight:500 ; font-size: 17.5px;">{{ record.Title.value
                }}</span>
            </div>
            <ModalTextVWComponent :record="record" v-if="isVitralWiki()" />
            <ModalTextGenericComponent :record="record" v-else />
        </div>
    </div>
    <!--</Teleport>-->
</template>
  
<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ModalTextVWComponent from './ModalTextVWComponent.vue'
import ModalTextGenericComponent from './ModalTextGenericComponent.vue'

import logoURL from '../assets/iconV.png'


const router = useRouter();
const { record } = defineProps(['record']);

const failedToLoadImage = (event) => {
    event.target.src = logoURL;
}

function isVitralWiki() {
    return record.uniqueId.value.includes("vitralwiki");
}

const fav = ref((JSON.parse(localStorage.getItem('favourites')) || []).includes(record.uniqueId.value))

const toggleFav = () => {
    const currentFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isRecordFavourite = currentFavourites.includes(record.uniqueId.value);
    if (isRecordFavourite) {
        const updatedFavourites = currentFavourites.filter(id => id !== record.uniqueId.value);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    } else {
        currentFavourites.push(record.uniqueId.value);
        localStorage.setItem('favourites', JSON.stringify(currentFavourites));
    }
    window.dispatchEvent(new CustomEvent('updatedFav', {
        detail: {
            newFavourites: JSON.parse(localStorage.getItem('favourites'))
        }
    }));
    fav.value = !fav.value
};

const goBack = () => {
    //router.go(-1)
    /*const currentPathSegments = router.currentRoute.value.path.split('/');
    const newPathSegments = currentPathSegments.slice(0, -1);
    const newRoutePath = newPathSegments.join('/');
    router.push(newRoutePath);*/ //this is for using record as a param and not query
    router.push(router.currentRoute.value.path);
};
</script>
  
<style scoped>
.modal {
    overflow: clip;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    max-width: min(750px, 80%);
    min-width: min(500px, 80%);

    max-height: 95%;

    overflow: auto;

    display: flex;
    flex-direction: column;

    position: absolute;
    padding: 30px;
    padding-bottom: 20px;

    background-color: #181818;

    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
}

.modal-image {
    height: 450px;
    align-self: center;
    position: relative;
}

.modal-image img {
    height: 450px;
    width: 100%;
    border-radius: 15px;
    object-fit: cover;
}

.open-image-button {
    position: absolute;
    bottom: 5px;
    right: 5px;

    border-radius: 10px;
    text-decoration: none;

    background-color: rgba(42, 42, 42, .8);

    height: 33px;
    width: 33px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.remove-fav-button,
.add-fav-button {
    position: absolute;
    bottom: 5px;
    right: 45px;

    border-radius: 10px;

    background-color: rgba(42, 42, 42, .8);

    height: 33px;
    width: 33px;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
}

.open-image-button .material-symbols-rounded {
    font-variation-settings:
        'FILL' 0,
        'wght' 500,
        'GRAD' 0,
        'opsz' 48;
    font-size: 25px;
    color: rgb(247, 247, 247);
}

.add-fav-button .material-symbols-rounded {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
    font-size: 28px;
    color: rgb(247, 247, 247);
}

.remove-fav-button .material-symbols-rounded {
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
    font-size: 28px;
    color: rgb(243, 202, 17);
}


.open-image-button:hover,
.remove-fav-button:hover,
.add-fav-button:hover {
    background-color: rgba(83, 83, 83, 0.8);
    transition: 0.1s ease-in-out;
}

.close-button {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #0e0e0e;
    display: flex;
    justify-content: center;
    align-items: center;
}

.close-button:hover {
    background-color: var(--dark-alt);
    transition: 0.1s ease-in-out;
}

.close-button .material-symbols-rounded {
    font-variation-settings:
        'FILL' 0,
        'wght' 500,
        'GRAD' 0,
        'opsz' 48;
    color: rgb(247, 247, 247);
    font-size: 25px;
}
</style>