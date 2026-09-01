package com.shruti.passwordanalyzer.controller;

import com.shruti.passwordanalyzer.dto.ApiResponse;
import com.shruti.passwordanalyzer.dto.UserProfileResponse;
import com.shruti.passwordanalyzer.entity.User;
import com.shruti.passwordanalyzer.exception.ResourceNotFoundException;
import com.shruti.passwordanalyzer.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return ApiResponse.success(
                new UserProfileResponse(user.getEmail(), user.getCreatedAt()),
                "Profile fetched successfully"
        );
    }
}