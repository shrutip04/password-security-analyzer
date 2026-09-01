package com.shruti.passwordanalyzer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "security_topics")
public class SecurityTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 500)
    private String summary;

    @Column(nullable = false, length = 4000)
    private String content;

    @Column(nullable = false)
    private String category; // e.g. "Passwords", "Phishing", "2FA"

    public SecurityTopic() {}

    public SecurityTopic(String title, String summary, String content, String category) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.category = category;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}