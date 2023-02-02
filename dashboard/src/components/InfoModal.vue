<template>
  <div class="container-fluid modal-overlay animate__animated animate__fadeIn">
    <div class="container modal-body animate__animated animate__slideInUp">
      <h3 class="modal-heading">Заголовок</h3>
      <p class="modal-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt volutpat nisl. Ut ornare nisl nec augue vestibulum vulputate. Suspendisse sed ipsum non ante viverra venenatis. Suspendisse elementum accumsan mauris vitae fringilla. Morbi interdum odio blandit, consectetur enim in, mollis ante. Etiam felis lacus, tempus at odio eu, vulputate accumsan leo. Donec in est libero. Nunc dolor tortor, vulputate eget ex tincidunt, luctus pulvinar nunc. Nullam imperdiet ullamcorper sapien, et pellentesque risus dictum et. Duis sit amet purus eget nunc iaculis lacinia a eu magna. Maecenas et placerat mauris. Ut varius velit in odio pharetra tincidunt et vitae urna. Quisque facilisis urna et nibh accumsan, eu mollis urna molestie. Fusce feugiat blandit tellus.

        Aenean eget ante non felis cursus ornare vitae vitae orci. Phasellus bibendum ipsum a justo rutrum, quis gravida ex cursus. Aenean ornare egestas vulputate. Integer ut odio sagittis enim commodo tincidunt vel sed nibh. Proin dignissim aliquam mauris ac sodales. Donec pretium vulputate vehicula. Quisque bibendum odio nec nunc placerat commodo. Donec id dapibus quam, mollis tincidunt enim. Nunc eget mattis risus. Aliquam vulputate neque vel vulputate volutpat. Nullam euismod vestibulum mauris, non semper libero rutrum quis. Etiam congue justo non turpis condimentum, sed viverra ligula commodo. Praesent eleifend nulla est, et finibus ligula dignissim viverra. Nam sagittis nibh sem, efficitur finibus nulla vehicula vitae. In dignissim sem sed diam mattis, nec malesuada quam lobortis.

      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoModal"
}
</script>

<style scoped>
.modal-text {
  text-align: left;
}
.modal-heading {
  text-align: left;
}
.container.modal-body {
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  width: 90vw;
  height: 40vh;
  border: 1px solid var(--border-dark);
  border-radius: 30px;
  justify-content: flex-start;
}
.container-fluid.modal-overlay {
  background-color: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(10px);
  background-image: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  z-index: 9999;
}
</style>