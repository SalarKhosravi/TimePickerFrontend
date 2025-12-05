import apiService from "./apiService";

export const getStudents = async () => {
    return await apiService("get", "/students/");
};

export const deleteStudent = async (student_id) => {
    return await apiService("delete", `/students/${student_id}/`);
};

export const registerStudent = async (name) => {
    return await apiService("post", `/students/`, { name });
};
