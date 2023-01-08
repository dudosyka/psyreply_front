<template>
  <div class="mainbody" >
    <div class="main" id="mainpage">
      <img class="psy_picture" src="@/assets/games/img/psy.png">
      <hr>
      <h2 class ="big_text">Суть теста</h2>
      <p class="small_text">Следующий блок измерит вашу среднюю скорость</p>
      <h2 class ="big_text ">Инструкция</h2>
      <p class="small_text">
        1. На экране будет круг<br>
        2. У вас будет 10 секунд для того чтобы клинкуть по картинке максимальное количество раз<br>
        3. Первый клик необходимо произвести в центр круга<br>
        4. Вы будете видеть оставшееся время <br>
        5. В конце теста Вы увидите свои результаты
      </p>
      <a type="submit" id="submit" class="gradient-button">Начать</a>
    </div>
  </div>
  <div class="rer">
    <div id="app2">
      <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                :class="`base-timer__path-remaining ${color}`"
                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">{{timeFormatted}}</span>
      </div>
    </div>
    <div class="content">
      <div v-for="circle in circles" :key="circle" class='circle' :style='`left:${posX}px;top:${posY}px`'></div>
    </div>
  </div>
  <div class="secondbody" >
    <div class="main" id="secondpage">
      <img class="psy_picture" src="@/assets/games/img/psy.png">
      <hr>
      <h2 class ="big_text">Вторая попытка</h2>
      <p class="small_text">Все отлично, смело приступайте ко второй попытке</p>
      <h2 class ="big_text">Суть теста</h2>
      <p class="small_text">Следующий блок измерит вашу среднюю скорость</p>
      <h2 class ="big_text ">Инструкция</h2>
      <p class="small_text">
        1. На экране будет круг<br>
        2. У вас будет 10 секунд для того чтобы клинкуть по картинке максимальное количество раз<br>
        3. Первый клик необходимо произвести в центр круга<br>
        4. Вы будете видеть оставшееся время <br>
        5. В конце теста Вы увидите свои результаты
      </p>
      <a type="submit1" id="submit1" class="gradient-button">Начать</a>
    </div>
  </div>
  <div class="thirdbody" >
    <div class="main" id="thirdpage">
      <img class="psy_picture" src="@/assets/games/img/psy.png">
      <hr>
      <h2 class ="big_text">Третья попытка</h2>
      <p class="small_text">Все отлично, смело приступайте к третьей попытке</p>
      <h2 class ="big_text">Суть теста</h2>
      <p class="small_text">Следующий блок измерит вашу среднюю скорость</p>
      <h2 class ="big_text ">Инструкция</h2>
      <p class="small_text">
        1. На экране будет круг<br>
        2. У вас будет 10 секунд для того чтобы клинкуть по картинке максимальное количество раз<br>
        3. Первый клик необходимо произвести в центр круга<br>
        4. Вы будете видеть оставшееся время <br>
        5. В конце теста Вы увидите свои результаты
      </p>
      <a type="submit" id="submit2" class="gradient-button">Начать</a>
    </div>
  </div>

  <div class="finalbody" >
    <div class="main" id="finalpage">
      <img class="psy_picture" src="@/assets/games/img/psy.png">
      <canvas id="line-chart"></canvas>
      <a type="submit" id="submit3" class="gradient-button">Начать</a>
    </div>
  </div>
</template>

<script>
import mainConf, {ProjectState} from "../../../main.conf";

export default {
  name: "ClickGameView",
  data() {
    return {
      timePassed: 0,
      timeLeft: 10,
      try1: 0,
      try2: 0,
      try3: 0,
      circles: [],
      posX: 0,
      posY: 0
    }
  },
  computed: {
    timeFormatted() {
      let seconds = this.timeLeft % 60;

      if (seconds < 5) {

      }

      return `${seconds}`;
    },
    color() {
      const WARNING_THRESHOLD = 10;
      const ALERT_THRESHOLD = 5;

      const COLOR_CODES = {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: WARNING_THRESHOLD
        },
        alert: {
          color: "red",
          threshold: ALERT_THRESHOLD
        }
      };
      const { alert, warning, info } = COLOR_CODES;
      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color
      } else {
        return info.color;
      }
    }
  },
  methods: {
    shine(){
      $(".content").mousemove((e) => {
        this.posX = e.pageX - 250;
        this.posY = e.pageY - 200;
      });

      $(".content").click(() => {
        this.circles.push(1)
      });

    },
    timering(){
      const TIME_LIMIT = 10;
      this.timePassed = 0;
      this.timeLeft = TIME_LIMIT;
      this.timerInterval = null;

      document.getElementById("app2").style.display = "block";

      this.startTimer();
    },
    onTimesUp() {
      clearInterval(this.timerInterval);
    },
    startTimer() {
      const TIME_LIMIT = 10;
      const FULL_DASH_ARRAY = 283;
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = TIME_LIMIT - this.timePassed;


        let rawTimeFraction = this.timeLeft / TIME_LIMIT;
        rawTimeFraction = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);

        const circleDasharray = `${(
            rawTimeFraction * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);


        if (this.timeLeft === 0) {
          this.onTimesUp();
        }
      }, 1000);
    },
    test1() {
      const data = this;
      return new Promise(((resolve,regect) => {document.querySelector("#submit").onclick = function () {
        document.querySelector(".mainbody").style.display = "none"
        document.querySelector(".rer").style.display = "flex"

        setTimeout(() => {resolve(data.try1)},10300);
        data.timering();
        data.shine()
        document.querySelector(".rer").addEventListener("click", () => {
          data.try1 += 1;

        })
      }

      }));
    },
    test2() {
      const data = this;
      return new Promise(((resolve,regect) => {document.querySelector("#submit1").onclick = function () {
        document.querySelector(".mainbody").style.display = "none"

        document.querySelector(".secondbody").style.display = "none"

        document.querySelector("#app2").style.display = "flex"
        document.querySelector(".rer").style.display = "flex"
        setTimeout(() => {resolve(data.try2)},10300);
        data.timering();
        document.querySelector(".rer").addEventListener("click", () => {
          data.try2 += 1;

        })
      }

      }));
    },
    test3() {
      const data = this;
      return new Promise(((resolve,regect) => {document.querySelector("#submit2").onclick = function () {
        document.querySelector(".mainbody").style.display = "none"

        document.querySelector(".secondbody").style.display = "none"
        document.querySelector(".thirdbody").style.display = "none"
        document.querySelector(".rer").style.display = "flex"
        document.querySelector("#app2").style.display = "flex"

        setTimeout(() => {resolve(data.try3)},10300);
        data.timering();
        document.querySelector(".rer").addEventListener("click", () => {
          data.try3 += 1;

        })
      }

      }));
    },
  },
  mounted() {
//переход на 2 экран по кнопке + старт таймера + счет кликов

    this.test1()
        .then(
            data => {
              if (mainConf.projectState === ProjectState.dev) {
                console.log('test1_countnm ')
                console.log(this.try1)
              }
              localStorage.setItem("try1",this.try1)
              document.querySelector(".rer").style.display = "none"
              document.querySelector(".mainbody").style.display = "none";
              document.querySelector("#app2").style.display = "none";
              document.querySelector(".secondbody").style.display = "flex"
              this.circles = [];
            }
        )
//переход на 4 экран по кнопке + старт таймера + счет кликов

    this.test2()
        .then(
            data => {
              if (mainConf.projectState === ProjectState.dev) {
                console.log('test2_countnm ')
                console.log(this.try2)
              }
              localStorage.setItem("try2",this.try2)
              document.querySelector(".rer").style.display = "none"
              document.querySelector(".mainbody").style.display = "none";
              document.querySelector("#app2").style.display = "none";
              document.querySelector(".secondbody").style.display = "none"
              document.querySelector(".thirdbody").style.display = "flex"
              this.circles = [];
            }
        )

    this.test3()
        .then(
            data => {
              this.try1=parseInt(localStorage.getItem("try1"))
              this.try2=parseInt(localStorage.getItem("try2"))
              let SashaZaebal = Math.round((this.try1+this.try2+this.try3)/3)
              if (mainConf.projectState === ProjectState.dev)
                console.log('test3_countnm ', this.try3)

              if (mainConf.projectState === ProjectState.dev)
                console.log(SashaZaebal)
              document.querySelector(".rer").style.display = "none"
              document.querySelector(".mainbody").style.display = "none";
              document.querySelector("#app2").style.display = "none";
              document.querySelector(".secondbody").style.display = "none";
              document.querySelector(".thirdbody").style.display = "none";
              document.querySelector(".finalbody").style.display = "flex"
              this.circles = [];
              new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                  labels: [1,2,3],
                  datasets: [{
                    data: [this.try1,this.try2,this.try3],
                    label: "количество кликов за 10 секунд",
                    borderColor: "#c10c8e",
                    fill: false,
                    backgroundColor: "#0bff76",

                  }]

                },
                options: {
                  title: {
                    display: true,
                    text: 'Твои результаты',

                  }
                }
              });
              // var myHeaders = new Headers();
              // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInRva2VuVHlwZSI6MiwiYmxvY2tJZCI6MTA0LCJ3ZWVrIjoxLCJpYXQiOjE2NzAzNjY1MTQsImV4cCI6MTY3OTAwNjUxNH0.JQqG8O2TcEcC26B6u2Td2w26f-A-r4T18SG7HHFYoEA");
              // myHeaders.append("Content-Type", "application/json");
              //
              // var raw = JSON.stringify({
              //     "metric_id": 2,
              //     "value": SashaZaebal
              // });
              //
              // var requestOptions = {
              //     method: 'POST',
              //     headers: myHeaders,
              //     body: raw,
              //     redirect: 'follow'
              // };
              //
              // fetch("https://api.psyreply.com/game", requestOptions)
              //     .then(response => response.text())
              //     .then(result => console.log(result))
              //     .catch(error => console.log('error', error));
            }
        )
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  *{
    margin: 0;
    padding: 0;
  }

  body{
    background-image: url("@/assets/games/img/bg_main.jpg");
    user-select: none;
    display: flex;
    justify-content: center;
  }

  .mainbody {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
  }

  .main{
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(86.16deg, rgba(255, 255, 255, 0.144) 11.14%, rgba(255, 255, 255, 0.0252) 113.29%);
    border-radius: 29px;
    padding: 1em;
    border: 2px solid rgba(255, 255, 255, 0.38);
    min-width: 60vw;
    min-height: 300px;
  }

  .gradient-button {
    text-decoration: none;
    display: inline-block;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.35);
    padding: 15px 15px;
    margin: 10px 20px;
    border-radius: 10px;
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    background-image: linear-gradient(to right, #ba0bff 0%, #ff8edf 51%, #a60bff 100%);
    background-size: 200% auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    transition: .5s;
    font-size: 1rem;
  }

  .gradient-button:hover {
    background-position: right center;
  }

  .psy_picture{
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    height: auto;
    width: 250px;
    margin-bottom: 20px;
  }

  .big_text{
    width: 100%;
    color: aliceblue;
    font-size: 1.2rem;
    font-family: 'Rubik', sans-serif;
    text-align: left;
  }

  .small_text{
    width: 100%;
    color: aliceblue;
    font-size: 1rem;
    font-family: 'Rubik', sans-serif;
    padding: 20px;
  }

  hr {
    width: 100%;
    border-color: rgba(255, 255, 255, 0.25);
    margin-bottom: 20px;
  }
  .rer{
    display: none;
    justify-content: center;
    align-items: center;
    padding-top: 5rem;
  }



  /*таймер*/
  #app2{
    display: none;
    padding-top: 1rem;
    position: fixed;
    padding-top: 30rem;
  }

  .base-timer {
    position: relative;
    width: 15rem;
    height: 15rem;
  }

  .base-timer__svg {
    transform: scaleX(-1);
  }

  .base-timer__circle {
    fill: none;
    stroke: none;
  }

  .base-timer__path-elapsed {
    stroke-width: 0.4375em;
    stroke: #6e139f;
  }

  .base-timer__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
  }

  .base-timer__path-remaining.green {
    color: rgb(65, 184, 131);
  }

  .base-timer__path-remaining.orange {
    color: orange;
  }

  .base-timer__path-remaining.red {
    color: red;
  }

  .base-timer__label {
    position: absolute;
    width: 15rem;
    height: 15rem;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #a60bff;
  }

  .secondbody {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
  }
  .thirdbody {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
  }
  .finalbody {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
  }

  .content {
    height: 80vh;
    width: 80vw;
    position: fixed;
    text-align: center;
  }

  .content > div {
    height: 100px;
    width: 100px;
    background-color: rgba(217, 56, 175, 0.55);
    position: absolute;
    border-radius: 50%;
    animation: scaleCircle 1s linear;
    animation-fill-mode: forwards;
    opacity: 0.3;
  }

  @keyframes scaleCircle {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(30);
      opacity: 0;
    }
  }
</style>
