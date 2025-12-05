import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import apiService from "@/services/apiService.js";
import { toaste } from "@/components/partitions/ToastNotifications.jsx";
import Sleep from "@/components/partitions/Sleep.js";

async function CreateCourseApi(title) {
  const result = await apiService("post", `/courses/`, {
    title: title,
  });

  if (result.data) {
    toaste.show("Success", "Course created successfully!", 2500, "success");
    await Sleep(1000);
    return { ok: true, data: result.data };
  } else {
    toaste.show("Failed!", result.message, 2500, "danger");
    await Sleep(1000);
    return { ok: false, error: result.message };
  }
}

export default function CreateCourseModal({ children }) {
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    if (!courseTitle) {
      alert("Please enter course name.");
      return;
    }

    const result = await CreateCourseApi(courseTitle);
    setLoading(true);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setLoading(false);
    navigate("/courses");
    window.location.reload();
  };

  return (
    <>
      <span onClick={handleShow} style={{ cursor: "pointer" }}>
        {children}
      </span>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className={"py-5 px-4"}>
          <form onSubmit={handleCreateCourse}>
            <div className="mb-3">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <label className="form-label text-nowrap p-0 m-0 me-2 h6">
                  Course Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                />
                <Button
                  type={"submit"}
                  className="btn btn-primary ms-2"
                  disabled={loading}
                  // onClick={() => handleCreateCourse(courseTitle)}
                >
                  {loading ? "creating…" : "Create"}
                </Button>
              </div>
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
