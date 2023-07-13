<template>
    <div class="main">
        <div class="container form-bg" id="registration" v-if="this.$route.name === 'signup'">
            <div class="row">
                <h1>Регистрация</h1>
            </div>
            <img class="avatar-img" src="@/assets/pfp.png"/>
            <label for="avatar">Загрузить фото</label>
            <input type="file"
                   id="avatar" name="avatar" @change="getFile($event)"
                   accept="image/png, image/jpeg">
            <label class="label" for="name">ФИО</label>
            <input class="input" type="text" id="name" name="name" v-model.trim="formData.fullName">
            <label class="label" for="email">Адрес эл. почты</label>
            <input class="input" type="email" id="email" name="email" v-model.trim="formData.email">
            <label class="label" for="phone">Моб. телефон</label>
            <input class="input" type="phone" id="phone" name="phone" v-model.trim="formData.phone">
            <label class="label" for="password">Придумайте пароль</label>
            <input class="input" type="password" id="password" name="password" v-model.trim="formData.password">
            <label class="label" for="password">Повторите пароль</label>
            <input class="input" type="password" id="password" name="password" v-model.trim="formData.doublePassword">

            <div class="row column">
                <button class="btn" @click="checkValid">
                    Создать аккаунт
                </button>
                <button class="btn" @click="this.$router.push({name: 'login'})">
                    Войти
                </button>

            </div>
        </div>
        <div class="container form-bg" id="registration" v-if="this.$route.name === 'login'">
            <img class="avatar-img" src="@/assets/pfp.png"/>
            <div class="row">
                <h1>Авторизация</h1>
            </div>
            <label class="label" for="email">Адрес эл. почты</label>
            <input class="input" type="email" id="email" name="email" v-model.trim="formData.email">
            <label class="label" for="password">Пароль</label>
            <input class="input" type="password" id="password" name="password" v-model.trim="formData.password">

            <div class="row column">
                <button class="btn" @click="login">
                    Войти
                </button>
                <button class="btn" @click="this.$router.push({name: 'signup'})">
                    Создать аккаунт
                </button>
            </div>
        </div>
        <div class="container form-bg" id="profile" v-if="this.$route.name === 'profile'">
            <div class="row">
                <h1 @click="drop">Профиль</h1>
            </div>
            <hr class="hr">
            <img class="avatar-img" src="@/assets/pfp.png"/>
            <label class="label" for="name">ФИО</label>
            <span class="info-text"> {{user.fullName}} </span>
            <label class="label" for="email">Адрес эл. почты</label>
            <span class="info-text"> {{user.email}} </span>
            <hr class="hr">
            <div class="row column">
                <button class="btn">
                    <i class="dashboard-icon fa-solid fa-chart-line"></i> Дашборд
                </button>
                <button class="btn exit-btn" @click="logout">
                     Выйти из аккаунта
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import {Auth, SignIn} from "@/api/Authorization/Auth";
import {GetUserData} from "@/api/Authorization/GetUserData";

const auth = new Auth();
const signIn = new SignIn();
const getUserData = new GetUserData();

export default {
    name: 'HomeView',
    components: {},
    data() {
        return {
            formData: {
                file: null,
                fullName: null,
                email: null,
                phone: null,
                password: null,
                doublePassword: null,
            },
            user: {
                fullName: null,
                email: null,
                phone: null,
            }
        }
    },
    methods: {
        drop() {
          localStorage.removeItem('token')
        },
        getFile(event) {
            this.formData.file = event.target.files[0];
        },
        async getUserData() {
            const Data = await getUserData.getProfile()
            const user = this.user;

            user.fullName = Data.fullname
            user.email = Data.email
            user.phone = Data.phone
        },
        checkValid() {
            const formData = this.formData

            //validation should be redone normally, but so far so
            if (formData.fullName === null)
                this.$store.commit('openErrorPopup', 'Введите ФИО!');
            else if (formData.email === null || !formData.email.includes('@'))
                this.$store.commit('openErrorPopup', 'Неверный адрес эл. почты!');
            else if (formData.phone === null || formData.phone.length < 11)
                this.$store.commit('openErrorPopup', 'Неверный номер телефона!');
            else if (formData.password !== formData.doublePassword)
                this.$store.commit('openErrorPopup', 'Пароли не совпадают!');
            else if (!formData.file)
                this.$store.commit('openErrorPopup', 'Загрузите фото профиля!');
            else
                this.signUp()
        },
        async signUp() {
            let fd = new FormData();

            fd.append("email", this.formData.email);
            fd.append("phone", this.formData.phone);
            fd.append("password", this.formData.password);
            fd.append("fullname", this.formData.fullName);
            fd.append("file", this.formData.file);

            await auth.signUp(fd, this.$route.params.telegramId, this.$route.params.botId)
                .catch(err => {
                    if (err.request.status === 409){
                        this.$store.commit('openErrorPopup', 'Пользователь с такими данными уже существует!');
                        this.$router.push({name: 'login'})
                    }
                })

            if (localStorage.getItem('token') !== null)
                this.$router.push({name: 'profile'})
        },
        async login() {
            const email = this.formData.email;
            const password = this.formData.password;

            await signIn.login(email, password)
                .catch(err => {
                    if (err.request.status === 403)
                        this.$store.commit('openErrorPopup', 'Неверные логин или пароль!')
                })

            if (localStorage.getItem('token') !== null)
                this.$router.push({name: 'profile'})

            await this.getUserData();
        },
        logout() {
            //deleting previous user data
            localStorage.removeItem('token')
            Object.keys(this.formData).forEach(key => (delete this.formData[key]))

            this.$router.push({name: 'signup'})
        }
    },
    created() {
        if (this.$route.name === 'profile')
            this.getUserData()
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
    margin: 2rem 0;
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

.avatar-img {
    border-radius: 50%;
    height: 120px;
    width: 120px;
}

.column {
    display: flex;
    flex-direction: column;
}
</style>
