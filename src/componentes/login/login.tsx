import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/api";

function Login(){
    const [searchParams] = useSearchParams()
    const mensagem = searchParams.get("mensagem")
    const navigate = useNavigate()
    function handleForm(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const senha = formData.get("senha")
        api.post("/login",{email,senha})
        .then((response)=>{
            if(response.status===200){
                localStorage.setItem("token",response?.data?.token)
            }

        })
        .catch((error:any)=>{
            const msg = error?.response?.data?.error ?? 
                        error?.mensagem ?? 
                        "Erro Desconhecido."
            navigate(`/login?mensagem=${encodeURIComponent(msg)}`)
        })

    }
    return(
        <>
            {mensagem&&<p>{mensagem}</p>}
            <form onSubmit={handleForm}>
                <input type="text" name="email" placeholder="Email" />
                <input type="password" name="senha" placeholder="Senha" />
            </form>
        </>
    )
}

export default Login;