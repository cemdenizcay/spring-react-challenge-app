package com.example.ChallangeApp;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    public ChallengeService(ChallengeRepository challengeRepository, UserRepository userRepository) {
        this.challengeRepository = challengeRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    public List<Challenge> getAllChallenges() {
        User user = getCurrentUser();
        return challengeRepository.findByUserId(user.getId());
    }

    public boolean addChallenge(Challenge challenge) {
        User user = getCurrentUser();
        challenge.setUser(user);
        challenge.setStatus(ChallengeStatus.NOT_STARTED);
        challengeRepository.save(challenge);
        return true;
    }

    public boolean updateChallenge(Long id, Challenge updatedChallenge) {
        User user = getCurrentUser();
        Optional<Challenge> challengeOptional = challengeRepository.findById(id);
        if (challengeOptional.isPresent()) {
            Challenge challengeToUpdate = challengeOptional.get();

            if (challengeToUpdate.getUser() == null || !challengeToUpdate.getUser().getId().equals(user.getId())) {
                return false;
            }

            challengeToUpdate.setMonth(updatedChallenge.getMonth());
            challengeToUpdate.setDescription(updatedChallenge.getDescription());
            challengeRepository.save(challengeToUpdate);
            return true;
        }
        return false;
    }

    public boolean deleteChallenge(Long id) {
        User user = getCurrentUser();
        Optional<Challenge> challengeOptional = challengeRepository.findById(id);

        if (challengeOptional.isPresent()) {
            Challenge challengeToDelete = challengeOptional.get();

            if (challengeToDelete.getUser() == null || !challengeToDelete.getUser().getId().equals(user.getId())) {
                return false;
            }
            challengeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}