package com.shruti.passwordanalyzer.dto;

import java.time.LocalDateTime;

public class UserProfileResponse {
    private String email;
    private LocalDateTime memberSince;

    public UserProfileResponse(String email, LocalDateTime memberSince) {
        this.email = email;
        this.memberSince = memberSince;
    }

    public String getEmail() { return email; }
    public LocalDateTime getMemberSince() { return memberSince; }
}