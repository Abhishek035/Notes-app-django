import React from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";

const Homepage = ({ notes, loading, handleFilterText }) => {
  return (
    <>
      { notes.length > 0 && <Filter handleFilterText={handleFilterText} />}
      <NoteCardContainer notes={notes} loading={loading} />
    </>
  );
};

export default Homepage;
