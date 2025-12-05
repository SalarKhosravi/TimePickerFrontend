import { registerStudent } from "./studentService";

export function getUserInfo() {
    const storedName = localStorage.getItem('student_name');
    const storedId = localStorage.getItem('student_id');

    if (storedName && storedId) {
        return {
            id: storedId,
            name: storedName,
        }
    }
    console.error('cant found user info')
    return null;
}

export function isStudentLoggedIn() {
    const storedName = localStorage.getItem('student_name');
    const storedId = localStorage.getItem('student_id');

    return !!(storedName && storedId);
}


export function isAdminLoggedIn() {
    const user_token = localStorage.getItem('user_token');
    return !!user_token;
}


export function handleStudentLogout() {
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_id");
    return true;
}

export function handleAdminLogout() {
    localStorage.removeItem("user_token");
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

