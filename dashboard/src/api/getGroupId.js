import axios from "axios";
import apiConf from "@/api/api.conf";
import store from "@/store";


const Group = {}

Group.getId = async function(token){
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    const req = axios.get(`${apiConf.endpoint}/company/stat/groups`, {headers})
    req.then(store.commit(req))

    // req.then(localStorage.setItem('groupId',(await req).data.body[0].id))
    console.log(store)
    return req
}

export default Group