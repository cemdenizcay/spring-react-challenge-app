import Challenge from './Challenge';

function ChallengeList({ challenges, onEdit, onDelete, onSubTaskAdded, onSubTaskToggled, onSubTaskDeleted }) {
    return (
        <div className="list-group list-group-flush">
            {challenges.map(challenge => (
                <Challenge
                    key={challenge.id}
                    challenge={challenge}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSubTaskAdded={onSubTaskAdded}
                    onSubTaskToggled={onSubTaskToggled}
                    onSubTaskDeleted={onSubTaskDeleted}
                />
            ))}
        </div>
    );
}

export default ChallengeList;