import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import sanitize from 'sanitize-html';
import { useNoteList } from '../../hooks/useNoteList';

const NoteList = () => {
    const [notes, selected, setActive] = useNoteList();

    return notes.length > 0 ? (
        <Scrollbars
            className="note-list"
            renderThumbVertical={(props) => (
                <div {...props} className="note-list__thumb-vertical" />
            )}
        >
            {notes.map((note) => {
                const sanitizedHtml = sanitize(note.text, {
                    allowedTags: ['p', 'ul', 'ol', 'li'],
                });

                return (
                    <div
                        className={`note ${
                            note.id === selected ? 'note--active' : ''
                        }`}
                        key={note.id}
                        onClick={() => setActive(note.id)}
                    >
                        <div className="note__title">
                            <h2>{note.title}</h2>
                        </div>
                        {sanitizedHtml.length > 0 && (
                            <div
                                className="note__content"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizedHtml,
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </Scrollbars>
    ) : (
        <span className="note-list__message">
            You don't create any notes so far
        </span>
    );
};

export default NoteList;
