import { registerStudent } from "./studentService";

export function getUserInfo() {
    const storedFullName = localStorage.getItem('full_name');
    const storedId = localStorage.getItem('user_id');

    if (storedFullName && storedId) {
        return {
            id: storedId,
            name: storedFullName,
        }
    }
    console.error('cant found user info')
    return null;
}

export function isStudentLoggedIn() {
    const user_token = localStorage.getItem('user_token');
    const full_name = localStorage.getItem('full_name');
    const phone_number = localStorage.getItem('phone_number');

    return !!(user_token && full_name && phone_number);
}


export function isAdminLoggedIn() {
    const user_token = localStorage.getItem('user_token');
    const phone_number = localStorage.getItem('phone_number');
    if (user_token){
        if (!phone_number) {
            return true
        }
    }
    return false;
}


export function handleStudentLogout() {
    localStorage.removeItem("user_token");
    localStorage.removeItem("full_name");
    localStorage.removeItem("phone_number");
    return true;
}

export function handleAdminLogout() {
    localStorage.removeItem("user_token");
    return true;
}

export function handleAdminLogin(token) {
    localStorage.setItem("user_token", token);
    return true;
}

export function handleUserLogin(data) {
    localStorage.setItem("user_id", data.id);
    localStorage.setItem("user_token", data.token);
    localStorage.setItem("full_name", data.full_name);
    localStorage.setItem("phone_number", data.phone_number);

    return true;
}


export async function handleRegisterStudent(name) {
    try {
        const result = await registerStudent(name);

        if (result.data) {
            localStorage.setItem('student_name', result.data.name);
            localStorage.setItem('student_id', result.data.id);

            return { ok: true, data: result.data };
        } else {
            return { ok: false, error: result.message || "Unknown error" };
        }
    } catch (err) {
        return { ok: false, error: err.message };
    }
}

