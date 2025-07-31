import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api';
import AddChallenge from '../components/AddChallenge';
import ChallengeList from '../components/ChallengeList';
import EditChallengeModal from '../components/EditChallengeModal';

function ChallengesPage() {
    const [challenges, setChallenges] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState(null);
    
    const fetchChallenges = async () => {
        try {
            const response = await api.get('/challenges');
            setChallenges(response.data);
        } catch (error) {
            console.error("Error fetching challenges: ", error);
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);
    
    const handleChallengeAddedOrUpdated = () => {
        fetchChallenges();
    };

    const handleEdit = (challenge) => {
        setEditingChallenge(challenge);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditingChallenge(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this challenge?')) {
            try {
                await api.delete(`/challenges/${id}`);
                setChallenges(challenges.filter(c => c.id !== id));
                toast.success('Challenge deleted successfully!');
            } catch (error) {
                toast.error('Failed to delete challenge.');
            }
        }
    };
    
    const handleSubTaskAdded = async (challengeId, subTask) => {
        try {
            await api.post(`/api/challenges/${challengeId}/subtasks`, subTask);
            toast.success("Sub-task added!");
            fetchChallenges();
        } catch (error) {
            toast.error("Failed to add sub-task.");
        }
    };

    const handleSubTaskToggled = async (challengeId, subTaskToUpdate) => {
        const updatedSubTask = { ...subTaskToUpdate, completed: !subTaskToUpdate.completed };
        try {
            await api.put(`/api/subtasks/${subTaskToUpdate.id}`, updatedSubTask);
            setChallenges(prevChallenges => prevChallenges.map(challenge => {
                if (challenge.id === challengeId) {
                    const newSubTasks = challenge.subTasks.map(st => 
                        st.id === subTaskToUpdate.id ? updatedSubTask : st
                    );
                    return { ...challenge, subTasks: newSubTasks };
                }
                return challenge;
            }));
        } catch (error) {
            toast.error("Failed to update sub-task status.");
        }
    };

    const handleSubTaskDeleted = async (challengeId, subTaskId) => {
        try {
            await api.delete(`/api/subtasks/${subTaskId}`);
            setChallenges(prevChallenges => prevChallenges.map(challenge =>
                challenge.id === challengeId
                    ? { ...challenge, subTasks: challenge.subTasks.filter(st => st.id !== subTaskId) }
                    : challenge
            ));
            toast.success('Sub-task deleted.');
        } catch (error) {
            toast.error('Failed to delete sub-task.');
        }
    };

    return (
        <>
            <h1 className='text-center mb-4'>Monthly Challenges</h1>
            <AddChallenge onChallengeAdded={handleChallengeAddedOrUpdated} />
            <ChallengeList
                challenges={challenges}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSubTaskAdded={handleSubTaskAdded}
                onSubTaskToggled={handleSubTaskToggled}
                onSubTaskDeleted={handleSubTaskDeleted}
            />
             {editingChallenge && (
                <EditChallengeModal
                    show={showEditModal}
                    onHide={handleCloseModal}
                    challenge={editingChallenge}
                    onChallengeUpdated={handleChallengeAddedOrUpdated}
                />
            )}
        </>
    );
}

export default ChallengesPage;