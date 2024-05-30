import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { cookies } from 'next/headers'


const axiosService = axios.create({
    baseURL : "http://127.0.0.1:8000//api/",
    headers : {
        "Content-Type":"application/json",
    }
})



axiosService.interceptors.request.use(async(config)=>{
    const cookieStore = cookies()
    const {access} = JSON.parse(cookieStore.get("auth"));
    config.headers.Authorization = `Bearer ${access}`
    return config
})

axiosService.interceptors.response.use(
    (res) => Promise.resolve(res) ,
    (err) => Promise.reject(err)
)

const refreshAuthLogic = async(failedRequest) =>{
    const cookieStore = cookies()
    const data = JSON.parse(cookieStore.get("auth"))
    
    const {refresh,user_id} = data 
    return axios.post("/token/refresh/",data,{
        baseURL : `http://127.0.0.1:8000/api/`,
        headers :{
            Authorization : `Bearer ${refresh}`
        }
    }).then((resp)=>{
        const {access} = resp.data;
        failedRequest.response.config.headers["Authorization"] = "Bearer" + access;
        cookieStore.set("auth",JSON.stringify({
            access,refresh,user_id
        }))
    })
    .catch(()=>{
        cookieStore.remove("auth")
    })
}





createAuthRefreshInterceptor(axiosService,refreshAuthLogic) 



export default axiosService