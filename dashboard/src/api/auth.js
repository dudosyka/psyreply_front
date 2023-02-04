import axios from "axios";

import apiConf from "@/api/api.conf";


const Admin = {}

Admin.auth = async function(email,password){
    console.log('регистрация успешна')
    const req = axios.post(`${apiConf.endpoint}/auth/dash`,{"email" : email, "password" : password})
    req.then(localStorage.setItem('token',(await req).data.body.token))
    return req
}
Admin.checkAuth = function () {
    const token = localStorage.getItem('token')
    return token != null
}
Admin.getToken = function (){
    return localStorage.getItem('token')
}
export default Admin