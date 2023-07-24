import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";


function App() {
  //use state hook used
  const [toDo, setToDo] = useState([])//to set toDos
  const [text, setText] = useState("")//to set input string
  const [isUpdating, setIsUpdating] = useState(false)//to check If we want to update
  const [toDoId, setToDoId] = useState("")//To keep track of id of To do being updated

//to fetch data from api
  useEffect(() => {
    //Call the function to get all existing todos from api
    getAllToDo(setToDo)
  }, [])

  //function activates when user puts update button
  const updateMode = (_id, text) => {
    setIsUpdating(true)//Make true
    setText(text)//store text being updated
    setToDoId(_id)//store id being updated
  }

  return (
    <div className="App">

      <div className="container">

        <h1>What is On your mind</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Enter Tasks.."
            value={text}//state variable bind to state
            onChange={(e) => setText(e.target.value)}//on input change update 
          />

          <div
            className="add"
            onClick={isUpdating ?
              () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </div>

        </div>

        <div className="list">

          {toDo.map((item) => <ToDo 
          key={item._id} 
          text={item.text}
          updateMode = {() => updateMode(item._id, item.text)}
          deleteToDo = {() => deleteToDo(item._id, setToDo)} />)}

        </div>

      </div>

    </div>
  );
}

export default App;