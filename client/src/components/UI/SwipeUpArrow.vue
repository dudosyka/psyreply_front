<template>
  <div class="container">
    <a class="arrow-icon">
      <span class="right-bar"></span>
      <span class="left-bar"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: "SwipeUpArrow",
}
</script>

<style scoped>
$background: lightcoral;
$easing: cubic-bezier(.25,1.7,.35,.8);
$duration: 0.5s;

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.arrow-icon {
  height: 2.8em;
  width: 2.8em;
  display:none;
  padding: 0.5em;
  margin: 1em auto;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
}

.left-bar {
  position: absolute;
  background: lightcyan;
  top: 0;
  left:0;
  width: 40px;
  height: 10px;
  display: block;
  transform: rotate(140deg);
  float: right;
  border-radius: 2px;
  &:after {
    content:"";
    background-color: white;
    width: 40px;
    height: 10px;
    display: block;
    float: right;
    border-radius: 6px 10px 10px 6px;
    transition: all $duration $easing;
    z-index: -1;
  }
}

.right-bar {
  position: absolute;
  background: lightcyan;
  top: 0px;
  left:26px;
  width: 40px;
  height: 10px;
  display: block;
  transform: rotate(220deg);
  float: right;
  border-radius: 2px;
  &:after {
    content:"";
    background-color: white;
    width: 40px;
    height: 10px;
    display: block;
    float: right;
    border-radius: 10px 6px 6px 10px;
    transition: all $duration $easing;
    z-index: -1;
  }
}

@media screen and (max-width:820px) {
  .arrow-icon {
    display: block;
  }
}

</style>
