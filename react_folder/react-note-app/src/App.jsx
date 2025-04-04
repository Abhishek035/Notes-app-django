import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MainLayouts from "./layouts/MainLayouts";
import AddNotePage from "./pages/AddNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  const filteredNotes =
    filterText === "BUSINESS"
      ? notes.filter((note) => note.category === "BUSINESS")
      : filterText === "PERSONAL"
      ? notes.filter((note) => note.category === "PERSONAL")
      : filterText === "IMPORTANT"
      ? notes.filter((note) => note.category === "IMPORTANT")
      : notes;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/notes/")
      .then((res) => {
        setNotes(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addNote = async (data) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/notes/", data);

      setNotes((prevNotes) => [...prevNotes, res.data]);
      toast.success("Note added successfully!");
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateNote = (data, slug) => {
    axios
      .put(`http://127.0.0.1:8000/notes/${slug}/`, data)
      .then((res) => {
        console.log(res.data);
        // Write code to update an object in an array of objects of state variable notes
        setNotes((prevNotes) => {
          return prevNotes.map((note) =>
            note.slug === slug ? res.data : note
          );
        });
        toast.success("Note updated successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteNote = (slug) => {
    axios
      .delete(`http://127.0.0.1:8000/notes/${slug}/`)
      .then((res) => {
        console.log(res.data);
        setNotes((prevNotes) => prevNotes.filter((note) => note.slug !== slug));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSearchText = (val) => {
    setSearchText(val);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      .then((res) => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [searchText]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayouts
              searchText={searchText}
              handleSearchText={handleSearchText}
            />
          }
        >
          <Route
            index
            element={
              <Homepage
                notes={filteredNotes}
                loading={loading}
                handleFilterText={handleFilterText}
              />
            }
          />
          <Route path="add-note" element={<AddNotePage addNote={addNote} />} />
          <Route
            path="edit-note/:slug"
            element={<EditNotePage updateNote={updateNote} />}
          />
          <Route
            path="notes/:slug"
            element={<NoteDetailPage deleteNote={deleteNote} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

// 3:08:10
