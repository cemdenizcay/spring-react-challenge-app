package com.example.ChallangeApp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SubTaskController {

    private final SubTaskService subTaskService;

    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @PostMapping("/challenges/{challengeId}/subtasks")
    public ResponseEntity<String> addSubTask(@PathVariable Long challengeId, @RequestBody SubTask subTask) {
        boolean isAdded = subTaskService.addSubTaskToChallenge(challengeId, subTask);
        if (isAdded) {
            return new ResponseEntity<>("Sub-task added successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Challenge not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/subtasks/{subTaskId}")
    public ResponseEntity<String> updateSubTask(@PathVariable Long subTaskId, @RequestBody SubTask subTask) {
        boolean isUpdated = subTaskService.updateSubTask(subTaskId, subTask);
        if (isUpdated) {
            return new ResponseEntity<>("Sub-task updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Sub-task not found", HttpStatus.NOT_FOUND);
    }
    
    @DeleteMapping("/subtasks/{subTaskId}")
    public ResponseEntity<String> deleteSubTask(@PathVariable Long subTaskId) {
        boolean isDeleted = subTaskService.deleteSubTask(subTaskId);
        if (isDeleted) {
            return new ResponseEntity<>("Sub-task deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Sub-task not found", HttpStatus.NOT_FOUND);
    }
}