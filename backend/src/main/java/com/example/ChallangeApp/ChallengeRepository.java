package com.example.ChallangeApp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    Optional<Challenge> findByMonthIgnoreCase(String month);

    List<Challenge> findByUserId(Long userId);
}
