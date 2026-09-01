package com.shruti.passwordanalyzer.service;

import com.shruti.passwordanalyzer.entity.SecurityTopic;
import com.shruti.passwordanalyzer.exception.ResourceNotFoundException;
import com.shruti.passwordanalyzer.repository.SecurityTopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityTopicService {

    private final SecurityTopicRepository repository;

    public SecurityTopicService(SecurityTopicRepository repository) {
        this.repository = repository;
    }

    public List<SecurityTopic> getAll() {
        return repository.findAll();
    }

    public SecurityTopic getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));
    }
}