package com.shruti.passwordanalyzer.controller;

import com.shruti.passwordanalyzer.dto.ApiResponse;
import com.shruti.passwordanalyzer.entity.SecurityTopic;
import com.shruti.passwordanalyzer.service.SecurityTopicService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class SecurityTopicController {

    private final SecurityTopicService service;

    public SecurityTopicController(SecurityTopicService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<SecurityTopic>> getAll() {
        return ApiResponse.success(service.getAll(), "Topics fetched successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<SecurityTopic> getById(@PathVariable Long id) {
        return ApiResponse.success(service.getById(id), "Topic fetched successfully");
    }
}