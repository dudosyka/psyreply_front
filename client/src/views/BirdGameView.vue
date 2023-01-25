<template>
  <div class="mainbody" >
    <div class="main" id="mainpage">
      <img class="psy_picture" src="@/assets/games/img/psy.png">
      <hr>
      <h2 class ="big_text">Суть теста</h2>
      <p class="small_text">Следующий блок особо понравиться любителям CS:GO </p>
      <h2 class ="big_text ">Инструкция</h2>
      <p class="small_text">
        1. На экране будет появляться птичка (очень быстро)<br>
        2. Ваша задача - кликнуть по экрану в любом месте, как только увидели птичку<br>
        3. Мы зафиксируем скорость вашей реакции<br>
        4. В конце теста вы увидите свои результаты
      </p>
      <a type="submit" id="submit" class="gradient-button start-button">Начать</a>
    </div>
  </div>
  <div class="container">
    <img src="@/assets/games/img/bird.png" class="img-bird">
  </div>

  <div ref="click" class="container_click animate__animated animate__fadeIn animate__fadeOut" ></div>
  <div id="wrapper">
    <div class="graf">
      <img class="psy_picture" src="@/assets/games/img/psy.png">
      <h2 class ="big_text_graf">Ваш текущий результат</h2>
      <p id="meaning" class="small_text_graf">
        <div class="small_text_graf" id="average"></div>
      </p>
      <canvas id="line-chart"> </canvas>
      <h2 class ="big_text">Расшифровка</h2>
      <p class="small_text">Мы измерили скорость вашей реакции и сравним ее с результатами тестов, для их корректировки</p>
      <a type="success_1" id="success_1" class="gradient-button" @click="$emit('firstGameEnded')">Далее</a>

    </div>
  </div>

  <div class="main_after_test">
    <div class="after_test">
      <img class="psy_picture" src="@/assets/games/img/psy.png">
      <h2 class ="big_text">Ваш тест признан недействительным</h2>
      <p class="small_text">
        1. Перепройдите тест <br>

      </p>
      <a type="losetry" id="losetry" class="gradient-button">Пройти еще раз</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mainConf, {ProjectState} from "../../../main.conf";

export default {
  name: "BirdGameView",
  mounted() {
    const TimestampClick = []
    let bird = false;
    // bird on screen
    let uid = parseInt(localStorage.getItem('uid'))
    // bird on screen
    const query = window.location.href.split("?");
    if (query.length > 1) {
      uid = parseInt(query[1].split('=')[1])
      localStorage.setItem('uid', uid)
      window.location = "/";
    }
    function ShowImage() {

      bird = true;
      const birdTime = Date.now();
      const img = document.querySelector(".img-bird")
      img.style.display = 'block';
      document.addEventListener("click",()=>{
        const el = document.querySelector('.container_click')
        // const el = this.$res
        el.style.display = 'flex'
        setTimeout( () => {el.style.display = 'none'},1000)

        //TODO: ONE TIME IN A BIRD
        if (bird) {

          bird = false;
          const clickTime = Date.now();
          if (mainConf.projectState === ProjectState.dev)
            console.log(clickTime, birdTime);
          TimestampClick.push(clickTime - birdTime)
        }
      })
      const block = document.querySelector(".container")
      block.append(img)
      setTimeout(() => {
        img.style.display = 'none';
        // block.textContent = ""
      }, 100)
    }
//counter time
    let counter = 0
    function Clicker() {
      return new Promise(((resolve, reject) => {
        let a = setInterval(() => {
          counter++
          ShowImage()
          if (mainConf.projectState === ProjectState.dev)
            console.log(counter)

          if (counter == 10) {
            clearInterval(a)
            setTimeout(() => {
              resolve({TimestampClick})
            }, 1000);
          }
        }, 3000)
      }));



    }
    document.querySelector('.main_after_test').style.display = "none"
    document.querySelector(".container").style.display = "none"
    document.querySelector("#wrapper").style.display = "none"
    document.querySelector(".graf").style.display = "none"

    document.querySelector("#submit").onclick = function(){
      document.querySelector(".container").style.display = "flex"
      document.querySelector("#mainpage").style.display = "none"
      document.querySelector(".mainbody").style.display = "none"

      Clicker()
          .then(
              data => {
                //TODO: Show graphic
                const goodData = data.TimestampClick.map((el, key) => {
                  return el - 3000 * key;
                })
                let x = 0;
                goodData.map(i => x += i)
                var meaning = Math.floor(x/goodData.length);
                if (mainConf.projectState === ProjectState.dev) {
                  console.log(goodData)
                  console.log(meaning)
                }


                //TODO:  условие на адекватность
                var mediana = goodData[1];
                var average = Math.floor((goodData[3] + goodData[4] + goodData[5] + goodData[6] + goodData[7] + goodData[8] + goodData[9]) /7)
                if (mainConf.projectState === ProjectState.dev)
                  console.log(mediana);
                let flag = true;
                for (let i = 3; i < goodData.length; i += 1) {
                  if (Math.abs(goodData[i]-mediana) <=3000){
                    flag = false;
                  }
                }
                const el = document.querySelector('#wrapper')
                el.style.display = 'flex'
                document.querySelector(".container").style.display = "none";
                document.querySelector(".graf").style.display = "flex";
                document.querySelector(".container_click").style.height = "0vh" ;
                document.querySelector(".container_click").style.width = "0vh" ;
                document.getElementById("average").innerHTML = meaning;
                // document.querySelector("#success_1").onclick = function(){
                //   location.reload()
                // }
                if (goodData.length >= 0){

                  //TODO: grafic
                  new ChartJs(document.getElementById("line-chart"), {
                    type: 'line',
                    data: {
                      labels: [1,2,3,4,5],
                      datasets: [{
                        data: [goodData[0],goodData[1],goodData[2],goodData[3],goodData[4]],
                        label: "время реакции в милисекундах",
                        borderColor: "#c10c8e",
                        fill: false,
                        backgroundColor: "#0bff76",

                      }]

                    },
                    options: {
                      title: {
                        display: true,
                        text: 'Твои лучшие попытки',

                      }
                    }
                  });
                  axios.post("https://hook.eu1.make.com/od2wlwkp3peiuwzphod9h4u4ninu3dp4", {
                    result: meaning,
                    uid: uid,
                  }).then(res => {
                    if (mainConf.projectState === ProjectState.dev)
                      console.log(res)
                  }).catch(err => {
                    if (mainConf.projectState === ProjectState.dev)
                      console.error(err)
                  })
                  if (mainConf.projectState === ProjectState.dev)
                    console.log(goodData);
                }
                else {
                  document.querySelector('.main_after_test').style.display = "flex";
                  document.querySelector(".container").style.display = "none";
                  document.querySelector("#wrapper").style.display = "none";
                  document.querySelector(".graf").style.display = "none";
                  document.querySelector(".container_click").style.display = "none";
                  document.querySelector(".container_click").style.height = "0vh" ;
                  document.querySelector(".container_click").style.width = "0vh" ;
                  document.querySelector("#losetry").onclick = function(){
                    location.reload()
                  }

                }
              }
          )
    }
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
  display: block;
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


.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
}
.container_click{
  display: none;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  box-shadow: 0px 0px 100px #0bff76;
  position: fixed;
  z-index: 999;
  left: 0rem;
}

.graf{
  width: 70vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(86.16deg, rgba(255, 255, 255, 0.144) 11.14%, rgba(255, 255, 255, 0.0252) 113.29%);
  border-radius: 29px;
  padding: 1em;
  border: 2px solid rgba(255, 255, 255, 0.38);
}
.main{
  /*width: 50vw;*/
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
  content:url("@/assets/games/img/psy.png") !important;
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
.main_after_test {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20vh;
  margin-bottom: 20vh;
}
.after_test {
  width: 30vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(86.16deg, rgba(255, 255, 255, 0.144) 11.14%, rgba(255, 255, 255, 0.0252) 113.29%);
  border-radius: 29px;
  padding: 30px;
  border: 2px solid rgba(255, 255, 255, 0.38);

}
#wrapper{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  min-width: 50%;
  padding-top: 0.5em;
}
.big_text_graf{
  width: 100%;
  color: aliceblue;
  font-size: 1.2rem;
  font-family: 'Rubik', sans-serif;
  text-align: center;
}
.small_text_graf{
  width: 100%;
  color: aliceblue;
  font-size: 1rem;
  font-family: 'Rubik', sans-serif;
  padding: 0.2em;
  text-align: center;
}
.img-bird {
  display: none;
  content:url("@/assets/games/img/bird.png");
}
.start-button{
  cursor: pointer ;
}
</style>
