import React from "react"
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })

    return (
        <div className="note-card">
            <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
                <span className="note-date">
                    🕒 {formattedDate}
                </span>
                <button
                    className="delete-btn"
                    onClick={() => onDelete(note.id)}
                >
                    🗑️ Delete
                </button>
            </div>
        </div>
    )
}

export default Note