package com.example.ChallangeApp;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubTaskService {
    private final SubTaskRepository subTaskRepository;
    private final ChallengeRepository challengeRepository;

    public SubTaskService(SubTaskRepository subTaskRepository, ChallengeRepository challengeRepository) {
        this.subTaskRepository = subTaskRepository;
        this.challengeRepository = challengeRepository;
    }

    public boolean addSubTaskToChallenge(Long challengeId, SubTask subTask) {
        Optional<Challenge> challengeOptional = challengeRepository.findById(challengeId);
        if (challengeOptional.isPresent()) {
            Challenge challenge = challengeOptional.get();
            subTask.setChallenge(challenge);
            subTaskRepository.save(subTask);
            return true;
        }
        return false;
    }

    public boolean updateSubTask(Long subTaskId, SubTask updatedSubTask) {
        Optional<SubTask> subTaskOptional = subTaskRepository.findById(subTaskId);
        if (subTaskOptional.isPresent()) {
            SubTask subTaskToUpdate = subTaskOptional.get();
            subTaskToUpdate.setDescription(updatedSubTask.getDescription());
            subTaskToUpdate.setCompleted(updatedSubTask.isCompleted());
            subTaskRepository.save(subTaskToUpdate);
            return true;
        }
        return false;
    }
    
    public boolean deleteSubTask(Long subTaskId) {
        if (subTaskRepository.existsById(subTaskId)) {
            subTaskRepository.deleteById(subTaskId);
            return true;
        }
        return false;
    }
}