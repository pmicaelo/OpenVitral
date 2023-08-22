<template>
    <div class="loadingScreen">
        <LoadingComponent />
    </div>
</template>

<script setup>
    import LoadingComponent from './icons/LoadingComponent.vue';
</script>

<style scoped>
svg {
    width: 150px;
}
.loadingScreen{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    gap: 20px;

    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

