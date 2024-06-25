import React, { useState } from 'react';
import axios from 'axios';

const SpellingSearch = () => {
    const [word, setWord] = useState('');
    const [spellings, setSpellings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://spelling-app.onrender.com/spellings/search?word=${word}`);
            setSpellings(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching spellings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Search for a Spelling</h2>
        <div className="mb-4">
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter word"
                className="input input-bordered input-accent w-full"
            />
        </div>
        <div className="mb-4">
            <button onClick={handleSearch} className="btn btn-success w-full">
                Search
            </button>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {spellings.length > 0 && (
            <ul className="list-disc pl-5">
                {spellings.map((spelling) => (
                    <li key={spelling._id} className="mb-2">
                        <span className="font-bold">{spelling.word}</span> - {spelling.meaning}
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};

export default SpellingSearch;
