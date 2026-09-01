package com.shruti.passwordanalyzer.repository;

import com.shruti.passwordanalyzer.entity.SecurityTopic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecurityTopicRepository extends JpaRepository<SecurityTopic, Long> {
}