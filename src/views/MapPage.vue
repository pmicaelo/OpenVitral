<template>
	<div class="page-and-modal">
		<main>

			<!--<div id="rand-div">
			<img :src="logoURL" alt="Vue" />
		</div>!-->

			<MapComponent />
		</main>
		<Transition name="backdrop-transition">
			<div class="modal-backdrop" v-if="record"> </div>
		</Transition>
		<Transition name="modal-transition">
			<RecordModalComponent :record="record" v-if="record" />
		</Transition>
	</div>
</template>

<script setup>


import {computed, inject } from 'vue';
import { useRoute} from 'vue-router';

import MapComponent from '../components/MapComponent.vue'
import RecordModalComponent from '../components/RecordModalComponent.vue';


const results = inject('records');
const route = useRoute();
const record = computed(() => { return results.value.find(result => result.uniqueId.value === route.query.record) });

</script>

<style scoped>
.page-and-modal {
	height: 100%;
	display: flex;
	overflow: clip;
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

main {
	padding: 0rem;
	/*overflow: auto;*/
	/*min-height: calc(100vh - var(--navbar-height));*/
}

/*#rand-div{
  	position: fixed;
	z-index: 1;
}*/

/*#map {
	/*position: sticky; /*appearantly needed to put elements in front of it maybe cause map default is relative
	height: 100%;/*change to 100%?
}*/
</style>