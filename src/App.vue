<template>
  <div v-if="loaded" class="app">
    <!-- Navbar -->
    <NavbarComponent />
    <!-- Content -->
    <router-view v-slot="{ Component, route }">
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
import { fetchAll } from './data/dataFetcher.js';

const records = ref([]);
const loaded = ref(true);
provide('records', readonly(records));

onMounted(async () => {
  loaded.value = false;
  records.value = await fetchAll();
  loaded.value = true;
});

</script>

<style>
:root {
  --primary: #f88c27;
  --grey: #64748b;
  --dark: #181818;
  --dark-alt: #313336;
  --light: #fafafa;
  --logo-font: #f2f7fc;
  --bg: #303135;
  --navbar-height: 50px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Overpass", sans-serif;
  color: rgb(247, 247, 247);
}

body {
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
  overflow: hidden;
  /*overflow: clip;*/
  height: 100vh;
  width: 100vw;
}

.app main {
  z-index: 0;
  /*behind navbar (index 1)*/
  /*height: 100%;
  width: 100%;*/
  display: flex;
  flex-direction: column;
  /*overflow: clip auto;*/
  overflow: hidden auto;
  flex: 1 1 0;
  padding: 2rem 1rem;
  padding-bottom: 1rem;

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

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-left-enter-active {
  transition: all 0.4s ease-out;
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100px)
}

.slide-left-leave-active {
  transition: all 0.2s ease-in;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-right-enter-active {
  transition: all 0.4s ease-out;
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100px)
}

.slide-right-leave-active {
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

.slide-out-enter-from {
  opacity: 0;
  transform: scale(1.1);
}
</style>
