<template>
<li class="results__item" >
  <div class="block__item">
    <img src="@/assets/img/block.svg" @click="$emit('edit', id)" alt="">
    <div class="name" >{{ name }}</div>
  </div>
  <div class="line"></div>
  <div class="username">{{ username }}</div>
  <div class="line"></div>
  <div class="id">{{ id }}</div>
  <div class="line"></div>
  <div class="date">{{ formattedDate }} ({{ week }} н)</div>
  <div class="line"></div>
  <div class="valid" v-if="valid">Valid</div>
  <div class="invalid" v-else>Invalid</div>
  <div class="dashboard__button">
    <img @click="openClientDash" src="@/assets/img/dash.svg" alt="">
  </div>
</li>
</template>

<script>
import User from "@/api/admin/User";

export default {
  name: "YResultsListItem",
  props: {
    name: {
      default: 'no name'
    },
    username: {
      default: 'no username'
    },
    id: {
      default: -1
    },
    date: {
      default: '32/13/893'
    },
    week: {
      default: "3"
    },
    valid: {
      default: true
    },
    row: {
      default: {}
    }
  },
  methods: {
    async openClientDash() {
      const client = new User();
      const link = await client.getDashLink(this.row.user.jetBotId).then(res => res.text());
      window.open(link, "_blank")
    }
  },
  computed: {
    formattedDate() {
      let date = new Date(this.date)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style scoped>
.results__item{
  display: grid;
  grid-template-columns: 1fr 0.25fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 1fr;
  align-items: center;
  background: rgba(255, 255, 255, 0.17);
  border-radius: 0.875rem;
  padding-left: 1rem;
  border-bottom: rgba(255, 255, 255, 0.5);
  border-top: rgba(255, 255, 255, 0.5);
  border-right:rgba(255, 255, 255, 0) ;
  border-left: rgba(255, 255, 255, 0);


}
.block__item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}
.name{
  font-style: normal;
  font-weight: 400;
  margin-left: 1rem;
  font-size: 1.2rem;
  line-height: 100%;
  color: #FFFFFF;
}
.dashboard__button{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 0px 14px 14px 0px;

}
.line{
  background-color: rgba(255, 255, 255, 0.36);
  height: 2rem;
  width: 0.125rem;
  justify-self: center;
}
.valid{
  color:rgba(0, 255, 25, 1);
}
.invalid{
color: rgba(255, 46, 0, 1);
}
.username{
  justify-self: center;
}
.id{
  justify-self: center;
}
.title{
  margin-left: 1rem;
}
</style>
