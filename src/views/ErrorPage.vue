<template>
  <main>
    <h1 class="error-title">404</h1>
    <h1 class="error-subtitle">Page Not Found :[</h1>
    <p class="error-description">
      This page isn't available ... Try Clicking on one of the navigation tab links.
    </p>
  </main>
</template>

<style scoped>

main {
  padding: 0 0;
  margin-bottom: var(--navbar-height);
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.error-title {
  font-weight: 500;
  font-size: 100px;
}
.error-subtitle {
  font-weight: 500;
  font-size: 35px;
  margin-bottom: 20px;
}

.error-description {
  font-size: 18px;
  font-weight: 500;
}
</style>
