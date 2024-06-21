import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditSpelling = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchSpelling = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/spellings/${id}`
        );
        setWord(response.data.word);
        setMeaning(response.data.meaning);
        setLanguage(response.data.language);
      } catch (error) {
        console.error("Error fetching spelling", error);
      }
    };
    fetchSpelling();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/spellings/${id}`, {
        word,
        meaning,
        language,
      });
      alert("Spelling updated successfully");
    } catch (error) {
      console.error("Error updating spelling", error);
      alert("Error updating spelling");
    }
  };

  return (
    <div>
      <h2>Edit Spelling</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Word</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Meaning</label>
          <input
            type="text"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="Gujarati">Gujarati</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
        </div>
        <button type="submit">Update Spelling</button>
      </form>
    </div>
  );
};

export default EditSpelling;
