import axios from "axios";
import apiConf from "@/api/api.conf";

const Results = {}

Results.get = async function(token,groupId){
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    console.log('данные получены')
    const req = axios.get(`${apiConf.endpoint}/company/stat/${groupId}`,{headers})
    console.log(req)
    return req
}
export default Results