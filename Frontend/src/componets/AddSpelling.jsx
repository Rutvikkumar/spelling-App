import React, { useState } from 'react';
import axios from 'axios';

const AddSpelling = () => {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/spellings', { word, meaning});
            setWord('');
            setMeaning('');
            alert('Spelling added successfully');
        } catch (error) {
            console.error("Error adding spelling", error);
            alert('Error adding spelling');
        }
    };

    return (
        <div>
            <h2>Add Spelling</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Word</label>
                    <input type="text" value={word} onChange={(e) => setWord(e.target.value)} required />
                </div>
                <div>
                    <label>Meaning</label>
                    <input type="text" value={meaning} onChange={(e) => setMeaning(e.target.value)} required />
                </div>
                
                <button type="submit">Add Spelling</button>
            </form>
        </div>
    );
};

export default AddSpelling;
