<template>
    <div class="loadingScreen">
        <Loading />
    </div>
</template>

<script setup>
    import Loading from './icons/Loading.vue';
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

