import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const AddSpelling = () => {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://spelling-app.onrender.com/spellings', { word, meaning});
            setWord('');
            setMeaning('');
            toast.success('Spelling added successfully');
        } catch (error) {
            toast.error('Somethin Wrong Try Again');
        }
    };
    return (
        <div className="p-10 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add Spelling</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Word</label>
                <input
                    className="input input-bordered input-accent w-full"
                    placeholder="Type here"
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Meaning</label>
                <input
                    className="input input-bordered input-accent w-full"
                    placeholder="Type here"
                    type="text"
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                    required
                />
            </div>
            <button className="btn btn-success w-full" type="submit">
                Add Spelling
            </button>
        </form>
    </div>
    );
};

export default AddSpelling;
