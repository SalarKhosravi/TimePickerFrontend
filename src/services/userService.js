import apiService from "./apiService";

export const getUsers = async () => {
    return await apiService("get", "/users/");
};

export const deleteUser = async (user_id) => {
    return await apiService("delete", `/users/${user_id}/`);
};

export const registerUser = async (username, full_name, password) => {
    return await apiService("post", `/auth/register/`, { username, full_name, password });
};
