import { addExpanse, editExpanseApi } from "@/rest_API/expanses_api";
import { fetchData } from "next-auth/client/_utils";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";

const EditExpanse = ({ children, id, datas, fetchData }) => {
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [wallet, setWallet] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [currentData, setCurrentData] = useState([]);
    useEffect(() => {
        if (datas.length > 0) {
            getCurrentData();
        }
    }, [datas]);

    useEffect(() => {
        setCategory(currentData.expanses_id);
        setAmount(currentData.amount);
        setWallet(currentData.wallet_id);
        // if (datas.length > 0) {
        // const newDate = currentData[0].date_transaction;
        // const parts = newDate.split("/");
        // const formattedDate = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
        // setDate(formattedDate);
        // console.log("ok");
        // console.log(currentData);
        // }

        setDescription(currentData.description);
    }, [currentData]);

    const getCurrentData = () => {
        const [incomingData] = datas;
        setCurrentData(incomingData);
    };
    const handleClick = async (event) => {
        event.preventDefault();
        console.log("ok");
        const data = { wallet_id: wallet, expanses_id: category, amount, date_transaction: date, description };
        console.log(data);
        console.log(id);
        const response = await editExpanseApi(data,id);
        fetchData();
        handleClose();
    };
    const handleClose = () => {
        router.push("/expanses");
        setShow(false);
    };
    const router = useRouter();
    const handleShow = () => {
        router.push(`/expanses/${id}`);
        setShow(true);
    };

    return (
        <Row>
            <Col>
                {/* Button for trigger Modal */}
                {}
                <Button variant="primary" onClick={handleShow}>
                    {children}
                </Button>
                {/* Add Expense Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Expanse</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="mt-2">
                            <Form.Group className="mb-2">
                                <Form.Select
                                    aria-label="Default select example"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option disabled>Expense Category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                    <option value="5">Five</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    type="number"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    placeholder="Transaction Amount"
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    aria-label="Default select example"
                                    value={wallet}
                                    onChange={(e) => {
                                        setWallet(e.target.value);
                                    }}
                                >
                                    <option>Select Wallet</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    type="date"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-end flex-column">
                                <Button variant="primary" className="" type="submit" onClick={(event)=>handleClick(event)}>
                                    Add Expense
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    );
};

export default EditExpanse;
