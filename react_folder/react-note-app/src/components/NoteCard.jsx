import { FaNoteSticky } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdMarkunread } from "react-icons/md";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  const body = note.body.slice(0, 100);
  const color =
    note.category == "BUISINESS"
      ? "blue"
      : note.category == "PERSONAL"
      ? "green"
      : "purple";

  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(isoString));
  };
  const timestamp = note.updated;
  const formattedDate = formatDate(timestamp);

  return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick" style={{ backgroundColor: color }}></span>
        <FaNoteSticky style={{ marginLeft: "auto", color: color }} />
        <Link
          to={`notes/${note.slug}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h5
            className="note-title text-truncate w-75 mb-0"
            data-noteheading="Book a Ticket for Movie"
          >
            {note.title}
          </h5>
        </Link>
        <p className="note-date font-12 text-muted">{formattedDate}</p>
        <div className="note-content">
          <p
            className="note-inner-content text-muted"
            data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
          >
            {body}
            {"..."}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/notes-detail">
            <span className="mr-1">
              <MdMarkunread
                style={{ fontSize: "25px", cursor: "pointer", color: color }}
              />
            </span>
          </Link>
          <span className="mr-1">{note.category}</span>

          <span className="mr-1">
            <i className="fa fa-trash remove-note"></i>
          </span>
          <div className="ml-auto">
            <div className="category-selector btn-group">
              <a
                className="nav-link dropdown-toggle category-dropdown label-group p-0"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <div className="category">
                  <div className="category-business"></div>
                  <div className="category-social"></div>
                  <div className="category-important"></div>
                  <span className="more-options text-dark">
                    <i className="icon-options-vertical"></i>
                  </span>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right category-menu">
                <a
                  className="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success"
                  href="javascript:void(0);"
                >
                  <i className="mdi mdi-checkbox-blank-circle-outline mr-1"></i>
                  Business
                </a>
                <a
                  className="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info"
                  href="javascript:void(0);"
                >
                  <i className="mdi mdi-checkbox-blank-circle-outline mr-1"></i>{" "}
                  Social
                </a>
                <a
                  className="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger"
                  href="javascript:void(0);"
                >
                  <i className="mdi mdi-checkbox-blank-circle-outline mr-1"></i>{" "}
                  Important
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
