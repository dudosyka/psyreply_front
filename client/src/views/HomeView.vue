<template>
  <div class="main">
    <div class="container form-bg" id="registration">
      <div class="row">
        <h1>Регистрация</h1>
      </div>
      <label class="label" for="name">ФИО</label>
      <input class="input" type="text" id="name" name="name">
      <label class="label" for="email">Адрес эл. почты</label>
      <input class="input" type="email" id="email" name="email">
      <label class="label" for="password">Придумайте пароль</label>
      <input class="input" type="password" id="password" name="password">
      <label class="label" for="password">Повторите пароль</label>
      <input class="input" type="password" id="password" name="password">

      <div class="row">
        <button class="btn">
          Продолжить
        </button>
      </div>
    </div>
    <div class="container form-bg" id="approve">
      <div class="row heading-row">
        <h1>Подтверждение регистрации</h1>
      </div>
      <p class="approve-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda at culpa est ratione tempore!</p>
      <input class="input" type="text" id="code" name="code">
      <div class="row row-buttons">
        <button class="btn-back">
          <i class="arrow-back fa-sharp fa-solid fa-arrow-left"></i>
        </button>
        <button class="btn">
          Подтвердить
        </button>
      </div>
    </div>
    <div class="container form-bg" id="profile">
      <div class="row">
        <h1>Профиль</h1>
      </div>
      <hr class="hr">
      <label class="label" for="name">ФИО</label>
      <span class="info-text">Lorem ipsum dolor.</span>
      <hr class="hr">
      <label class="label" for="email">Адрес эл. почты</label>
      <span class="info-text">Lorem ipsum dolor.</span>
      <hr class="hr">
      <div class="row">
        <button class="btn">
          <i class="dashboard-icon fa-solid fa-chart-line"></i> Дашборд
        </button>
      </div>
    </div>
  </div>
</template>

<script>



export default {

  name: 'HomeView',
  components: {


  }
}
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;;
}
.form-bg {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 30vw;
}
.label {
  font-size: 1.5rem;
}
.input {
  font-size: 1.5rem;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  height: 2rem;
  text-align: center;
  color: white;
  transition: 0.3s;
}
.input:focus {
  font-size: 1.5rem;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.47);
  border-radius: 6px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  height: 2rem;
  text-align: center;
}
.btn {
  background-color: #a73af0;
  font-size: 1rem;
  border: none;
  padding: 8px 26px;
  color: #fff;
  border-radius: 6px;
  margin-top: 16px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}
.btn:hover {
  background: #841ef1;
}
.heading-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}
.approve-text {
  text-align: center;
}
.arrow-back {
  font-size: 1rem;
}
.btn-back {
  background-color: rgba(178, 178, 178, 0.21);
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px;
  color: #fff;
  border-radius: 6px;
  margin-top: 16px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}
.btn-back:hover {
  background: #841ef1;
}
.row-buttons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
.dashboard-icon {
  font-size: 1rem;
}
.exit-icon {
  font-size: 1rem;
}
hr {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}
</style>