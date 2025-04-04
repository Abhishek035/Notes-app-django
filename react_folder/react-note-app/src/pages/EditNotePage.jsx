import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddNotes.css";
import axios from "axios";

const EditNodepage = ( { updateNote }) => {
  const [note, setNote] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/notes/" + slug)
      .then((res) => {
        console.log(res.data);
        setNote(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const newNote = {
    title: note.title, 
    body: note.body,
    category: note.category
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newNote)
    updateNote(newNote, slug)
    navigate(`/notes/${slug}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Edit Note</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          value={note.title}
          placeholder="Enter note's title"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
          value={note.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Note's category
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ height: "40px" }}
          value={note.category}
          onChange={(e) => setNote({ ...note, category: e.target.value })}
        >
          <option selected>Pick a category</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

      <button
        className="btn btn-primary d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        Add Note
      </button>
    </form>
  );
};

export default EditNodepage;
