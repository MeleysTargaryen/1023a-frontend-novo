import axios from 'axios'

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

//Middleware -> interceptors

//1 - interceptors de requesição: inclui o token em cada requisição
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

//Interceptor de resposta:
//quando o backend retornar 401 redireciona para o login
api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        const status = error?.response?.status
        if(status===401&&!(error?.response?.config?.url.endsWith("/login"))){
            localStorage.removeItem("token")
            window.location.href = "/login?mensagem=Token_expirado!"
        }
        return Promise.reject(error)
    }
)

export default api;