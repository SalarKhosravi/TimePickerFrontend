import apiService from "@/services/apiService.js";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {handleUserLogin} from "@/services/AuthService.js";
import {Link, useNavigate} from "react-router-dom";


export default function UserLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUserLoginRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await apiService("post", "/auth/login/", {
            username,
            password,
        });

        if (res.data?.token) {
            handleUserLogin(res.data)
            navigate(`/courses`, { replace: true });
        } else {
            setError(res.message || "Login failed");
        }
        setLoading(false);
    };

    return (
        <div className="container-fluid">
            <div className={'row mx-auto position-fixed top-0 end-0 px-4'}>
                <Button variant="secondary" className="mt-4 w-auto btn-sm px-4" disabled={loading} >
                    <Link className={'text-decoration-none text-light'} to={'/admin/'}>Admin</Link>
                </Button>
            </div>

            <div
                className="row mx-auto justify-content-center align-items-center"
                style={{ height: "70vh" }}
            >

                <div className="col-12 col-md-6 col-xl-5 col-xxl-4 mt-5">
                    <div className={'row text-center pb-5'}>
                        <p className={'h2'}>
                            Sign in
                        </p>
                    </div>
                    <form onSubmit={handleUserLoginRequest}>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='0912'
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    required
                                />

                                <span
                                    className="input-group-text"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                                </span>
                            </div>
                        </div>


                        {error && <div className="alert alert-danger py-2">{error}</div>}

                        <div className="d-flex flex-column gap-2 mt-5">
                            <Button
                                type={"submit"}
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Logging in…" : "Login"}
                            </Button>
                            <Link to={'/register'} className={'text-decoration-none text-light w-100'}>
                                <Button
                                    className="btn btn-secondary w-100"
                                    disabled={loading}
                                >
                                    Let's Register
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

