import { useEffect } from "react";
import { Button } from "react-bootstrap";
import AlertModal from "@/components/partitions/AlertModal.jsx";
import { toaste } from "@/components/partitions/ToastNotifications.jsx";
import { getStudents, deleteStudent } from "@/services/studentService.js";
import useFetch from "@/hooks/useFetch.js";

async function handleDeleteStudent(student_id, refetch) {
    try {
        const result = await deleteStudent(student_id);
        if (result.data) {
            toaste.show("Success", "Student deleted successfully!", 2500, 'success');
            refetch();
        } else if (result.message) {
            toaste.show("Failed !", result.message, 2500, 'danger');
        }
    } catch (err) {
        toaste.show("Error", err.message || "Failed to delete student", 2500, 'danger');
    }
}

export default function Students() {
    const { data: students, loading, error, refetch } = useFetch(getStudents, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading students: {error}</div>;

    return (
        <div className="mx-auto">
            <div className="d-inline-block bg-primary my-0 mb-5 py-2 ps-4 pe-5 rounded-end-5">
                <p className="p-0 m-0 h4">Students List</p>
            </div>
            <div className="row mx-auto">
                {students && students.map((student) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 xol-xxl-1 p-1" key={student.id}>
                        <AlertModal
                            message={`${student.name} will be deleted, fine ?`}
                            onConfirm={() => {
                                handleDeleteStudent(student.id, refetch)
                            }}
                            buttonColor="danger"
                            confirmText="Delete"
                            cancelText="Cancel"
                        >
                            <Button
                                key={student.id}
                                variant="secondary"
                                size="sm"
                                className="overflow-hidden text-nowrap w-100">
                                {student.name}
                            </Button>
                        </AlertModal>
                    </div>
                ))}
            </div>
        </div>
    )
}