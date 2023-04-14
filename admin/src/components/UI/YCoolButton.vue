<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: "YCoolButton"
}
</script>

<style scoped>
.btn {
    background: linear-gradient(200.42deg, #B275FF 13.57%, #C247ED 98.35%);
    box-shadow: none;
    border: none;
    border-radius: 0.5rem;
    color: white;
    text-transform: none;
    width: 10vw;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: 0.5rem;
    max-height: fit-content;
    transition: background .3s ease-in-out;
}

.button_cool:hover {
    cursor: pointer;
    max-height: fit-content;
    background: linear-gradient(200.42deg, #B275FF 13.57%, #C247ED 98.35%);
}

.button_cool:active {
    max-height: fit-content;
    background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
}
</style>
