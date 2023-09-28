<template>
	<main class="main">
    <div class="error">
      <h1 class="error-title">404</h1>
      <h1 class="error-subtitle">Page Not Found :[</h1>
      <p class="error-description">
        This page isn't available ... Try Clicking on one of the navigation tab links.
      </p>
    </div>
  </main>
</template>

<style scoped>
.main {
  padding: 0 0;
  justify-content: center;
}
.error {
  padding-bottom: var(--navbar-height);
  max-height: 100%;
  display: flex;
  flex-direction: column;
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
