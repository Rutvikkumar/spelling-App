import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import toast from "react-hot-toast";

const SpellingList = () => {
  const [spellings, setSpellings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpellings();
  }, []);

  const fetchSpellings = async () => {
    try {
      const response = await axios.get("https://spelling-app.onrender.com/spellings");
      const spellingsData = Array.isArray(response.data) ? response.data : [];
      setSpellings(spellingsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching spellings", error);
      setLoading(false);
    }
  };

  const deleteSpelling = async (word) => {
    try {
      const response = await axios.delete(
        `https://spelling-app.onrender.com/spellings/${word}`
      );
      if (response.status === 200) {
        setSpellings(spellings.filter((spelling) => spelling.word !== word));
        toast.success('Spelling deleted');
      }
    } catch (error) {
      console.error("Error deleting spelling", error);
      toast.error('Error deleting spelling');
    }
  };

  return (
    <div className="screen flex items-center justify-center p-5">
      {loading ? (
        <span className="loading loading-spinner text-success"></span>
      ) : (
        <ul className="menu menu-lg rounded-box bg-accent w-full max-w-2xl">
          {spellings.map((spelling) => (
            <li
              className="p-2 text-lg text-white font-bold rounded"
              key={spelling._id}
            >

                <span className="flex justify-between">
                  {spelling.word} - {spelling.meaning}
                  <div>
                  <Link
                    to={`/edit/${spelling.word}`}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteSpelling(spelling.word)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
                </span>   
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpellingList;
