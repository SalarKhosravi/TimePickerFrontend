import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import AlertModal from "@/components/partitions/AlertModal.jsx";
import { toaste } from "@/components/partitions/ToastNotifications.jsx";
import { getUsers, deleteUser } from "@/services/userService.js";
import useFetch from "@/hooks/useFetch.js";

async function handleDeleteUser(user_id, refetch) {
    try {
        const result = await deleteUser(user_id);
        if (result.data) {
            toaste.show("Success", "User deleted successfully!", 2500, 'success');
            refetch();
        } else if (result.message) {
            toaste.show("Failed !", result.message, 2500, 'danger');
        }
    } catch (err) {
        toaste.show("Error", err.message || "Failed to delete user", 2500, 'danger');
    }
}

export default function UsersList() {
    const { data: users, loading, error, refetch } = useFetch(getUsers, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading users: {error}</div>;

    return (
        <div className="mx-auto">
            <div className="d-inline-block bg-primary my-0 mb-5 py-2 ps-4 pe-5 rounded-end-5">
                <p className="p-0 m-0 h4">Users List</p>
            </div>
            <div className="row mx-auto">
                    <div className="col-12 px-0 px-md-2 px-lg-5" >
                        <Table responsive hover borderless variant="dark">
                            <thead>
                            <tr className={'border-bottom'}>
                                <th>id</th>
                                <th>Full Name</th>
                                {/* <th>Email</th> */}
                                <th>Phone</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user) => (
                                    <tr key={user?.id} className=''>
                                        <td >{user?.id}</td>
                                        <td className='text-nowrap'>{user?.full_name}</td>
                                        {/* <td>{user?.email}</td> */}
                                        <td className='text-nowrap'>{user?.phone_number}</td>
                                        <td>
                                            <AlertModal
                                                message={`${user?.full_name} will be deleted, fine ?`}
                                                onConfirm={() => {
                                                    handleDeleteUser(user?.id, refetch)
                                                }}
                                                buttonColor="danger"
                                                confirmText="Delete"
                                                cancelText="Cancel"
                                            >
                                            <Button
                                                key={user?.id}
                                                variant="danger"
                                                size="sm"
                                                className="float-end"
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

