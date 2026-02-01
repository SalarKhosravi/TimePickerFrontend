import { forwardRef, useImperativeHandle, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';


const ImperativeAlertModal = forwardRef(function ImperativeAlertModal(
    {
        onConfirm,
    },
    ref
) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);

    useImperativeHandle(ref, () => ({
        open(payload) {
            setData(payload);
            setShow(true);
        },
        close() {
            setShow(false);
            setData(null);
        },
    }));

    const handleConfirm = () => {
        if (onConfirm) onConfirm(data);
        setShow(false);
    };        

    let id = data?.slot?.id
    let day = data?.slot?.day
    let time = data?.slot?.time
    let status = data?.slot?.status
    let count = data?.slot?.count
    let user_picks = data?.slot?.user_picks
    
    return (
        <> { data?.slot ? (            
                <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header className="row mx-0">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div className="">
                                {day?.toUpperCase()} ({time})
                            </div>
                            <div>
                                {count ? (
                                    <Button variant='primary'>
                                            No. {count}
                                    </Button>
                                ):(
                                    <Button variant='secondary'>
                                            Nobody
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="row mx-0">
                        {user_picks?.length === 0 ? (
                            <div className="text-center text-muted py-4">
                                <Alert variant='secondary'>
                                    No one yet
                                </Alert>
                            </div>
                        ) : (
                            <Table responsive hover borderless variant="dark">
                                <tbody>
                                    {user_picks.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.user.full_name}</td>
                                            <td>{item.user.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                            {status ? (
                                <Button variant='warning' onClick={handleConfirm}>Disable</Button>
                            ) : (
                                <Button variant='primary' onClick={handleConfirm}>Make accessible</Button>
                            )}
                    </Modal.Footer>
                </Modal>
            ): (
                <p></p>
            )}
        </>
    );
});

export default ImperativeAlertModal;
