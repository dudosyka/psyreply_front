<template>
    <h3 @click="edit" v-if="show" class="nick">{{ newLogin }}</h3>
    <div class="inputBlock" v-if="!show">
      <y-input class="input" :placeholder="placeholder" v-model="newLogin"/>
      <img src="@/assets/img/tick.svg" alt="tick" class="tick" @click="editNick">
    </div>
</template>

<script>
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";
import YInput from "@/components/UI/YInput.vue";

export default {
  name: "RNickInput",
  components: {YInput, RButton},
  props: {
    login: {
      type: String,
      default: ''
    },
    placeholder: '',
    error: ''
  },
  data() {
    return {
      show: {
        type: Boolean,
        default: false
      },
      newLogin: ''
    }
  },
  methods: {
    edit() {
      this.show = !this.show
      console.log(this.show)
      console.log(this.login)
    },
    editNick() {
      if (this.newLogin !== '') {
        this.show = !this.show
        this.$emit('login', {
          login: this.newLogin
        })
      }
      else {
       this.newLogin = this.login
       alert(this.error)
      }
    }
  },
  created() {
    this.newLogin = this.login
    console.log(this.newLogin)
  }
}
</script>

<style scoped>
.inputBlock {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 .5rem;
}

.input, .nick{
  margin: 0 0 0 1rem;
  width: 12rem;
  align-items: center;
  text-align: center;
}

.tick {
  margin: 0 0 0 -25px;
  height: 1.2rem;
  width: 1.2rem;
  padding: .15rem;
  border: .05rem solid transparent;
  border-radius: .1rem;
  transition-duration: .5s;
}

.tick:hover {
  padding: .15rem;
  border: .05rem solid var(--active-color);
  border-radius: .1rem;
  transition-duration: .5s;
}
</style>
