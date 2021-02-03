import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { addNoteAsync } from './noteSlice'
import { RiLoader5Line } from 'react-icons/ri'

const AddNoteButton = () => {
    const { saveState } = useSelector((state: RootState) => state.notes)
    const dispatch = useDispatch()

    return (
        <button
            className="sidebar-button sidebar-button--fullwidth"
            disabled={saveState === 'pending'}
            onClick={() => dispatch(addNoteAsync())}
        >
            {saveState === 'pending' ? (
                <RiLoader5Line size={16} className="sidebar-button__icon" />
            ) : (
                'New Note'
            )}
        </button>
    )
}

export default AddNoteButton
