import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
    id: number;
    content: string;
}

export const Todos = () => {
    const [inputValue, outputValue] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>("");

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
    }, []);
};
