import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

interface Todo {
    id: number,
    content: string,
}

export const Todos = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [todo, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const FetchData = async () => {
            await axios
                .get("http://localhost:8000/todo")
                .then((res) => res.data)
                .then((data) => {
                    setTodos(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        FetchData();
    }, [])

    const handleSubmit = async() => {
        console.log(inputValue)
        await axios.post('http://8000/todo',{
            "content": inputValue
        })
        .then(res => res.data)
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setInputValue("")

        await axios.get('http://localhost:8000/todo')
        .then(res => res.data)
        .then(data => {setTodos(data)})
        .catch(error => {
            console.error("Error:",error)
        })
    }

    const handleDelete = async(id:number) => {
        await axios.delete(`http://localhost:8000/todo/${id}`)
        .then(res => res.data)
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const handleUpdate = async(id:number) => {

        setInputValue("")

        await axios.post(`http://8000/todo/${id}`,{
            "content": inputValue
        })
        .then(res => res.data)
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    return (
        <div>
            <h1>
                Hello Golang
            </h1>
            <div>
                <input value={inputValue} type="text" id="content" onChange={(e)=>{setInputValue(e.target.value)}}/>
                <button onClick={() => handleSubmit}>追加</button>
            </div>
            <ul>
                {
                    todo.map((todo) => {
                        return(
                            <li key={todo.id}>
                                <input value={inputValue} type="text" id="content" onChange={(e)=>{setInputValue(e.target.value)}}/>
                                <button onClick={() => handleUpdate(todo.id)}>編集</button>
                                {todo.content}
                                <button onClick={()=>{handleDelete(todo.id)}}>削除</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
