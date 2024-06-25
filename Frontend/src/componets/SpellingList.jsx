import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const SpellingList = () => {
    const [spellings, setSpellings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSpellings();
    }, []);

    const fetchSpellings = async () => {
        try {
            const response = await axios.get('https://spelling-app.onrender.com/spellings');
            console.log('API response:', response.data);

            // Ensure spellings is an array
            const spellingsData = Array.isArray(response.data) ? response.data : [];

            console.log('Spellings:', spellingsData);

            setSpellings(spellingsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching spellings", error);
            setLoading(false);
        }
    };

    return (
        <div className="screen flex items-center justify-center p-5">
        {loading ? (
            <p className="text-lg text-center">Loading...</p>
        ) : (
            <ul className="menu menu-lg rounded-box bg-accent w-full max-w-2xl">
                {spellings.map(spelling => (
                    <li className="p-5 text-lg text-white font-bold" key={spelling._id}>
                        {spelling.word} - {spelling.meaning}
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};

export default SpellingList;
