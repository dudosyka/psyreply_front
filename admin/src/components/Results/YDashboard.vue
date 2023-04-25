<template>
    <div class="dashboard">
        <header class="header">
            <div class="header__select">
                <y-left-arrow-button @click="$emit('close')"/>
                <h2 class="heading header__heading">{{ block.block_title }}</h2>
            </div>

            <div @click="openClientDash" class="dash__button">
                <div class="dash__button__title">Дашборд</div>
                <img src="@/assets/img/dash.svg" alt="">
            </div>
        </header>
        <div class="user">
            <div class="username">{{ block.user.login || 'no username' }}</div>
            <div class="line"></div>
            <div class="id">{{ block.user.jetBotId || 'no user id' }}</div>
            <div class="line"></div>
            <div class="date">{{ formattedDate }}</div>
            <div class="line"></div>
            <div class="passage">
                <p class="time">Время прохождения: </p>
                <p class="passage__user" :class="{ 'passage__user_bad': !isTimeVauserlid }">{{ timeOnPass }}</p>
                <span class="slash"> /
      </span>
                <p class="passage__test">{{ time }}</p>
            </div>
        </div>
        <hr>
        <div class="results__button">
            <y-results-tabel>
                <y-results-tabel-item
                        v-for="metric of metrics"
                        :id="metric.metric_id"
                        :value="metric.value"
                        v-model.number="metric.value"
                />
            </y-results-tabel>
            <div class="results__valid">
                <div
                        @click="approved = !approved"
                        class="elipce"
                        :class="{ 'elipse__bad': !approved }"></div>
                <p>Результаты {{ approved ? "" : "не" }} валидны</p>
            </div>
            <div class="row save">
                <y-cool-button @click="updateBlock" class="btn save-button">Сохранить изменения</y-cool-button>
            </div>
        </div>

    </div>
</template>

<script>
import Results from '@/api/admin/Results';
import User from "@/api/admin/User";

export default {
  name: "YDashboard",
  created() {
    this.metrics = JSON.parse(this.block.data)
    this.approved = this.block.approved
    
    if (this.block.block.time > 0) {
      let hours = Math.floor(this.block.block.time / (60 * 60 * 1000))
      hours = (hours < 10) ? `0${hours}` : hours
      this.block.block.time -= hours * 60 * 60 * 1000
      let minutes = Math.floor(this.block.block.time / (60 * 1000))
      minutes = (minutes < 10) ? `0${minutes}` : minutes
      this.block.block.time -= minutes * 60 * 1000
      let seconds = Math.floor(this.block.block.time / 1000)
      seconds = (seconds < 10) ? `0${seconds}` : seconds
      
      this.time = `${hours}:${minutes}:${seconds}`
    } else {
      this.time = 'нет временных рамок'
    }
    // this.time = this.block.time_on_pass
    
    if (this.block.time_on_pass > 0) {
      let hours = Math.floor(this.block.time_on_pass / (60 * 60 * 1000))
      hours = (hours < 10) ? `0${hours}` : hours
      this.block.time_on_pass -= hours * 60 * 60 * 1000
      let minutes = Math.floor(this.block.time_on_pass / (60 * 1000))
      this.block.time_on_pass -= minutes * 60 * 1000
      let seconds = Math.floor(this.block.time_on_pass / 1000)
      seconds = (seconds < 10) ? `0${seconds}` : seconds
      this.block.time_on_pass -= seconds * 1000
      const ms = this.block.time_on_pass / 1000
      if (ms >= 5000) {
        seconds += 1
      }
      minutes = (minutes < 10) ? `0${minutes}` : minutes
      this.timeOnPass = `${hours}:${minutes}:${seconds}`
    } else {
      this.timeOnPass = 0
    }
    this.isTimeValid = this.timeOnPass < this.time;
  },
  data() {
    return {
      metrics: [],
      approved: null,
      time: null,
      timeOnPass: null,
      isTimeValid: true
    }
  },
  methods: {
    updateBlock() {
      const body = {
        newData: this.metrics,
        approved: this.approved
      }
      
      const results = new Results()
      results.update(this.block.id, body)
        .then(res => {
          if (res.ok) {
            this.$store.commit('openPopup', 'Данные сохранены')
          } else {
            this.$store.commit('openErrorPopup', res.msg())
          }
        })
    },
    async openClientDash() {
      const client = new User();
      const link = await client.getDashLink(this.$store.getters.editBlock.user.jetBotId).then(res => res.text());
      const jsonLink = JSON.parse(link)
        window.open(jsonLink.body)
    }
  },
  computed: {
    block() {
      return this.$store.getters.editBlock
    },
    formattedDate() {
      let date = new Date(this.block.createdAt)
      const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
      const month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const year = date.getFullYear()
      
      return `${day}/${month}/${year}`
    },
  }
}
</script>

<style scoped>
.save {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}

.dash__button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: var(--acrylic-blur-light) !important;
    border: 1px solid var(--border-dark);
    border-radius: 14px;
    padding: 1rem;
    cursor: pointer;
}

.input {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.input:hover {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.dash__button__title {
    margin-right: 0.5rem;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.header__select {
    display: flex;
    grid-template-columns: auto max-content;
    justify-content: left;
    grid-gap: 1rem;
    align-items: center;
}

.user {
    display: flex;
    align-items: center;
    justify-content: left;
}

.username {
    opacity: 0.5;
}

.id {
    opacity: 0.5;
}

.date {
    opacity: 0.5;
}

.slash {
    opacity: 0.5;
}

.passage__test {
    opacity: 0.5;
}

.line {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    background-color: rgba(255, 255, 255, 0.36);
    height: 2rem;
    width: 2px;
    justify-self: center;

}

.slash {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

.time {
    opacity: 0.5;
}

table {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.26);
    border-top: 1px solid rgba(255, 255, 255, 0.26);

}

hr {
    margin-bottom: 1rem;
    min-width: 30vh;
    border-left: 0px solid white;
    border-right: 0px solid white;
    border-bottom: 0px solid white;
    border-top: 1px solid rgba(255, 255, 255, 0.52);

}

.results__button {
    display: grid;
    grid-template-rows: 1fr 1rem 4rem;
    grid-gap: 3rem;
}

.passage {
    display: flex;
    flex-direction: row;
    align-items: center;

}

.passage__user {
    margin-left: 0.5rem;
    color: rgba(0, 255, 25, 1);
    opacity: 100% !important;

}

.passage__user_bad {
    color: red;
    opacity: 100% !important;
}

.elipce {
    background: linear-gradient(200.42deg, #38F9D7 13.57%, #43E97B 98.35%);
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    margin-right: 0.5rem;
}

.elipse__bad {
    background: linear-gradient(200.42deg, #f93838 13.57%, #e94343 98.35%);
}

.results__valid {
    display: flex;
    align-items: center;
}

.input {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.input:hover {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.item__metric {
    color: white;
    opacity: 100%;
}
</style>
