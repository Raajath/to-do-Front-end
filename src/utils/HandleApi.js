import axios from 'axios'
//to make HTTP requests
const baseUrl = "https://to-dobackend-decs.onrender.com"

//the data from backend retrieved
const getAllToDo = (setToDo) => {
    axios
        .get(baseUrl)
        .then(({ data }) => {
            console.log('data ---> ', data);
            setToDo(data)
        })
}

//add to database
const addToDo = (text, setText, setToDo) => {

    axios
        .post(`${baseUrl}/save`, { text })
        .then((data) => {
            console.log(data);
            setText("")
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

}

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {

    axios
        .post(`${baseUrl}/update`, { _id: toDoId, text })
        .then((data) => {
            setText("")
            setIsUpdating(false)
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

}

const deleteToDo = (_id, setToDo) => {

    axios
        .post(`${baseUrl}/delete`, { _id })
        .then((data) => {
            console.log(data)
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

}


export { getAllToDo, addToDo, updateToDo, deleteToDo }
