package com.example.ChallangeApp;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService){
        this.challengeService = challengeService;
    }

    @GetMapping
    public ResponseEntity<List<Challenge>> getAllChallenges() {
        return new ResponseEntity<>(challengeService.getAllChallenges(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<String> addChallenge(@Valid @RequestBody Challenge challenge){
        boolean isChallengeAdded = challengeService.addChallenge(challenge);
        if(isChallengeAdded){
            return new ResponseEntity<>("Challenge added successfully", HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>("Challenge not added successfully", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateChallenge(@PathVariable Long id, @RequestBody Challenge updatedChallenge){
        boolean isChallengeUpdated= challengeService.updateChallenge(id, updatedChallenge);
        if(isChallengeUpdated){
            return new ResponseEntity<>("Challenge updated successfully", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Challenge not updated successfully", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChallenge(@PathVariable Long id){
        boolean isChallengeDeleted = challengeService.deleteChallenge(id);
        if(isChallengeDeleted){
            return new ResponseEntity<>("Challenge deleted successfully", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Challenge not deleted successfully", HttpStatus.NOT_FOUND);
        }
    }
}