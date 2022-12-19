<template>
  <router-view/>
  <transition name="popup">
    <y-popup-error />
  </transition>
  <transition name="popup">
    <y-popup />
  </transition>
</template>

<script>
export default {
  computed: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');

:root {
  --font-rubik: 'Rubik', sans-serif;

  --light: hsl(0, 0%, 100%);
  --light-opacity: hsla(0, 0%, 100%, 0.27);

  font-family: var(--font-rubik);
  font-size: calc(.5vw + .5rem);
  color: var(--light);

  box-sizing: border-box;

  background-image: url('@/assets/img/bg.png');
  background-size: cover;
  background-attachment: fixed;
}

*,
::before,
::after {
  padding: 0;
  border: none;
  margin: 0;
  background: none;
  user-select: none;
  box-sizing: inherit;
  text-decoration: none;
}

.link:link,
.link:visited,
.link:hover,
.link:active {
  color: var(--light);
}

#app {
  position: relative;
}

.popup-enter-active,
.popup-leave-active {
  transform: translateY(0);
  transition: opacity 0.15s ease, translate .15s ease-out;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
