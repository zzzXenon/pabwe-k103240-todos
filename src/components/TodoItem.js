import React, { useState } from "react";
import * as Icon from "react-feather";
import { formatDate } from "../utils/tools";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function TodoItem({ todo, onDelete, onTodoFinished, onEdit, isDetail }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleSaveChanges = () => {
    onEdit(todo.id, editedTitle, editedDescription);
    setIsEditing (false);
  };

  let buttonAction;
  if (!todo.is_finished ) {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 1)}
        className="btn btn-outline-success"
      >
        <Icon.Check />
        <span>Selesai</span>
      </button>
    );
  } else {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 0)}
        className="btn btn-outline-danger"
      >
        <Icon.X />
        <span>Belum Selesai</span>
      </button>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5>
              {!isDetail ? (
                <Link to={`/detail/${todo.id}`}>{todo.title}</Link>
              ) : (
                todo.title
              )}
            </h5>
            <div>
              {todo.is_finished ? (
                <div>
                  <Icon.Check />
                  <span className="ms-2 text-success">
                    {formatDate(todo.updated_at)}
                  </span>
                </div>
              ) : null}
              <div>
                <Icon.Clock />
                <span className="ms-2 text-muted">
                  {formatDate(todo.created_at)}
                </span>
              </div>
            </div>
          </div>
          <div>{buttonAction}</div>
        </div>
        <hr />

        {/* Display inline form if editing is enabled */}
        {isEditing ? (
          <div>
            <div className="mb-3">
              <label
                htmlFor="editTitle"
                className="form-label"
                style={{ fontWeight: "bold" }}
              >
                Edit Title
              </label>
              <input
                type="text"
                className="form-control"
                id="editTitle"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="editDescription"
                className="form-label"
                style={{ fontWeight: "bold" }}
              >
                Edit Description
              </label>
              <textarea
                className="form-control"
                id="editDescription"
                rows="3"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveChanges}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{todo.description}</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-warning me-2"
                onClick={() => setIsEditing(true)}
              >
                <Icon.Edit />
                <span>Edit</span>
              </button>

              <button
                onClick={() => {
                  // eslint-disable-next-line no-undef
                  Swal.fire({
                    title: "Hapus Todo",
                    text: `Apakah kamu yakin ingin mehapus todo: ${todo.title}?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Tetap Hapus",
                    customClass: {
                      confirmButton: "btn btn-danger me-3 mb-4",
                      cancelButton: "btn btn-secondary mb-4",
                    },
                    buttonsStyling: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // eslint-disable-next-line no-undef
                      onDelete(todo.id);
                    }
                  });
                }}
                className="btn btn-danger"
              >
                <Icon.Trash />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_finished: PropTypes.number.isRequired,
    cover: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onTodoFinished: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
};

export default TodoItem;
