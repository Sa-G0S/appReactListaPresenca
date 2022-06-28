import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card } from '../../components/Card';


export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const[user, setUser] = useState({name: '', avatar: ''});
  
  function handleAddStudent(){
    const newStudent = {
      name:studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState =>[...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/sa-g0s')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  },[]);

  return (
    <div className="container">
     <header>
      <h1>Lista de Presença </h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} />
      </div>
     </header>
      <input
       type="text"
       placeholder="Digite o nome"
       onChange={e => setStudentName(e.target.value)}
       />
      <button
        type="button"
        onClick={handleAddStudent}>
          Adicionar
          </button>

      {
        students.map(student => (
        <Card 
          key={student.time}
          name={student.name} 
          time={student.time} 
          />
          ))       
        }
      <img className="img" src="https://img.freepik.com/free-vector/cute-white-cat-cartoon-vector-illustration_42750-808.jpg?w=360"  />
      
    </div>
  )
}

