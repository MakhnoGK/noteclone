import React from 'react';
import { useDispatch } from 'react-redux';
import sanitize from 'sanitize-html';
import { noteSelected } from './noteSlice';

const NoteListItem = ({ note, selected }: { note: any; selected: boolean }) => {
    const dispatch = useDispatch();
    const sanitizedHtml = sanitize(note.text, {
        allowedTags: ['p', 'ul', 'ol', 'li'],
    });

    return (
        <div
            style={{
                backgroundColor: selected ? '#ccc' : 'transparent',
            }}
            onClick={() => dispatch(noteSelected(note.id))}
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
};

export default NoteListItem;
