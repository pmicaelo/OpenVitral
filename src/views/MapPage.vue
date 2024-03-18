<template>
	<main class="main">
		<MapComponent :records="results"/>
		<div class="info">
			<button @click="showMessage()">?</button>
		</div>
		<Transition name="backdrop-transition">
			<div class="modal-backdrop" v-if="query_record"> </div>
		</Transition>
		<Transition name="modal-transition">
			<RecordModalComponent :record="query_record" v-if="query_record" />
		</Transition>
	</main>
</template>

<script setup>


import { computed, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import MapComponent from '../components/MapComponent.vue'
import RecordModalComponent from '../components/RecordModalComponent.vue';

const results = inject('records');
const route = useRoute();

const query_record = computed(() => { 
  return findRecord(route.query.record) 
});

onMounted(() => {
	if (!localStorage.getItem('mapMessage')) {
		showMessage();
		localStorage.setItem('mapMessage', 'true');
	}
});

function findRecord(record_id){
  return results.value.find(result => result.uniqueId.value === record_id) 
}

function showMessage() {
	alert('The map page only contains stained glass pieces that explicitly have their geo-location properties expressed (latitude and longitude). As such, the records displayed on the map are only a fraction of those present on the website.');
}
</script>

<style scoped>
.main {
	padding: 0rem;
	/*z-index: unset;*/
}

.info {
	background-color: #181818;
	position: fixed;
	bottom: 10px;
	left: 10px;
	border-radius: 2px;
	border: 2px solid rgba(0, 0, 0, 0.2);
	background-clip: padding-box;
}

.info button {
	width: 34px;
	height: 34px;
	font-size: 22px;
	font-weight: 900;
}

.info:hover {
	background-color: #3a3a3a;
}

.modal-backdrop {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	width: 100vw;
	height: 100vh;

	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(6px);
}

.modal-transition-enter-active,
.modal-transition-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-transition-enter-from,
.modal-transition-leave-to {
	opacity: 0;
	transform: scale(0.8);
}

.backdrop-transition-enter-active,
.backdrop-transition-leave-active {
	transition: opacity 0.3s ease
}

.backdrop-transition-enter-from,
.backdrop-transition-leave-to {
	opacity: 0;
}
</style>