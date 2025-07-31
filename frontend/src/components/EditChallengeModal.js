import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';


function EditChallengeModal({ show, onHide, challenge, onChallengeUpdated }) {
    const [month, setMonth] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (challenge) {
            setMonth(challenge.month);
            setDescription(challenge.description);
        }
    }, [challenge]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!challenge) return;

        try {
            const response = await fetch(`http://localhost:8080/challenges/${challenge.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
          
                body: JSON.stringify({ 
                    month, 
                    description, 
                    status: challenge.status 
                }),
            });

            if (response.ok) {
                toast.success('Challenge updated successfully!');
                onChallengeUpdated();
                onHide();
            } else {
                toast.error("Failed to update challenge.");
                console.error("Failed to update challenge");
            }
        } catch (error) {
            toast.error("An error occurred while updating.");
            console.error("Error updating challenge:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Challenge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Month</Form.Label>
                        <Form.Control type="text" value={month} onChange={(e) => setMonth(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditChallengeModal;