<template>
<!--  Основной контейнер-->
<div class="container-fluid animate__animated animate__fadeIn">
  <!--  Ряд с хедером-->
  <div class="row header-area">
    <!--    Левая колонка с логотипом Reply-->
    <div class="col logo-box">
      <img class="logo header-logo" src="data:image/png;base64,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" data-v-c1beedde="">
      <h6 class="logo-title" data-v-c1beedde="">Reply 2.0</h6>
      <span class="logo-subtext" data-v-c1beedde="">| Dashboard</span>
    </div>
    <!--    Левая колонка с логотипом Reply кончилась-->
    <!--    Правая колонка с аватаркой компании-->
    <div class="col company">
      <h6 class="company-name">AGAVA</h6>
      <div class="container company-img"></div>
      <h6 class="company-name-separator">| </h6>
      <a class="exit" @click.prevent="exit" href="#">Выход</a>
    </div>
    <!--    Правая колонка с аватаркой компании кончилась-->
  </div>
  <!--  Ряд с хедером кончился-->


  <div class="row buttons-area">
    <!--    Центральная колонка с группами-->
    <div class="col groups">
      <div class="group-item">
        <a class="menu-link" href="#">Общая</a>
      </div>
      <div class="group-item">
        <a class="menu-link" href="#">Key Staff</a>
      </div>
      <div class="group-item">
        <i class="fa-solid fa-circle negative-badge"></i>
        <a class="menu-link" href="#">Группа 1</a>
      </div>
      <div class="group-item">
        <a class="menu-link" href="#">Группа 2</a>
      </div>
      <div class="group-item">
        <a class="menu-link" href="#">Группа 3</a>
      </div>

    </div>
    <!--    Центральная колонка с группами кончилась-->
  </div>
  <div class="row stats">
  <StatsBlock id="1" />
</div>
  <div class="row footer-area">
  <button class="btn btn-primary results-button"><i class="fa-solid fa-clock-rotate-left"></i> Показать старые результаты</button>
</div>
</div>
<!--  Основной контейнер кончился-->
</template>

<script>
import StatsBlock from "@/components/StatsBlock.vue";
import router from "@/router";

export default {
  name: "ContainerBlock",
  components: {StatsBlock},
  methods:{
    exit(){
      router.push('/')
      console.log(localStorage)
    }
  }
}
</script>

<style scoped>
.row.footer-area {
  width: 100%;
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
  background: var(--acrylic-blur-light);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  height: 80vh;
  max-width: 90vw;
  margin-left: 1rem;
  padding-left: 0;
  padding-right: 0;
  margin-right: 1rem;
  width: auto;
  overflow-y: hidden!important;
  border: 1px solid;
  border-color: var(--border-dark);
  margin-top: 6rem;
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
.row.stats {
  overflow-y: hidden;
  margin-top: 0;
  height: 100%;
  min-height: 60vh;
  padding-left: 1rem;
}
/*Стили хедера*/
.header-area {
  width: 100%;
  background: var(--acrylic-blur-dark);
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
  background-image: url("@/assets/company_logo.png");
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
}
</style>