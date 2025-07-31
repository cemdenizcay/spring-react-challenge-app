import { useState } from 'react';
import { ProgressBar, Form, Button, InputGroup, ListGroup } from 'react-bootstrap';

function Challenge({ challenge, onEdit, onDelete, onSubTaskAdded, onSubTaskToggled, onSubTaskDeleted }) {
    const [newSubTaskDesc, setNewSubTaskDesc] = useState('');

    const completedCount = challenge.subTasks.filter(t => t.completed).length;
    const totalCount = challenge.subTasks.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    const handleAddSubTask = (e) => {
        e.preventDefault();
        if (newSubTaskDesc.trim() === '') return;
        onSubTaskAdded(challenge.id, { description: newSubTaskDesc, completed: false });
        setNewSubTaskDesc('');
    };

    return (
        <div className="list-group-item d-flex flex-column mb-3 shadow-sm">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{challenge.month}</h5>
            </div>
            <p className="mb-1 mt-2">{challenge.description}</p>
            
            <div className='mt-3'>
                <h6>Progress</h6>
                <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
                
                <ListGroup variant="flush" className="mt-3">
                    {challenge.subTasks.map(subTask => (
                        <ListGroup.Item key={subTask.id} className="d-flex justify-content-between align-items-center p-0 py-2">
                            <Form.Check 
                                type="checkbox"
                                id={`subtask-${subTask.id}`}
                                label={subTask.description}
                                checked={subTask.completed}
                                onChange={() => onSubTaskToggled(challenge.id, subTask)}
                                className={subTask.completed ? 'text-muted text-decoration-line-through' : ''}
                            />
                            <Button variant="link" className="p-0 text-danger" onClick={() => onSubTaskDeleted(challenge.id, subTask.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Form onSubmit={handleAddSubTask} className="mt-3">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Add a new sub-task"
                            value={newSubTaskDesc}
                            onChange={(e) => setNewSubTaskDesc(e.target.value)}
                        />
                        <Button type="submit" variant="outline-primary">Add</Button>
                    </InputGroup>
                </Form>
            </div>
            <div className="mt-3 align-self-end">
                 <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => onEdit(challenge)}>
                    Edit Challenge
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(challenge.id)}>
                    Delete Challenge
                </Button>
            </div>
        </div>
    );
}

export default Challenge;