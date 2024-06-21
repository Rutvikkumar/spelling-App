import React, { useState, useEffect } from 'react';
import AddSpelling from "./AddSpelling";
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
            const response = await axios.get('http://localhost:3000/spellings');
            console.log('API response:', response.data);

            // Ensure spellings is an array
            const spellingsData = response.data || [];

            console.log('Spellings:', spellingsData);

            setSpellings(spellingsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching spellings", error);
            setLoading(false);
        }
    };

    return (
        <div className='screen flex items-center justify-center p-5'>
            {/* <h2>Spelling List</h2> */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="menu menu-lg rounded-box bg-accent w-50rem">
                    {spellings.map(spelling => (
                        <li className="p-5 text-lg text-white font-bold items-center" key={spelling._id}>{spelling.word} - {spelling.meaning}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SpellingList;
