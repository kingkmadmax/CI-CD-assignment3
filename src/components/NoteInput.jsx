import { useState, useRef, useEffect } from 'react';

export default function NoteInput({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const containerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    
    onAddNote({
      title,
      body,
      timestamp: Date.now(),
    });

    setTitle('');
    setBody('');
    setIsExpanded(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // If empty, collapse
        if (!title.trim() && !body.trim()) {
           setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [title, body]);

  return (
    <div 
      className={`note-input-container ${isExpanded ? 'focused' : ''}`} 
      ref={containerRef}
    >
      <form className="note-input-form" onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            type="text"
            className="note-input-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
        
        <textarea
          className="note-input-body"
          placeholder="Take a note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onClick={handleExpand}
          rows={isExpanded ? 3 : 1}
          style={{ height: 'auto' }}
        />

        {isExpanded && (
          <div className="note-input-actions">
            <button type="submit" className="add-btn">
              Close
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
