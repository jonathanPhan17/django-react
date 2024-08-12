import { useState, useEffect } from "react";
import api from "../api";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get('/api/notes/')
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((error) => alert(error));
    }

    const deleteNotes = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note deleted!")
            else alert("failed to delete note.")
        }).catch((error) => alert(error));

        getNotes();
    }

    const createNotes = (e) => {
        e.preventDefault();
        api.post('/api/notes/', { content, title}.then((res) => {
            if (res.status === 201) alert("Note created!")
            else alert("failed to create note.")
        })).catch((error) => alert(error))

        getNotes();
    }

    return (
        <div>Home</div>
    )
}

export default Home;