import Table from 'react-bootstrap/Table';
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
                    <div className="col-12 px-4" >
                        <Table responsive hover borderless variant="dark">
                            <thead>
                            <tr className={'border-bottom'}>
                                <th>id</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {students && students.map((student) => (

                                    <tr key={student?.id}>
                                        <td>{student?.id}</td>
                                        <td>{student?.full_name}</td>
                                        <td>{student?.email}</td>
                                        <td>{student?.phone_number}</td>
                                        <td>
                                            <AlertModal
                                                message={`${student?.name} will be deleted, fine ?`}
                                                onConfirm={() => {
                                                    handleDeleteStudent(student?.id, refetch)
                                                }}
                                                buttonColor="danger"
                                                confirmText="Delete"
                                                cancelText="Cancel"
                                            >
                                            <Button
                                                key={student?.id}
                                                variant="danger"
                                                size="sm"
                                                className=""
                                            >
                                                <i className={'bi bi-trash'}></i>
                                            </Button>
                                            </AlertModal>
                                        </td>
                                    </tr>


                            ))}
                            </tbody>
                        </Table>
                    </div>
            </div>
        </div>
    )
}

