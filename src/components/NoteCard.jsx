import React from 'react';

export default function NoteCard({ note, onDelete }) {
    return (
        <div className="note-card">
            {note.title && <h3 className="note-title">{note.title}</h3>}
            <pre className="note-body">{note.body}</pre>

            <div className="note-footer">
                <button
                    className="delete-btn"
                    onClick={() => onDelete(note.id)}
                    title="Delete note"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
