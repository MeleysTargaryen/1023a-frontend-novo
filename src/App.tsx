import { useEffect, useState } from 'react'
import './App.css'
type EstudanteType = {
  _id: string,
  nome: string,
  idade: number,
  cidade: string,
  curso: string
}
function App() {
  const token = localStorage.getItem("token")
  useEffect(() => {
    fetch('/api/estudantes',{
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
     
      .then(response => response.json())
      .then((dados) => setEstudantes(dados))
  }, [])



  const [estudantes, setEstudantes] = useState<EstudanteType[]>([])
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState(0)
  const [cidade, setCidade] = useState("")
  const [curso, setCurso] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const estudante = { nome, idade, cidade, curso }
    fetch("/api/estudantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estudante)
    })

      .then(response => response.json())
      .then((dados) => {
        setEstudantes([...estudantes, dados])
        setNome("")
        setIdade(0)
        setCidade("")
        setCurso("")
      })
  }

  return (
    <>
      <h1>Cadsatro de estudantes</h1>
      <form onSubmit={handleSubmit}>
        <input type = "text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type = "number" placeholder="Idade" value={idade} onChange={(e) => setIdade(Number(e.target.value))} />
        <input type = "text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <input type = "text" placeholder="Curso" value={curso} onChange={(e) => setCurso(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>




      <h1>Lista de estudantes</h1>
      <div className="conteiner-estudante">
        {estudantes.map((estudante) => {
          return (
            <div key={estudante._id} className="card-estudante">
              <h2>{estudante.nome}</h2>
              <p>Idade: {estudante.idade}</p>
              <p>Cidade: {estudante.cidade}</p>
              <p>Curso: {estudante.curso}</p>
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default App
