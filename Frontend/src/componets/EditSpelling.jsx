import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const EditSpelling = () => {
  const { word } = useParams();
  const navigate = useNavigate();
  const [spelling, setSpelling] = useState({ word: "", meaning: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpelling();
  }, [word]);

  const fetchSpelling = async () => {
    try {
      const response = await axios.get(
        "https://spelling-app.onrender.com/spellings"
      );
      const foundSpelling = response.data.find((spell) => spell.word === word);
      if (foundSpelling) {
        setSpelling(foundSpelling);
      } else {
        setError("Spelling not found");
      }
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching the spelling");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpelling({ ...spelling, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://spelling-app.onrender.com/spellings/update/${word}`,
        spelling
      )
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setError("An error occurred while updating the spelling");
      });
  };

  if (loading)
    return (
      <p className="text-lg text-center">
        {" "}
        <span className="loading loading-spinner text-success"></span>
      </p>
    );
  if (error) return <p className="text-lg text-center text-red-500">{error}</p>;

  return (
    <div className="screen flex items-center justify-center p-5">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-5">
        <h2 className="text-2xl font-bold mb-4">Edit Spelling</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Word</label>
            <input
              type="text"
              name="word"
              value={spelling.word}
              onChange={handleChange}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Meaning</label>
            <input
              type="text"
              name="meaning"
              value={spelling.meaning}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSpelling;
