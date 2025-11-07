<template>
  <div
    v-if="visible"
    id="splash"
    class="splash-container"
  >
    <img
      src="../assets/Splash.gif"
      alt="Splash Animation"
      class="splash-gif"
    />
  </div>
</template>

<script>
export default {
  name: "SplashAnimation",
  data() {
    return {
      visible: true,
    };
  },
};
</script>

<style scoped>
.splash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 1s ease;
}

.splash-container.fade-out {
  opacity: 0;
}

.splash-gif {
  width: 500px;
  height: auto;
}
</style>
