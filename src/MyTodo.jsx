import propTypes from "prop-types"
import { useState } from "react";
import "./App.css";
const Data = [
    {
        id: "",
        Name: "",
        Description: "",
        status: "",
        isStatus: true,

    },

]

const Todos = (props) => {
    return (
        <div
            style={{
                border: "1px solid #12ac88",
                textAlign: "center",
                padding: "30px",
                position: "relative",
                margin: 20,
                backgroundColor: "#ccf5d3",
                objectFit: "contain",
                top: 130,

            }}
        >

            <h4 style={{ padding: "5px" }}>Name :</h4><p>{props.Name}</p>
            <h4 style={{ padding: "5px" }} >Description :</h4> <p>{props.Description}</p>
            <br />
            <button onClick={() => props.toggleStatus(props.id)}
                style={{ backgroundColor: props.isStatus ? "#12ac88" : "#fd8280", color: "white" }}
            >{props.isStatus ? "Completed" : "Not Completed"}
            </button>
            <br />
            <br />
            <button onClick={() => props.loadEditTodos(props.id)} style={{ backgroundColor: "#12ac88", margin: "10px" }}> Edit </button>

            <button onClick={() => props.deleteTodos(props.id)} style={{ backgroundColor: "#d05e1f", color: "white" }}>Delete</button>

        </div>
    )
};

Todos.propTypes = {
    id: propTypes.number,
    Name: propTypes.string,
    Description: propTypes.string,
    isStatus: propTypes.bool,
    deleteTodos: propTypes.func,
    changeStatus: propTypes.func,
    loadEditTodos: propTypes.func,
    toggleStatus: propTypes.func,

};

const initialFormState = {

    Name: "",
    Description: "",
    Status: "",
    isStatus: false,

}

const Crud = () => {
    const [todosData, setTodos] = useState(Data);
    const [DisplayTodo, setDisplayTodo] = useState(Data)
    const [formState, setFormState] = useState(initialFormState);
    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState("all")



    // input change Event
    const handleChange = (e) => {
        console.log(e.target.name)

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        })

    };

    const displayFun = (fillName, AlltodoData = todosData) => {

        if (fillName === "completed") {
            setDisplayTodo(AlltodoData.filter((todo) => todo.isStatus));
        } else if (fillName === "notcompleted") {
            setDisplayTodo(AlltodoData.filter((todo) => !todo.isStatus));
        } else {
            setDisplayTodo(AlltodoData);
        }
    }



    // Create new Todo
    // creating a new Todo
    const CreateTodo = (TodoData) => {

        const tempTodo = { ...TodoData }

        const id = Date.now();

        tempTodo.id = id;

        //  setTodos([...todosData, tempTodo ]);
        const tempTodos = [...todosData, tempTodo]

        //addition of Todos
        setTodos(tempTodos)
        displayFun(filter, tempTodos);

    };

    const loadEditTodos = (id) => {
        setEditId(id);

        const todoObj = todosData.find((Todos) => Todos.id === id);

        setFormState(todoObj)
    }

    const editTodo = (todoData) => {
        todoData.id = editId;

        const index = todosData.findIndex((Todos) => Todos.id === editId);

        const tempTodos = [...todosData];

        tempTodos[index] = todoData;

        setTodos(tempTodos);

        displayFun(filter, tempTodos);

        setEditId(null);

    }

    //Form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            editTodo(formState);
        } else {
            CreateTodo(formState);
        }
        setFormState(initialFormState);
    }

    // Deleting the Todo//
    const deleteTodos = (todoId) => {
        const filteredData = todosData.filter((todo) => todo.id !== todoId);
        setTodos(filteredData);
        setDisplayTodo(filteredData);
    };

    //change to completed and notcompleted
    const toggleStatus = (id) => {

        const todoObj = todosData.find((Todos) => Todos.id === id);

        if (todoObj.isStatus) {
            todoObj.isStatus = false;
        } else {
            todoObj.isStatus = true;
        }
        const index = todosData.findIndex((Todos) => Todos.id === id);

        const tempTodos = [...todosData];
        tempTodos[index] = todoObj;
        setTodos(tempTodos);
        setDisplayTodo(tempTodos);
    }

    //filtering the todos
    const changeFilter = (e) => {
        setFilter(e.target.value);
        displayFun(e.target.value);
    }
    return (

        <>
            {console.log("form State", formState)}

            <form onSubmit={handleSubmit} style={{ border: "1px soldi #12ac88", }}>
                <input type={Text}
                    placeholder="Todo Name"
                    name="Name"
                    value={formState.Name}
                    onChange={handleChange}
                    required
                    style={{ margin: 30, padding: "2px", width: "300px", height: "28px", position: "fixed", top: 128, }} />

                <input type={Text}
                    placeholder="Todo Description"
                    name="Description"
                    value={formState.Description}
                    onChange={handleChange}
                    required
                    style={{ margin: 30, padding: "5px", width: "330px", height: "25px", position: "fixed", top: 125, left: 400 }}
                />

                <button style={{ margin: 25, border: "1px solid", color: "white", backgroundColor: "#12ac88", position: "fixed", top: 125, right: 570 }}
                    type="submit">Add Todo</button>

            </form>

            <h4 style={{ position: "absolute", top: 135, right: 250, objectFit: "contain" }}
            >Status Filter :

                <select value={filter} onChange={changeFilter}

                    style={{ margin: 5, height: "25px", backgroundColor: "#fd8280" }}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="notcompleted">Not Completed</option>

                </select></h4>
            <h2 style={{ position: "fixed", top: 195, padding: "15px" }}>My Todos</h2>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {DisplayTodo.map((todo) => (
                    <Todos key={todo.id}{...todo}
                        deleteTodos={deleteTodos}
                        toggleStatus={toggleStatus}
                        loadEditTodos={loadEditTodos}

                    />
                ))}
            </div>
        </>
    )

};
export default Crud;






