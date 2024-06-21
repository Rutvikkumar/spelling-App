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
            const response = await axios.get(`http://localhost:3000/spellings/search?word=${word}`);
            setSpellings(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching spellings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Search for a Spelling</h2>
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter word"
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {spellings.length > 0 && (
                <ul>
                    {spellings.map((spelling) => (
                        <li key={spelling._id}>{spelling.word} - {spelling.meaning}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SpellingSearch;
