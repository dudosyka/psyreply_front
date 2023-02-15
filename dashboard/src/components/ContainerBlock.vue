<template>
<!--  Основной контейнер-->
<div class="container-fluid" @click="closeShareModal">
  <!--  Ряд с хедером-->
  <div class="row header-area">
    <!--    Левая колонка с логотипом Reply-->
    <div class="col logo-box">
      <img alt="Logo" class="logo header-logo" src="data:image/png;base64,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" data-v-c1beedde="">
      <h6 class="logo-title" data-v-c1beedde="">Reply 2.0</h6>
      <span class="logo-subtext" data-v-c1beedde="">| Dashboard</span>
    </div>
    <!--    Левая колонка с логотипом Reply кончилась-->
    <!--    Правая колонка с аватаркой компании-->
    <div class="col company">
      <h6 class="company-name">{{this.$store.getters.companyName}} </h6>
      <div class="container company-img" :style="{ backgroundImage: `url('https://files.psyreply.com/${logoUrl}')` }"> </div>
      <h6 class="company-name-separator">| </h6>
      <a class="exit" @click.prevent="exit" href="#">Выход</a>
    </div>
    <!--    Правая колонка с аватаркой компании кончилась-->
  </div>
  <!--  Ряд с хедером кончился-->

  <div class="row buttons-area">
    <!--    Центральная колонка с группами-->
    <div class="col groups">
      <template v-if="groups">
        <div class="group-item" v-for="(group, index) in groups" :key="`${Date.now()}${group.id}`">
          <a class="menu-link" @click.prevent="selectGroup(index)">{{ group.name }}</a>
        </div>
      </template>
    </div>
    <div class="col notification">
      <h6 class="notification-btn-heading">Нет новых уведомлений</h6>
      <button class="btn btn-success notification-btn" @click="toggle_bor"><i class="fa-solid fa-bell"></i></button>
    </div>
    <!--    Центральная колонка с группами кончилась-->
  </div>

  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <template v-if="showContext === true">
        <div class="alert alert-primary d-flex align-items-center" role="alert">
          <div>
            <div class="col notification-text-heading">
              <h6 class="alert-heading"><i class="fa-sharp fa-solid fa-circle-info info-icon"></i>  Уведомления</h6>
              <button class="btn btn-close-white" @click = "toggle_bor"><i class="fa-solid fa-xmark close"></i></button>
            </div>
            <div class="col">
              <p class="alert-text">Нет уведомлений</p>
            </div>
          </div>
        </div>
    </template>
  </Transition>


  <div class="container stats">
    <template v-if="metrics">
      <div class="col-md-auto stats-col main">
            <Transition
                enter-active-class="animate__animated animate__flipInX"
            >
              <StatsBlock key="1" v-if="selectedMetric" :metricItem="selectedMetric" />
              <div class="container" key="2" v-else-if="selectedMetric === false" @click="showAnimation">
                <img alt="YanGPT fake" class="placeholder" src="../assets/chart-placeholder.png" />
                <h4 class="placeholder-heading" style="width: 500px">Выберите метрику</h4>
              </div>
            </Transition>
          </div>
      <div class="row small-metrics">
          <div class="col stats-col second">
            <SmallStatsBlock :metric="metric" v-for="metric in metrics[0]" :key="Date.now()+metric.label" />
          </div>
          <div class="col stats-col second">
            <SmallStatsBlock :metric="metric" v-for="metric in metrics[1]" :key="Date.now()+metric.label" />
          </div>
          <div class="col stats-col second">
            <SmallStatsBlock :metric="metric" v-for="metric in metrics[2]" :key="Date.now()+metric.label" />
          </div>
          <div class="col stats-col second">
            <SmallStatsBlock :metric="metric" v-for="metric in metrics[3]" :key="Date.now()+metric.label" />
          </div>
      </div>
      <div class="col-md-auto shadow-col">
      </div>
    </template>
  </div>
  <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="alert-link d-flex align-items-center" v-if="showLinkModal" @click.stop="copyShareText">
        <div class="row link-content" >
          <div class="col notification-link-heading" v-if="showLinkShare">
            <h6 class="alert-heading link-heading">Ссылка на группу готова!</h6>
          </div>
          <div class="col notification-link-heading" v-if="showLinkShare === false">
            <h6 class="alert-heading link-heading">Текущей группой нельзя поделиться</h6>
          </div>
          <div class="col" v-if="showLinkShare">
            <div class="form-outline" :class="{'highlighted': highlightShareLink}">
              <input
                  class="form-control link-input"
                  id="formControlReadonly"
                  type="text"
                  v-model="shareText"
                  readonly
                  @click="copyShareText"
              />
            </div>
            <p class="link-description" v-if="!copyLink">Нажмите на ссылку, чтобы скопировать</p>
            <p class="link-description" v-if="copyLink">Ссылка скопирована</p>
            <small-popup v-if="highlightShareLink"></small-popup>
          </div>
        </div>
      </div>
  </Transition>
  <div class="row footer-area">
    <button class="btn btn-primary results-button share-button" @click.stop = "toggleShareModal"><i class="fa-solid fa-share-from-square"></i> Поделиться группой</button>
    <div class="col notification">
      <button class="btn btn-primary results-button" @click="loadOld"><i class="fa-solid fa-clock-rotate-left"></i> Показать старые результаты</button>
    </div>
</div>
</div>
<!--  Основной контейнер кончился-->
</template>

<script>

import StatsBlock from "@/components/StatsBlock.vue";
import SmallStatsBlock from "@/components/SmallStatsBlock.vue";
import * as url from "url";
import apiConf from "@/api/api.conf";
import SmallPopup from "@/components/SmallPopup.vue";

export default {
  name: "ContainerBlock",
  components: {SmallPopup, SmallStatsBlock, StatsBlock},
  data() {
    return {
      showContext: false,
      showLinkModal: false,
      highlightShareLink: false,
      copyLink: false
    }
  },
  async created() {
    const isApplicationLoaded = await this.$store.dispatch('loadApplication')
    if (!isApplicationLoaded) this.$router.push("/");
    },
  methods:{
    toggleShareModal(){
      this.showLinkModal = !this.showLinkModal;
    },
    closeShareModal() {
      this.showLinkModal = false;
      this.copyLink = false
    },
    showAnimation(){
      this.$store.commit('showAnimationTrue')
      setTimeout(() => {
        this.$store.commit('showAnimationFalse')
      }, "250")
    },
    url() {
      return url
    },
    exit(){
      this.$store.dispatch('exit')

    },
    toggle_bor(){
      this.showContext = !this.showContext;
    },
    selectGroup(groupIndex) {
      this.$store.dispatch('selectGroup', groupIndex);
    },
    loadOld() {
      this.$store.dispatch('selectGroupOld');
    },
    copyShareText() {
      this.copyLink = true
      navigator.clipboard.writeText(this.shareText);
      this.highlightShareLink = true;
      setTimeout(() => {
        this.highlightShareLink = false;
      }, 1000);

    }
  },
  computed: {
    showLinkShare(){
      return (!!this.$store.getters.selectedGroupId && !this.$store.getters.partialData);
    },
    groups() {
      const groups = this.$store.getters.groups;
      return groups;
    },
    selectedMetric() {
      const check = this.$store.getters.selectedMetric;
      return check;
    },
    metrics() {
      const metricItems = this.$store.getters.selectedGroupMetrics;
      if (!metricItems)
        return false;
      const results = [
        {index: 0, label: "", values: []},
        {index: 0, label: "", values: []},
        {index: 0, label: "", values: []},
        {index: 0, label: "", values: []},
        {index: 0, label: "", values: []},
        {index: 0, label: "", values: []},
        {index: 0, label: "", values: []},
        {index: 0, label: "", values: []},
      ];
      function checkIsAllEqual() {
        let firstLength = results[0].values.length;
        for (const item of results) {
          if (item.values.length != firstLength)
            return false;
        }
        return true;
      }
      let max = 0;
      metricItems.forEach((item, index) => {
        for (const res of results) {
          if (checkIsAllEqual()) {
            item.index = index;
            res.values.push(item);
            if (res.label == "") {
              res.label = item.label
            } else {
              res.label += ` | ${item.label}`
            }
            max++;
            return;
          }
          if (res.values.length < max) {
            item.index = index;
            res.values.push(item);
            if (res.label == "") {
              res.label = item.label
            } else {
              res.label += ` | ${item.label}`
            }
            return;
          }
        }
      });
      return [
          [ results[0], results[1] ],
          [ results[3], results[2] ],
          [ results[4], results[5] ],
          [ results[7], results[6] ]
      ];

    },
    logoUrl() {
      return this.$store.getters.companyLogo;
    },
    shareText() {
      return `${apiConf.dashboard_root}/share/${this.$store.getters.shareToken}`
    }
  }
}
</script>

<style scoped>
.form-outline {
  transition-duration: 0.5s;
}
*::selection {
  background-color: rgba(0, 189, 255, 0.56);
  color: #fff;
}
.notification-link-heading {
  border-bottom: 1px solid;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-color: var(--border-dark)!important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-heading {
  text-align: center;
}
.link-description {
  color: var(--inactive-color);
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0;
}
.link-input {
  background: var(--acrylic-blur-light)!important;
  color: white!important;
  width: 100%!important;
  max-width: 25rem!important;
}
.link-content {
  width: 100%;
  min-width: 21vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.alert-link {
  text-align: left;
  position: fixed;
  bottom: 3rem;
  max-width: 27rem;
  width: 100%;
  padding-right: 2rem;
  padding-left: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  z-index: 9999;
  left: 0;
  border-color: var(--border-dark)!important;
  color: rgba(255, 255, 255, 0.65);
  border: 1px solid;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-radius: 1rem;
  min-width: 15vw;
  background: rgb(7 8 12 / 80%);
  margin: 1rem;
}
.share-button {
  max-width: 12vw;
}
.highlighted {
  box-shadow: 0px 0px 53px rgba(59, 202, 138, 0.68) !important;
  border-radius: 10px!important;
}
*{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.placeholder {
  background-color: transparent;
  position: relative;
  max-width: 500px;
  min-width: 200px;
  cursor: default;
  width: auto;
  z-index: 1;
}
.placeholder-heading {
  position: fixed;
  z-index: 999;
  bottom: 21rem;
  opacity: 0.8;
  left: 10rem;
  max-width: 20rem;
  background: rgb(7 8 12 / 25%);
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 0;
  border: 1px solid var(--border-light);
  border-radius: 1rem;
}
.row.small-metrics {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  flex-direction: row;
  overflow-x: scroll;
  padding: 2rem 2rem 1rem 1rem;
}
.notification-btn {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.29);
}
.notification-btn:hover {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.notification-btn:focus {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.btn-close-white {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.29);
}
.btn-close-white:hover {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.btn-close-white:focus {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.btn-close-white:active {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.btn-close-white:focus-visible {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.notification-btn:active {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.notification-btn:focus-visible {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.notification-btn:active {
  background: transparent!important;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.notification-btn-heading {
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: var(--inactive-color);
  border-bottom: 2px solid transparent;
  transition: 0.3s;
  font-size: 0.9rem;
  font-weight: 400;
}
.col.notification {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.hr {
  width: 100%;
  border-bottom: 1px solid;
  border-color: var(--border-dark)!important;
}
.notification-text-heading {
  border-bottom: 1px solid;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-color: var(--border-dark)!important;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.alert-heading {
  margin: 0;
}
.alert-text {
  margin-bottom: 0;
}
.info-icon {
  color: rgba(255, 255, 255, 0.65);
}
.alert {
  text-align: left;
  position: fixed;
  top: 8.5rem;
  min-width: 10vw;
  width: auto;
  z-index: 9999;
  right: 0;
  border-color: var(--border-dark)!important;
  color: rgba(255, 255, 255, 0.65);
  border: 1px solid;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-radius: 1rem;
  background: rgb(7 8 12 / 80%);
  margin: 1rem;
}

/*.container.sidebar {*/
/*  display: flex;*/
/*  position: fixed;*/
/*  z-index: 99999;*/
/*  width: 20rem;*/
/*  top: 8rem;*/
/*  right: 0;*/
/*  align-items: center;*/
/*  justify-content: flex-start;*/
/*  padding-left: 0;*/
/*  padding-right: 0;*/
/*  flex-direction: column;*/
/*}*/
.stats-col.third {
  display: flex;
  gap: 0;
  align-items: center;
  position: sticky;
  flex-direction: column;
  justify-content: center;
  right: 0;
  background: transparent;
  height: 100%;
  max-height: 66.5vh;
  width: 20rem;
}
.my-row {
  display: flex;
  flex-direction: row;
}
.stats-col {
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}
.stats-col.main {
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 100%;
  min-width: 600px;
  width: 100%;
  margin-top: 0;
  padding-top: 0;
  max-width: 33vw;
  flex-direction: column;
  z-index: 9999;
  margin-right: 0.7rem;
  justify-content: center;
  align-content: space-between;
  border-right: 1px solid;
  border-color: var(--border-light);
  background: rgb(7 8 12 / 26%);
  padding-left: 2rem;
  box-shadow: 10px 0px 44px rgba(0, 0, 0, 0.3);
  padding-right: 2rem;
}
.shadow-col {
  background: transparent;
  margin-top: 0;
  padding-top: 0;
  height: 100%;
  z-index: 9999;
  box-shadow: 40px 0px 40px 40px rgb(0, 0, 0, 40%);
  width: 0.01px;
  position: fixed;
  right: 0;
}
.stats-col.second {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 2.625rem;
}
.row.footer-area {
  width: 100%;
  background: rgb(7 8 12 / 25%);
  padding-top: 1rem;
  margin-left: 0.025rem;
  margin-right: 0.025rem;
  padding-bottom: 1rem;
  justify-content: center;
  border-top: 1px solid;
  border-color: var(--border-light);

}
.results-button {

}
.results-button {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 0;
  color: var(--inactive-color);
  text-transform: none;
  width: 20vw;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 0.5rem;

}
.results-button:hover {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.results-button:focus {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.results-button:active {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.results-button:focus-visible {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.results-button:active {
  background: transparent!important;
  box-shadow: none;
  border-radius: 0;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.img-test {
  max-width: 30%;
}
/*Общие стили контейнера*/
.container-fluid {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background: rgba(7, 18, 25, 0.75);
  border-radius: 30px;
  height: 90vh;
  width: 90vw!important;
  padding-left: 0;
  padding-right: 0;
  overflow-y: hidden!important;
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  overflow-x:hidden;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.row.buttons-area {
  width: 100%;
  padding-top: 1rem;
  margin-left: 0.025rem;
  margin-right: 0.025rem;
  border-bottom: 1px solid;
  border-color: var(--border-light);
  padding-bottom: 1rem;
}
.group-heading {
  text-align: left;
  margin-left: 2.5rem;
}
.container.stats-box{
  background: linear-gradient(181.35deg, rgba(255, 255, 255, 0.0994) 1.15%, rgba(255, 255, 255, 0) 98.91%);
  backdrop-filter: blur(35px);
  /* Note: backdrop-filter has minimal browser support */
  width: auto;
  height: auto;
  border-radius: 30px;
}
.container.stats {
  overflow-y: hidden;
  overflow-x: hidden;
  /*padding-top: 1rem!important;*/
  /*padding-bottom: 1rem!important;*/
  width: 100%;
  min-width: 100%;
  display: flex;
  align-items: center;
  /* padding-top: 1rem; */
  padding-bottom: 0;
  padding-right: 0;
  padding-left: 0;
  margin-left: 0.025rem;
  margin-right: 0.025rem;
  height: 100%!important;
  padding-bottom: 0;
}
/*Стили хедера*/
.header-area {
  width: 100%;
  background: rgb(7 8 12 / 26%);;
  padding-top: 1rem;
  margin-left: 0.025rem;
  margin-right: 0.025rem;
  border-bottom: 1px solid;
  border-color: var(--border-dark);
  padding-bottom: 1rem;
}
.logo-box {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 1.7rem;
}
.logo {
  width: 2rem;
  height: 2rem;
}
.logo-title {
  font-weight: 500;
  margin-right: 0.4rem;
  margin-left: 0.8rem;
  font-size: 0.9rem;
  margin-bottom: 0;
}
.logo-subtext {
  color: var(--inactive-color);
  font-size: 0.9rem;
}

/*Стили для групп*/
.groups {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  flex-direction: row;
  gap: 1rem;
  width: 70vw;
  margin-left: 1rem;
}
.menu-link {
  text-decoration: none;
  color: var(--inactive-color);
  border-bottom: 2px solid transparent;
  transition: 0.3s;
  font-size: 0.9rem;
}
.menu-link:hover {
  color: var(--active-color);
  border-bottom: 2px solid var(--active-color);
  font-weight: 500;
}
.menu-link:active {
  color: var(--active-color);
  border-bottom: 2px solid #ff0088;
  font-weight: 500;
}
.menu-link:focus {
  color: var(--active-color);
  border-bottom: 2px solid #ff0088;
  font-weight: 500;
}

/*Стили аватарки компании*/
.company {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin-right: 2.5rem;
}
.company-img {
  background-size: contain;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  margin: 0;
  margin-right: 1rem;
}
.company-name {
  margin-bottom: 0;
  margin-right: 1rem;
  color: rgba(255, 255, 255, 0.63);
  font-weight: 500;
  margin-left: 0.8rem;
  font-size: 0.9rem;
}
.company-name-separator {
  color: var(--inactive-color);
  font-size: 0.9rem;
  margin-bottom: 0;
  margin-right: 1rem
}
.exit {
  text-decoration: none;
  color: var(--inactive-color);
  font-size: 0.9rem;
}
.exit:hover {
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
}
.metrics {
  display: flex;
  margin-top: 1rem;
  gap: 2rem;
  margin-left: 2.5rem;
}
.metrics-button {
  background: linear-gradient(191.83deg, rgba(255, 255, 255, 0.16) -76.84%, rgba(255, 255, 255, 0) 91.78%);
  border-radius: 9px;
  color: white;
  text-decoration: none;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 1px solid;
  border-image: linear-gradient(rgba(255, 255, 255, 0.5) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(255, 255, 255, 0.54) 74.67%) 155.31;
}
.metrics-button:hover {
  border: 1px solid rgba(255, 255, 255, 0.54);
  -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
}
.metrics-button:focus {
  border: 1px solid rgba(255, 255, 255, 0.22);
  -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
  background: linear-gradient(191.83deg, #B275FF -76.84%, #DD7EFF 91.78%);
}
.negative-badge {
  color: #ff0088;
  font-size: 0.5rem;
  margin-right: 0.4rem;
  line-height: 2!important;
  margin-bottom: 0.3rem;

}
.group-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

</style>