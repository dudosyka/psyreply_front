<template>
  <div class="container">
    <ContainerBlock class="animate__animated animate__slideInUp">
    </ContainerBlock>
  </div>
</template>

<script>
// @ is an alias to /src
import ContainerBlock from "@/components/ContainerBlock.vue";

export default {
  name: 'HomeView',
  components: {
    ContainerBlock,
  }
}
</script>

<style scoped>

body {
  background-color: black!important;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  align-items: center;
}
</style>