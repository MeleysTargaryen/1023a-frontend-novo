import { useEffect, useState } from 'react'
import './App.css'
type EstudanteType = {
    _id: string,
    nome: string,
    idade: number,
    cidade: string,
    curso:string
}
function App() {
  useEffect(() => {
    fetch('/api/estudantes')
      .then(response => response.json())
      .then((dados)=>setEstudantes(dados)) 
  }, [])



  const [ estudantes, setEstudantes] = useState<EstudanteType[]>([])

  return (
    <>
     <h1>Lista de estudantes</h1>
     <div className="conteiner-estudante">
      {estudantes.map((estudante) => {
        return(
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
