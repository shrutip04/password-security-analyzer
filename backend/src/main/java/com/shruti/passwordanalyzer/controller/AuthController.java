package com.shruti.passwordanalyzer.controller;

import com.shruti.passwordanalyzer.dto.ApiResponse;
import com.shruti.passwordanalyzer.dto.AuthResponse;
import com.shruti.passwordanalyzer.dto.LoginRequest;
import com.shruti.passwordanalyzer.dto.RegisterRequest;
import com.shruti.passwordanalyzer.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.success(authService.register(request), "Registered successfully");
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success(authService.login(request), "Login successful");
    }
}