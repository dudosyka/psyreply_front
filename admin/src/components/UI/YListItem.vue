<template>
  <li
    class="list__item"
    :class="{ list__item_not_settings: !editable, list__item_not_select: !selectable }"
  >
  <div class="col selector-col">
      <div
              v-if="selectable"
              @click="$emit('select')"
              class="elipce"
              :class="{ elipce_active: active }"
      ></div>
  </div>
<!--      Контейнер, чтобы кнопка удаления и заголовок по краям разместить-->
      <div class="container-fluid left-area">
          <div class="name"><slot></slot></div>
          <button class="delete_btn"><i class="cross fa-solid fa-xmark"></i></button>
      </div>
    <div
      v-if="editable"
      @click="$emit('edit')"
      class="options"
    >
      <img class="settings-icon" v-if="editable" src="@/assets/img/options.svg">
    </div>
  </li>
</template>

<script>
export default {
  name: "YListItem",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.left-area {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}
.delete_btn {
    background: rgba(255, 255, 255, 0.34);
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    transition: 0.3s;
    cursor: pointer;
}
.delete_btn:hover {
    background: #FF0057FF;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    animation: ease-in linear 0.5s;
    transition: 0.3s;
}
.cross {
    font-size: 1rem;
    line-height: normal;
    padding: 0;
    margin:0;
}

.settings-icon {
  width: 1rem;
}
.elipce {
  width: 18px;
  height: 18px;
  background: rgba(255, 255, 255, 0.15);
  background-blend-mode: overlay;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
}
.elipce:hover {
  cursor: pointer;
}
.elipce_active {
  background: linear-gradient(200.42deg, #38F9D7 13.57%, #43E97B 98.35%);
}
.name{
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #FFFFFF;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.list__item{
  padding-left: 1rem;
  display: flex;
  justify-content: start;
  max-height: 3rem;
  grid-gap: 1rem;
  background: var(--acrylic-blur-light)!important;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 0.5rem;
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
  align-items: center;
}
.list__item_not_settings {
  padding: 1rem;
}
.list__item_not_select {
}
.options{
  padding: 1rem;
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  max-height: 2.7rem;
  height: 100%;
  border-radius: 0rem 0.4rem 0.4rem 0rem;
}
.options:hover {
  cursor: pointer;
}
</style>
