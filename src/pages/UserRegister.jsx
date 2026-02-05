import apiService from "@/services/apiService.js";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {handleRegisterUser} from "@/services/AuthService.js";
import {Link, useNavigate} from "react-router-dom";
import { toaste } from "@/components/partitions/ToastNotifications.jsx";

import Sleep from "@/components/partitions/Sleep.js";


export default function UserRegister() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [full_name, setFullName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const checks = {
        length: password?.length >= 8,
        number: /\d/.test(password),
        upper: /[A-Z]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password),
    }

    const itemStyle = (ok) => ({
        color: ok ? "#67a5ff" : "#fef0f2",
        fontSize: "12px",
    })

    const handleUserRegisterRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await apiService("post", "/auth/register/", {
            username,
            password,
            full_name,
        });

        if (res.data) {
            handleRegisterUser(res.data)
            toaste.show("Success", "Now need to login", 2500, "success");
            await Sleep(4000);
            navigate(`/courses`, { replace: true });
        } else {
            toaste.show("Failed !", res.message, 2500, 'danger');
            setError(res.message || "Register failed");
            await Sleep(1000);
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
                style={{ height: "80vh" }}
            >

                <div className="col-12 col-md-6 col-xl-5 col-xxl-4 mt-5">
                    <div className={'row text-center pb-5'}>
                        <p className={'h2'}>
                            Register
                        </p>
                    </div>
                    <form onSubmit={handleUserRegisterRequest}>
                        <div className="mb-3">
                            <label className="form-label">Full Name (English)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={'Ali Akbari'}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={'0999 ...'}
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
                                    placeholder="Password"
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

                            <ul className="mt-2 ps-3">
                                <li style={itemStyle(checks.length)}>
                                    At least 8 characters
                                </li>
                                <li style={itemStyle(checks.number)}>
                                    At least one number
                                </li>
                                <li style={itemStyle(checks.upper)}>
                                    At least one uppercase letter
                                </li>
                                <li style={itemStyle(checks.symbol)}>
                                    At least one symbol
                                </li>
                            </ul>
                        </div>

                        {error && <div className="alert alert-danger py-2">{error}</div>}

                        <div className="d-flex flex-column gap-2 mt-5">
                            <Button
                                type={"submit"}
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Logging in…" : "Register"}
                            </Button>
                            <Link to={'/login'} className={'text-decoration-none text-light w-100'}>
                                <Button
                                    className="btn btn-secondary w-100"
                                    disabled={loading}
                                >
                                Go to Login
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

