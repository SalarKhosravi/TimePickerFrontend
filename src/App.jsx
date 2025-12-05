import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Routes, Route, Link, useLocation, Navigate} from 'react-router-dom';
import './App.css'

import Layout from '@/Layout.jsx';
import Students from '@/pages/Students.jsx';
import ShowCourseList from '@/pages/ShowCourseList.jsx';
import StudentLogin from "@/pages/StudentLogin.jsx";

import { isStudentLoggedIn, isAdminLoggedIn } from "@/services/AuthService.js";
import AdminLogin from "@/pages/AdminLogin.jsx";
import CourseCalendarView from "@/pages/CourseCalendarView.jsx";
import NotFound from "@/pages/NotFound.jsx";


function ProtectedUserRoute({ children }) {
    const location = useLocation();
    const isLoggedIn = isStudentLoggedIn();
    const adminIsLogged = isAdminLoggedIn();

    if (!isLoggedIn && !adminIsLogged) {
        return <Navigate to="/students-login" replace state={{ from: location }} />;
    }

    return children;
}

function ProtectedAdminRoute({ children }) {
    const location = useLocation();
    const adminIsLogged = isAdminLoggedIn();

    if (!adminIsLogged) {
        return <Navigate to="/admin" replace state={{ from: location }} />;
    }

    return children;
}

function App() {

    const isLoggedIn = isStudentLoggedIn();
    const adminIsLogged = isAdminLoggedIn();
    return (
        <BrowserRouter>
            <Routes>
                {/*admin path*/}
                <Route path="/admin" element={adminIsLogged ? <Navigate to="/courses" replace /> : <AdminLogin />} />
                <Route element={<ProtectedAdminRoute><Layout /></ProtectedAdminRoute>}>
                    <Route path="/admin/course/calendar/:id" element={<CourseCalendarView />} />
                    <Route path="/admin/students" element={<Students />} />
                </Route>

                {/*user path*/}
                <Route path="/students-login" element={isLoggedIn ? <Navigate to="/" replace /> : <StudentLogin />} />
                <Route element={<ProtectedUserRoute><Layout /></ProtectedUserRoute>}>
                    <Route index element={<ShowCourseList />} />
                    <Route path="/courses" element={<ShowCourseList />} />
                    <Route path="/course/calendar/:id" element={<CourseCalendarView />} />

                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App
