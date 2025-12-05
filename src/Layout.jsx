import { Outlet } from 'react-router-dom'
import Topbar from '@/components/partitions/Topbar.jsx';
import Footbar from "@/components/partitions/Footbar.jsx";
import {ToastNotifications} from "@/components/partitions/ToastNotifications.jsx";
import {isAdminLoggedIn} from "@/services/AuthService.js";




export default function Layout() {
    const adminIsLogged = isAdminLoggedIn();
    return (
        <div className='container-fluid m-0 p-0 mx-auto'>
            <main className="">
                <ToastNotifications />
                <Topbar />
                <div className='container-fluid mx-auto mt-4'>
                    <Outlet /> 
                </div>
                {adminIsLogged ? <Footbar /> : null}
            </main>
        </div>
    )
}
