import {useState} from "react";
import Button from "react-bootstrap/Button";
import {handleRegisterStudent} from "@/services/AuthService.js";
import {Link, useNavigate} from "react-router-dom";
import Nav from "react-bootstrap/Nav";


export default function StudentLogin() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!name) {
            alert("Please enter both name.");
            return;
        }

        const result = await handleRegisterStudent(name);

        if (!result) {
            return;
        }

        navigate("/");
        window.location.reload()
    };


    return (
        <div className="container-fluid">
            <div className="row mx-auto justify-content-center align-items-center" style={{height: "80vh"}}>
                <div className="col-12 col-md-6 col-xl-5 col-xxl-4 mt-5">
                    <div className="bg-body-secondary shadow rounded-5 p-5">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label mb-2">Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>
                            <Button type="submit" className="btn btn-primary mt-5 w-100">
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="position-fixed top-0 end-0 m-3">
                <Nav.Link as={Link} to="/admin">
                    <Button className="btn btn-secondary btn-sm">Admin</Button>
                </Nav.Link>
            </div>
        </div>
    );
}
