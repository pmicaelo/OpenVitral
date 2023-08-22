<template>
    <!--<Teleport to="#popupp" v-if="record">-->
    <div class="modal" v-if="record" @click="goBack">
        <div class="modal-content" v-if="record" @click.stop>
            <div class="close-button" title="Close" @click="goBack" style="cursor: pointer">
                <span class="material-symbols-rounded">close</span>
            </div>
            <div v-if="record.Image" class="modal-image">
                <img :src="record.Image.value" @error="failedToLoadImage" alt="Modal Image">
                <a class="open-image-button" title="Open image in a new tab" :href="record.Image.value" target="_blank"
                    rel="noopener noreferrer">
                    <span class="material-symbols-rounded">search</span>
                </a>
            </div>
                <div style=" margin-top:15px ;text-align: center;" v-if="record.Title">
                    <span style= "color: rgb(247, 247, 247); font-weight:500 ; font-size: 17.5px;">{{ record.Title.value }}</span>
                </div>
            <div class="modal-text">
                <!--<div class="param" v-if="record.Title">
                    <span class="param-name">Title</span>
                    <span class="param-value">{{ record.Title.value }}</span>
                </div>-->
                <div class="param" v-if="record.Description">
                    <span class="param-name">Description</span>
                    <span class="param-value">{{ record.Description.value }}</span>
                </div>
                <div class="param" v-if="record.DataProvider">
                    <span class="param-name">Institution</span>
                    <span class="param-value">{{ record.DataProvider.value }}</span>
                </div>
                <div class="param" v-if="record.Date">
                    <span class="param-name">Date</span>
                    <span class="param-value">{{ record.Date.value }}</span>
                </div>
                <div class="param" v-if="record.Spatial">
                    <span class="param-name">Location</span>
                    <span v-if="record.SpatialLabel" class="param-value">{{ record.SpatialLabel.value }}</span>
                    <span v-else class="param-value">{{ record.Spatial.value }}</span>
                </div>
                <div class="param" v-if="record.Creator">
                    <span class="param-name">Creator</span>
                    <span class="param-value">{{ record.Creator.value }}</span>
                </div>
            </div>
        </div>
    </div>
    <!--</Teleport>-->
</template>
  
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const { record } = defineProps(['record']);
const emit = defineEmits(['closeModal']);

const failedToLoadImage = (event) => {
    event.target.src = '/src/assets/iconV.png';
}

const goBack = () => {
    //router.go(-1)
    /*const currentPathSegments = router.currentRoute.value.path.split('/');
    const newPathSegments = currentPathSegments.slice(0, -1);
    const newRoutePath = newPathSegments.join('/');
    router.push(newRoutePath);*/ //this is for using record as a param and not query
    console.log(router.currentRoute.value)
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

    /*background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);*/

}

.modal-content {
    max-width: min(750px, 80%);
    min-width: min(500px, 80%);

    max-height: 100%;

    overflow: auto;

    display: flex;
    flex-direction: column;

    position: absolute;
    padding: 30px;
    padding-bottom: 20px;

    background-color: #1a1c1d;
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
    border-radius: 15px;
    object-fit: cover;
    width: 100%;
}

.open-image-button {
    position: absolute;
    bottom: 5px;
    right: 5px;

    border-radius: 10px;
    text-decoration: none;
    background-color: rgba(15, 15, 15, 0.822);

    background-color: rgba(42, 42, 42, .8);
    /*border: 1px solid rgba(255, 255, 255, 0.7);
  border-color: hsla(0, 0%, 100%, 0.2);*/

    height: 33px;
    width: 33px;

    display: flex;
    justify-content: center;
    align-items: center;
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

.open-image-button:hover {
    background-color: rgba(255, 255, 255, 0.1);

    /*border: 1px solid rgba(255, 255, 255, 0.8);*/
    background-color: rgba(83, 83, 83, 0.8);
    transition: 0.1s ease-in-out;
}

/*.open-image-button:hover .material-icons-round{
  font-size: 30px;
  transition: 0.1s ease-in-out;
  }*/

.close-button {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #181818;
    background-color: #0e0e0e;
    display: flex;
    justify-content: center;
    align-items: center;
}

.close-button:hover {
    background-color: #4d4d4d;
    background-color: var(--dark-alt);
    transition: 0.1s ease-in-out;
}

.close-button .material-symbols-rounded {
    font-variation-settings:
        'FILL' 0,
        'wght' 500,
        'GRAD' 0,
        'opsz' 48;
    color: rgb(240, 240, 240);
    color: rgb(247, 247, 247);
    font-size: 25px;
}

.modal-text {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    gap: 13px;
}

.param {
    display: flex;
    flex-direction: column;    
}

.param-name {
    color: #fcce00;
    color: #888888;
    font-size: 15.5px;
    font-weight: 500;
}

.param-value {
    color: rgb(247, 247, 247);
    font-size: 15.5px;
}
</style>