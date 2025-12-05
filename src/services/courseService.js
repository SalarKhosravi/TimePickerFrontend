import apiService from "./apiService";

export const getCourses = async () => {
    return await apiService("get", "/courses/");
};

export const createCourse = async (courseData) => {
    return await apiService("post", "/courses/", courseData);
};

export const getCourseCalendar = async (id) => {
    return await apiService("get", `/courses/${id}/calendar/`);
};
