import React, { useState, useEffect } from "react";
import "./NotePage.css";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from "../components/Modal";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const NotePage = ({ deleteNote }) => {
  const [note, setNote] = useState({});
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleisOpen = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/notes/" + slug)
      .then((res) => {
        setNote(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(isoString));
  };

  return (
    <>
      <div className="note-container">
        <h3 className="title">{note.title}</h3>
        <span className="d-flex justify-content-center">
          <p className="note-date font-12 text-muted me-5">
            created: {formatDate(note?.created)}
          </p>
          <p className="note-date font-12 text-muted me-5">
            last updated: {formatDate(note?.updated)}
          </p>
        </span>
        <span className="button-group">
          <Link to={`/edit-note/${slug}`}>
            <button className="btn btn-primary">
              <FiEdit />
              <span>Edit</span>
            </button>
          </Link>
          <button className="btn btn-danger" onClick={handleisOpen}>
            <BiSolidTrashAlt />
            <span>Delete</span>
          </button>
        </span>
        <p className="description">{note.body}</p>
      </div>
      { isOpen && <Modal handleisOpen={handleisOpen} deleteNote={() => deleteNote(slug)}/> }
    </>
  );
};

export default NotePage;
