import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";





function App() {
  const [todo, setTodo] = useState("")
  const [allTodo, setAllTodo] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const [firstRender, setfirstRender] = useState(true)

  

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setAllTodo(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (firstRender) {
      setfirstRender(false);
      return;
    }
    localStorage.setItem("todos", JSON.stringify(allTodo));
  }, [allTodo]);


  const addTodoBtn = () => {
    setAllTodo([...allTodo, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    // console.log(allTodo)


  }

  const editBtn = (id) => {
    let newTodos = [...allTodo]
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === id) {

        setTodo(newTodos[i].todo)
        break;

      };
    }

    newTodos = allTodo.filter(item => {
      return item.id !== id
    })

    setAllTodo(newTodos)

  }

  const deleteBtn = (id) => {
    console.log(`The id: ${id}`);
    let newTodos = allTodo.filter(item => {
      return item.id !== id
    })

    setAllTodo(newTodos)


  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const checkboxChange = (e) => {
    let id = e.target.name
    // console.log(id)
    let newTodos = [...allTodo]
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === id) {
        newTodos[i].isCompleted = !newTodos[i].isCompleted
        setAllTodo(newTodos)
        break;

      };
    }
    // console.log(allTodo)



  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container flex flex-col gap-2 bg-cyan-100 min-h-[100vh] md:min-h-[70vh] m-auto md:w-3xl p-3 pt-5 md:pt-3 md:mt-6 rounded-2xl shadow-2xl">
        <h2 className='text-2xl font-bold'>Add a Task</h2>
        <div className="inputTodo flex gap-4 flex-col md:flex-row">
          <input type="text" onChange={handleChange} value={todo} className='bg-white w-full rounded-2xl p-1 px-3' placeholder='Enter Your Task Here... ' />
          <button onClick={addTodoBtn} disabled={todo.length < 2} className='bg-blue-950 disabled:bg-blue-900 text-white p-1 px-3 rounded-2xl hover:cursor-pointer'>Add</button>
        </div>

        <div className="showFinish flex items-center gap-3">
          <input type="checkbox" className='md:mt-1' onChange={toggleFinished} checked={showFinished} />
          <p>Show Finished Tasks</p>

        </div>
        <div className='h-0.5 bg-black opacity-20 rounded-full mt-3'></div>

        <h2 className='text-2xl font-bold mt-3'>Your Tasks</h2>

        <div className="todoContainer flex flex-col gap-3">

          {allTodo.length === 0 && <div className='m-1'>No Tasks Yet...</div>}

          {allTodo.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between items-center">
              <div className="text flex gap-2 items-center">
                <input className='md:mt-1' type="checkbox" onChange={checkboxChange} name={item.id} id="" checked={item.isCompleted} />
                <div className={`text-xl ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
              </div>
              <div className="buttons flex gap-5">
                <button onClick={() => { editBtn(item.id) }} className='bg-blue-950 p-0.5 px-2 text-white rounded-xl hover:cursor-pointer' ><FaEdit /></button>
                <button onClick={() => { deleteBtn(item.id) }} className='bg-blue-950 p-1 px-2 text-white rounded-xl hover:cursor-pointer'><MdDelete /></button>
              </div>
            </div>

          })}


        </div>



      </div>


    </>
  )
}

export default App
