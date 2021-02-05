import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import sanitize from 'sanitize-html';
import { RootState } from '../../app/store';
import { Spinner } from '../../components/elements/Spinner';
import { useNoteList } from '../../hooks/useNoteList';

const NoteList = () => {
    const [notes, selected, setActive] = useNoteList();
    const { loadState } = useSelector((state: RootState) => state.notes);

    return loadState === 'pending' ? (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Spinner className="note-list__loader-icon" size={32} />
        </div>
    ) : notes.length > 0 ? (
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
