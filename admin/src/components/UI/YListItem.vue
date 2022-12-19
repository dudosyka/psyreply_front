<template>
  <li
    class="list__item"
    :class="{ list__item_not_settings: !editable, list__item_not_select: !selectable }"
  >
    <div
      v-if="selectable"
      @click="$emit('select')"
      class="elipce"
      :class="{ elipce_active: active }"
    ></div>
    <div class="name"><slot></slot></div>
    <div
      v-if="editable"
      @click="$emit('edit')"
      class="options"
    >
      <img v-if="editable" src="@/assets/img/options.svg">
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
.elipce {
  width: 25px;
  height: 25px;
  background: linear-gradient(155.31deg, rgba(255, 255, 255, 0.5) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(255, 255, 255, 0.54) 74.67%);
  background-blend-mode: overlay;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
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
  font-size: 32px;
  line-height: 100%;
  color: #FFFFFF;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.list__item{
  padding-left: 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: start;
  grid-gap: 2rem;
  background: linear-gradient(140.62deg, hsla(0, 0%, 100%, 0.25) 2.81%, hsla(0, 0%, 100%, 0.1) 100.82%);
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 1rem;
  border-color: var(--light-opacity);
  border-width: 2px;
  border-style: solid;
}
.list__item_not_settings {
  padding: 1rem;
}
.list__item_not_select {
  grid-template-columns: 1fr auto;
}
.options{
  padding: 1rem;
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: 0px 14px 14px 0px;
}
.options:hover {
  cursor: pointer;
}
</style>
