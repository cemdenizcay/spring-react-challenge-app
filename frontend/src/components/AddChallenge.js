import { useState } from "react";
import { toast } from 'react-toastify';
import api from '../api';

function AddChallenge({ onChallengeAdded }) {
    const [month, setMonth] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await api.post('/challenges', { 
                month, 
                description, 
                subTasks: []
            });
            toast.success('Challenge added successfully!');
            setMonth('');
            setDescription('');
            onChallengeAdded();
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors(err.response.data);
                toast.warn('Please fill all the required fields.');
            } else {
                setErrors({ general: 'An unexpected error occurred.' });
                toast.error('An unexpected error occurred.');
            }
            console.error("Error adding challenge:", err);
        }
    };

    return (
        <div className="card my-5">
            <div className="card-header">Add New Challenge</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="month" className="form-label">Month</label>
                        <input type="text" className={`form-control ${errors.month ? 'is-invalid' : ''}`}
                               placeholder="e.g., January" id="month" value={month}
                               onChange={(e) => setMonth(e.target.value)} required/>
                        {errors.month && <div className="invalid-feedback">{errors.month}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                  placeholder="e.g., Describe the challenge" value={description}
                                  onChange={(e) => setDescription(e.target.value)} required></textarea>
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                    {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddChallenge;