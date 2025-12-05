import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {isStudentLoggedIn, handleStudentLogout, isAdminLoggedIn, handleAdminLogout} from "@/services/AuthService.js";
import {Button} from "react-bootstrap";
import AlertModal from '@/components/partitions/AlertModal.jsx'

async function handleLogoutStudent(){
    const result = await handleStudentLogout();

    if (!result) {
        return;
    }

    window.location.reload()
}

async function handleLogoutAdmin(){
    const result = await handleAdminLogout();

    if (!result) {
        return;
    }

    window.location.reload()
}

export default function Topbar() {
    const isLoggedIn = isStudentLoggedIn();
    const adminIsLogged = isAdminLoggedIn();

    return (
        <div className="">
            <Navbar className="bg-body-tertiary px-2 px-lg-4">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className="">
                        <Nav className="me-auto">
                            {adminIsLogged && (
                                <Nav.Link as={Link} to="/admin/students">Students</Nav.Link>
                            )}
                            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                        </Nav>
                    </div>
                    {isLoggedIn && (
                        <AlertModal
                            message="Are you sure you want to logout?"
                            onConfirm={() => {
                                handleLogoutStudent();
                            }}
                            confirmText="Logout"
                            cancelText="Cancel"
                        >
                            <Button className={'btn btn-warning btn-sm me-2'}>
                                <i className="bi bi-person-slash"></i>
                                <span className="ps-2">logout</span>
                            </Button>
                        </AlertModal>
                    )}
                    {adminIsLogged && (
                        <AlertModal
                            message="Are you sure you want to logout admin?"
                            onConfirm={() => {
                                handleLogoutAdmin();
                            }}
                            confirmText="Logout"
                            cancelText="Cancel"
                        >
                            <Button className={'btn btn-warning me-1 btn-sm'}>
                                <i className="bi bi-person-slash"></i>
                                <span className="ps-2">logout</span>
                            </Button>
                        </AlertModal>
                    )}
                </div>
            </Navbar>
        </div>
    )
}
