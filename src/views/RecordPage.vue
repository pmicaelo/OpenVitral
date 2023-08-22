<template>
  <Teleport to="#popup">
    <div v-if="showPopupWindow" class="popup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <button class="close-button" title="Close" @click="closePopup">
          <span class="material-symbols-rounded">close</span>
        </button>
        <div v-if="record.Image" class="popup-image">
          <img :src="record.Image.value" @error="failedToLoadImage" alt="Popup Image">
          <a class="open-image-button" title="Open image in a new tab" :href="record.Image.value" target="_blank"
            rel="noopener noreferrer">
            <span class="material-symbols-rounded">search</span>
          </a>
        </div>
        <div class="popup-text">
          <div class="title" v-if="record.Title">{{ record.Title.value }}</div>
          <div class="param" v-if="record.Description">Description: {{ record.Description.value }}</div>
          <div class="param" v-if="record.DataProvider">Institution: {{ record.DataProvider.value }}</div>
          <div class="param" v-if="record.Date">Date: {{ record.Date.value }}</div>
          <div class="param" v-if="record.description">Description: {{ record.description.value }}</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRoute } from 'vue-router';

/*const props = defineProps({
record: {
type: Object,
required: true,
default: () => null
}
})*/

const route = useRoute();
const results =  inject('records');
const record = defineProps(['record']);

const failedToLoadImage = (event) => {
  event.target.src = '/src/assets/iconV.png';
}

const showPopupWindow = ref(false);

const showPopup = () => {
  showPopupWindow.value = true;
};

const closePopup = () => {
  showPopupWindow.value = false;
};
</script>

<style scoped>
.popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);

}

.popup-content {
  max-width: 750px;
  min-width: 500px;
  max-height: 100%;

  overflow: auto;
  overflow-x: clip;

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

.popup-image {
  height: 450px;
  align-self: center;
  position: relative;
}

.popup-image img {
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
    'wght' 400,
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
    'wght' 400,
    'GRAD' 0,
    'opsz' 48;
  color: rgb(240, 240, 240);
  color: rgb(247, 247, 247);
  font-size: 25px;
}

.popup-text {
  color: rgb(247, 247, 247);
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.popup-text .title {
  display: flex;
}

.popup-text .param {
  display: flex;
}
</style>