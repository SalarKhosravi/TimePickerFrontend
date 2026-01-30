import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {
    isUserLoggedIn,
    handleUserLogout,
    isAdminLoggedIn,
    handleAdminLogout,
    getUserInfo
} from "@/services/AuthService.js";
import {Button} from "react-bootstrap";
import AlertModal from '@/components/partitions/AlertModal.jsx'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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

    let UserInfo = getUserInfo()
    let phone_number = UserInfo.phone_number
    let full_name = UserInfo.full_name

    const isUser = isUserLoggedIn();
    const isAdmin = isAdminLoggedIn();

    function handleLogout() {
        if (isUser) {
            handleLogoutUser();
        } else if (isAdmin) {
            handleLogoutAdmin();
        } else {
            console.error('can find user to logout')
        }
    }


    return (
        <div className="">
            <Navbar className="bg-body-tertiary px-2 px-lg-4">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className="">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/courses">Dashboard</Nav.Link>
                            {isAdmin && (
                                <Nav.Link as={Link} to="/admin/users">Students</Nav.Link>
                            )}
                        </Nav>
                    </div>
                    <div className={'d-flex flex-row justify-content-end align-items-center'}>
                        <Button onClick={()=>{reloadPage()}} className={'btn btn-primary me-1 btn-sm'}>
                            <i className="bi bi-arrow-clockwise"></i>
                        </Button>
                        <DropdownButton
                            align="end"
                            title={full_name ?? 'unknown'}
                            id="dropdown-menu-align-end"
                            className={'me-3'}
                            size="sm"
                        >
                            {phone_number && (
                                <Dropdown.Item href="#/action-2">
                                    <i className="bi bi-telephone pe-3"></i>
                                    {phone_number}
                                </Dropdown.Item>
                            )}
                            <AlertModal
                                message="Are you sure you want to logout admin?"
                                onConfirm={() => { handleLogout(); }}
                                confirmText="Logout"
                                cancelText="Cancel"
                            >
                                <Dropdown.Item href="#/action-2">
                                    <i className="bi bi-x-circle"></i>
                                    <span className="px-3">Log out</span>
                                </Dropdown.Item>
                            </AlertModal>
                        </DropdownButton>

                    </div>
                </div>
            </Navbar>
        </div>
    )
}
