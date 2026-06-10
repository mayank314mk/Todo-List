import { useState, useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, settodos] = useState(() => {
    const todosData = localStorage.getItem("todos");
    return todosData ? JSON.parse(todosData) : [];
  })
  const [showtodos, setshowtodos] = useState(false)
  // useEffect(() => {
  //   let todosData = localStorage.getItem("todos");
  //   if (todosData) {
  //     settodos(JSON.parse(todosData))
  //   }
  // }, [])
  useEffect(() => {
    let todoSave = todos;
    localStorage.setItem("todos", JSON.stringify(todoSave))
    // console.log(JSON.stringify(todoSave))
  }, [todos])

  // function saveToLS() {

  // }
  const [todo, settodo] = useState("")
  // const [id, setid] = useState(0)
  function typeTodo(e) {
    settodo(e.target.value)
  }
  function addTodo() {
    if (todo) {
      settodos((prevtodos) => [...prevtodos, {
        id: uuidv4(),
        title: todo,
        hasCompleted: false
      }])
      // setid(id + 1);
    }
    // saveToLS()
    settodo('');
  }
  function delTodo(id) {
    let newTodos = todos.filter((todo) => todo.id != id)
    settodos(newTodos)
    // saveToLS()
  }
  function editTodo(id) {
    let curTodo = todos.find((todo) => todo.id == id);
    settodo(curTodo.title)
    let newTodos = todos.filter((todo) => todo.id != id)
    settodos(newTodos)
    // saveToLS();
  }
  function completeTodo(e, id) {
    // e.target.checked=!e.target.checked;
    // console.log(todos.find((todo)=>todo.id==id))
    settodos(
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            hasCompleted: !todo.hasCompleted
          }
        }
        return todo;
      }))
    // todos.find((todo) => todo.id == id).hasCompleted = !todos.find((todo) => todo.id == id).hasCompleted;
    // console.log(todos)
  }
  function stodo() {
    setshowtodos(!showtodos)
  }
  // console.log(todos)
  return (
    <>
      <main className='h-[100svh] w-1/2 max-[882px]:w-[min(441px,86vw)] max-[882px]:pl-0.5 mx-auto flex items-center flex-col gap-3 box-border py-3'>
        <div className="title font-poppins font-bold text-4xl m-6 text-white">Todo List</div>
        <div className="show flex mr-auto gap-[16px] my-6 mb-0 w-full box-border pr-2.5 items-end">
          <div className="add mr-auto font-semibold text-2xl">Add a Todo</div>
          <div className='flex items-center gap-[16px]'>
            <div className={`showtodos ml-auto text-right ${showtodos ? 'text-[#00ff00]' : ''}`}>Show All Todos</div>
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#00ff00] shrink-0 "
              onChange={stodo}
            />
          </div>
        </div>
        <div className="inputs flex w-full items-end justify-between">
          <input onChange={(e) => typeTodo(e)} type="text" name="" value={todo} id="" placeholder='Type here' className='flex-1 outline-none border-b-2 border-[rgb(228, 228, 228)] hover:border-[rgb(0,255,0)] focus:border-[rgb(0,255,0)] h-[48px]' />
          <div onClick={() => addTodo()} className='hover:text-[rgb(0,255,0)]  hover:border-[#00ff00] border-2 border-[#00000000] active:bg-[#00ff00] active:text-black'>
            <IoMdAdd size={36} className='text-[rgb(228, 228, 228)]' />
          </div>
        </div>

        <div className="todos w-full box-border pr-0.5 flex-1 ">
          {todos.map((todo) => {
            if (showtodos || !todo.hasCompleted)
              return <div key={todo.id} className="todo flex items-center gap-[8px] my-1.5">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#00ff00] shrink-0 "
                  onChange={(e) => completeTodo(e, todo.id)}
                  checked={todo.hasCompleted}
                />
                <div className={`task mx-2 hover:text-[#00ff00] w-full wrap-break-word ${todo.hasCompleted ? 'line-through text-[#00ff00]' : ''}`}>{todo.title}</div>
                <div onClick={() => editTodo(todo.id)} className="edit ml-auto p-[4px] box-border hover:text-[rgb(0,255,0)]  hover:border-[#00ff00] border-2 border-[#00000000] active:bg-[#00ff00] active:text-black"><FaEdit size={24} className='text-[rgb(228, 228, 228)]' /></div>
                <div onClick={() => delTodo(todo.id)} className="delete p-[4px] box-border hover:text-[rgb(0,255,0)]  hover:border-[#00ff00] border-2 border-[#00000000] active:bg-[#00ff00] active:text-black"><MdDelete size={24} className='text-[rgb(228, 228, 228)]' /></div>
              </div>
          })}
        </div>
      </main>
    </>
  )
}

export default App
