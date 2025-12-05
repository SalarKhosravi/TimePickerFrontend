import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import AlertModal from "@/components/partitions/AlertModal.jsx";
import {Button} from "react-bootstrap";
import {isAdminLoggedIn} from "@/services/AuthService.js";
import {handleAdminLogout} from "@/services/AuthService.js";

async function handleLogoutAdmin(){
    const result = await handleAdminLogout();
    if (!result) {
        return;
    }
    window.location.reload()
}

export default function Footbar() {
    const adminIsLogged = isAdminLoggedIn();
    return (
        <div className="d-block d-md-none">
            <div className="position-fixed bottom-0 bg-primary w-100 px-3">
                <div className="row mx-auto">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <Nav.Link as={Link} to="/courses" className="text-center pt-3">
                            <div>
                                <i className="bi bi-house-fill h3"></i>
                                <p className="py-1 small">Dashboard</p>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/students" className="text-center pt-3">
                            <div>
                                <i className="bi bi-people-fill h3"></i>
                                <p className="py-1 small">Students</p>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/courses" className="text-center pt-3">
                            <div>
                                <i className="bi bi-book-half h3"></i>
                                <p className="py-1 small">Courses</p>
                            </div>
                        </Nav.Link>
                        {adminIsLogged && (
                            <AlertModal
                                message="Are you sure you want to logout admin?"
                                onConfirm={() => {
                                    handleLogoutAdmin();
                                }}
                                confirmText="Logout"
                                cancelText="Cancel"
                            >
                                <Nav.Link  className="text-center pt-3" >
                                    <div>
                                        <i className="bi bi-x-circle-fill h3"></i>
                                        <p className="py-1 small">Logout</p>
                                    </div>
                                </Nav.Link>
                            </AlertModal>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}
