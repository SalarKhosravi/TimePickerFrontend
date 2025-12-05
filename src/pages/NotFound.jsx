import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useEffect } from "react";

export default function NotFound() {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true }); // redirect to index after 3 seconds
    }, 2000);

    return () => clearTimeout(timer); // cleanup in case component unmounts
  }, [navigate]);

    return (
        <div className="container-fluid">
            <div className="row mx-auto justify-content-center align-items-center" style={{height: "80vh"}}>
                <div className="col-12 col-md-6 col-xl-5 col-xxl-4 mt-5">
                    <div className={'bg-body-secondary text-center rounded-4 py-5 px-5'}>
                        <p className={'h2'}>404</p>
                        <p className={'h5'}>Page not found</p>
                        <Nav.Link as={Link} to="/">
                            <Button className={'mt-5 w-100 mx-auto'}>
                                Visit Home
                            </Button>
                        </Nav.Link>
                    </div>
                </div>
            </div>
        </div>
    );
}