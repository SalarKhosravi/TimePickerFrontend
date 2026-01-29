import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {isUserLoggedIn, handleUserLogout, isAdminLoggedIn, handleAdminLogout} from "@/services/AuthService.js";
import {Button} from "react-bootstrap";
import AlertModal from '@/components/partitions/AlertModal.jsx'

function  reloadPage(){
    window.location.reload()
}

async function handleLogoutUser(){
    const result = await handleUserLogout();

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
    const isLoggedIn = isUserLoggedIn();
    const adminIsLogged = isAdminLoggedIn();

    return (
        <div className="">
            <Navbar className="bg-body-tertiary px-2 px-lg-4">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className="">
                        <Nav className="me-auto">
                            {adminIsLogged && (
                                <Nav.Link as={Link} to="/admin/users">Students</Nav.Link>
                            )}
                            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                        </Nav>
                    </div>
                    <div className={'d-flex flex-row justify-content-end align-items-center'}>
                        <Button onClick={()=>{reloadPage()}} className={'btn btn-primary me-1 btn-sm'}>
                            <i className="bi bi-arrow-clockwise"></i>
                        </Button>
                        {isLoggedIn && (
                            <AlertModal
                                message="Are you sure you want to logout?"
                                onConfirm={() => {
                                    handleLogoutUser();
                                }}
                                confirmText="Logout"
                                cancelText="Cancel"
                            >
                                <Button className={'btn btn-warning btn-sm me-2'}>
                                    <span className="px-3">Exit</span>
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
                                    <span className="px-3">Exit</span>
                                </Button>
                            </AlertModal>
                        )}
                    </div>
                </div>
            </Navbar>
        </div>
    )
}
