import { useState } from "react";
import apiService from "@/services/apiService";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await apiService("post", "/login/", {
      username,
      password,
    });

    if (res.data?.token) {
      localStorage.setItem("user_token", res.data.token);
      navigate(`/courses`, { replace: true });
    } else {
      setError(res.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div
        className="row mx-auto justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="col-12 col-md-6 col-xl-5 col-xxl-4 mt-5">
          <form onSubmit={handleAdminLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="d-flex gap-2">
              <Button
                type={"submit"}
                className="btn btn-primary w-100 mt-4"
                disabled={loading}
              >
                {loading ? "Logging in…" : "Login"}
              </Button>
              <Link className="btn btn-secondary w-100 mt-4" to="/">
                Student
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
