import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        setLoading(true)
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data)
                setLoading(false)
            })
            .catch((err) => {
                alert(err);
                setLoading(false)
            });
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("✅ Note Deleted Successfully!")
                    getNotes()
                } else {
                    alert("❌ Deletion Failed!")
                }
            })
            .catch((error) => alert(error))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", { content, title }).then((res) => {
            if (res.status === 201) {
                alert("✅ Note Created Successfully!")
                setTitle("")
                setContent("")
                getNotes();
            } else {
                alert("❌ Creation Failed!")
            }
        }).catch((err) => alert(err))
    }

    return (
        <div className="container">
            {/* Header */}
            <div className="header">
                <h1>📚 My Notes</h1>
                <p>Keep track of your thoughts and ideas</p>
            </div>

            {/* Create Note Form */}
            <div className="form-container">
                <h2>✨ Create New Note</h2>
                <form onSubmit={createNote}>
                    <div className="form-group">
                        <label htmlFor="title">📝 Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Enter note title..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">📄 Content</label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Write your note here..."
                        />
                    </div>

                    <input type="submit" value="Create Note" />
                </form>
            </div>

            {/* Notes Section */}
            <div className="notes-section">
                <div className="section-header">
                    <h2>📋 All Notes</h2>
                    <span className="notes-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
                </div>

                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading notes...</p>
                    </div>
                ) : notes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <h3>No notes yet</h3>
                        <p>Create your first note above to get started!</p>
                    </div>
                ) : (
                    <div className="notes-grid">
                        {notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}