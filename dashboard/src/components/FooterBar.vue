<template>
  <!--Навигация-->
  <nav class="navbar fixed-bottom navbar-light animate__animated animate__slideInUp">
    <div class="col">
      <!--Видеокнопка-->
      <div class="btn btn-primary btn-group dropup" id="button-bg">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="groups-icon fa-solid fa-user-group"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            Общая
          </li>
          <li>
            Key Staff
          </li>
          <li>
            Группа 1
          </li>
          <li>
            Группа 2
          </li>
          <li>
            Группа 3
          </li>
        </ul>
      </div>
      <!--Видеокнопка кончилась-->

      <!--Видеокнопка-->
      <div class="btn btn-primary btn-group dropup" id="button-bg">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="groups-icon fa-solid fa-chart-pie"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            Общая
          </li>
          <li>
            Key Staff
          </li>
          <li>
            Группа 1
          </li>
          <li>
            Группа 2
          </li>
          <li>
            Группа 3
          </li>
        </ul>
      </div>
      <!--Видеокнопка кончилась-->

      <!--Видеокнопка-->
      <div class="btn btn-primary btn-group dropup" id="button-bg">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="groups-icon fa-solid fa-user-group"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            Общая
          </li>
          <li>
            Key Staff
          </li>
          <li>
            Группа 1
          </li>
          <li>
            Группа 2
          </li>
          <li>
            Группа 3
          </li>
        </ul>
      </div>
      <!--Видеокнопка кончилась-->

      <!--Видеокнопка-->
      <div class="btn btn-primary btn-group dropup" id="button-bg">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="groups-icon fa-solid fa-video"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            Общая
          </li>
          <li>
            Key Staff
          </li>
          <li>
            Группа 1
          </li>
          <li>
            Группа 2
          </li>
          <li>
            Группа 3
          </li>
        </ul>
      </div>
      <!--Видеокнопка кончилась-->
    </div>
        <!--Кол-во недель кончилось-->
<!--    <div class="col copyright">-->
<!--      &lt;!&ndash; Текст копирайта&ndash;&gt;-->
<!--      <p class="copyright-text">Reply 2023</p>-->
<!--      &lt;!&ndash;Текст копирайта кончился&ndash;&gt;-->
<!--    </div>-->
    <!--Колонка копирайта справа кончилась-->
  </nav>
  <!--  Навигация закончилась-->
</template>

<script>
export default {
  name: "FooterBar"
}
</script>

<style scoped>
/*Общие стили панели*/
.navbar {
  background: var(--acrylic-blur-dark);
  border-top: 2px solid;
  border-color: var(--border-dark);
  backdrop-filter: blur(20px);
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
}
/*Стили кнопки*/
.btn {
  background: transparent;
  border: 1px solid;
  border-color: transparent;
  font-weight: 400;
}
.btn:hover {
  background: transparent;
  border-radius: 7px;
  border: 1px solid;
  border-color: transparent;
}
.btn:focus-visible {
  background: var(--acrylic-blur-dark);
  border-radius: 7px;
  border: 1px solid;
  border-color: var(--border-dark);
}
.btn:active {
  background: transparent!important;
  border-radius: 7px;
  border: 1px solid!important;
  border-color: transparent!important;
}

.dropdown-toggle:hover {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 7px;
  border: 1px solid;
  border-color: var(--border-dark);
}
.dropdown-toggle:focus {
  background: var(--acrylic-blur-dark);
  border-radius: 7px;
  border: 1px solid;
  border-color: var(--border-dark);
}
.dropdown-toggle:active {
  background: var(--acrylic-blur-dark);
  border-radius: 7px;
  border: 1px solid;

}
.dropup .dropdown-menu {
  padding: 1rem;
  background-color: var(--acrylic-blur-dark);
  color: white;
  border-radius: 7px;
  border: 1px solid;
  border-color: var(--border-dark);
  backdrop-filter: blur(20px);

}

/*Вертикальный разделитель*/
.vhr {
  width: 1px;
  background-color: rgba(255, 255, 255, 0.29);
  height: 2rem;
  float: left;
}

/*Стили процента прошедших*/
.counter {
  color: lawngreen;
  font-weight: 700;
}

/*Стили правой колонки копирайта*/
.copyright {
  display: flex;
  flex-direction: row;
}
.copyright-text {
  color: rgba(255, 255, 255, 0.34);
}

/*Отключаю внешние отсупы у параграфов*/
p {
   margin: 0;
 }
.groups-icon {
  font-size: 1.5rem;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all .5s!important;
}
.groups-icon:hover {
  background: -webkit-linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text!important;
  -webkit-text-fill-color: transparent!important;
  transition: all .5s!important;
}
.dropup .dropdown-toggle::after {
  display: none;
}
#button-bg {
  padding: 0;
  transition: all .5s!important;
}
#button-bg:hover {
  box-shadow: 0 8px 9px -4px rgba(111, 59, 202, 0.3), 0 4px 18px 0 rgba(154, 59, 202, 0.2);
  transition: all .5s!important;
}
#button-bg:focus {
  box-shadow: 0 8px 9px -4px rgba(111, 59, 202, 0.3), 0 4px 18px 0 rgba(154, 59, 202, 0.2);
}
#button-bg:active {
  box-shadow: 0 8px 9px -4px rgba(111, 59, 202, 0.3), 0 4px 18px 0 rgba(154, 59, 202, 0.2);
}
#button-bg:target {
  box-shadow: 0 8px 9px -4px rgba(111, 59, 202, 0.3), 0 4px 18px 0 rgba(154, 59, 202, 0.2);
}
#button-bg:focus-within {
  box-shadow: 0 8px 9px -4px rgba(111, 59, 202, 0.3), 0 4px 18px 0 rgba(154, 59, 202, 0.2);
}
.popup-bg {
width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
}
.animate__slideInUp {
  animation-duration: 0.5s;
}
</style>