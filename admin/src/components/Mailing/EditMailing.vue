<template>
    <y-modal class="modal">
        <header class="header">
            <y-left-arrow-button @click="$emit('close')"/>
            <h1 class="heading">Редактирование рассылки</h1>
        </header>

        <y-modal>
            <header class="header">
                <h2 class="heading">Изменение параметров рассылки</h2>
            </header>
            <y-input v-model.trim="block.name"/>
            <y-modal class="time-picker">Время рассылки -
                <y-input max="99" min="0" type="number" v-model="newTime.hours" placeholder="чч"
                         class="time-picker__input"/>
                :
                <y-input max="59" min="0" type="number" v-model="newTime.minutes" placeholder="мм"
                         class="time-picker__input"/>
                :
                <y-input max="59" min="0" type="number" v-model="newTime.seconds" placeholder="сс"
                         class="time-picker__input"/>
            </y-modal>
            <y-cool-button>Сохранить обновленную рассылку</y-cool-button>
        </y-modal>
    </y-modal>
</template>

<script>
import YCoolButton from '@/components/UI/YCoolButton';
import YPopupWarn from "@/components/UI/YPopupWarn";

export default {
  name: "EditMailing",
  components: {YCoolButton, YPopupWarn},
  props: ['id'],
  data() {
    return {
      newTime: {
        hours: null,
        minutes: null,
        seconds: null
      }
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>
.modal {
    display: grid;
    grid-gap: 1rem;
}

.header {
    display: grid;
    grid-template-columns: auto 1fr min-content min-content;
    grid-gap: 2rem;
    justify-content: start;
    align-items: center;
}

.time-picker {
    font-size: 1.2rem;
    padding: .2rem 1rem;
    display: grid;
    grid-template-columns: min-content repeat(3, 3.3rem min-content);
    align-items: center;
    grid-gap: .1rem;
    white-space: nowrap;
}

.time-picker__input {
    padding: .1rem;
}
</style>
