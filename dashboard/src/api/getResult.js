import axios from "axios";
import apiConf from "@/api/api.conf";

const Results = {}

Results.get = async function(token){
    const headers = {
        "Authorization": `Bearer ${token}`,
    };
    console.log('данные получены')
    const req = axios.get(`${apiConf.endpoint}/company/stat/82/11`,{headers})
    return req
}
export default Results