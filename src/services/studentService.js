import apiService from "./apiService";

export const getStudents = async () => {
    return await apiService("get", "/users/");
};

export const deleteStudent = async (student_id) => {
    return await apiService("delete", `/users/${student_id}/`);
};

export const registerStudent = async (name) => {
    return await apiService("post", `/auth/register/`, { name });
};
