package com.shruti.passwordanalyzer.config;

import com.shruti.passwordanalyzer.entity.SecurityTopic;
import com.shruti.passwordanalyzer.repository.SecurityTopicRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SecurityTopicRepository repository;

    public DataSeeder(SecurityTopicRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        repository.save(new SecurityTopic(
                "Why length beats complexity",
                "A long passphrase is often stronger than a short complex password.",
                "Brute-force attacks scale exponentially with length, not character variety alone. A 16-character passphrase like 'correct-horse-battery-staple-42' can be far harder to crack than an 8-character password with symbols, while also being easier for you to remember.",
                "Passwords"
        ));

        repository.save(new SecurityTopic(
                "Never reuse passwords across sites",
                "One breach can compromise every account sharing that password.",
                "When one service is breached, attackers try the same email/password combination on other popular sites — this is called credential stuffing. A password manager makes unique passwords for every site practical.",
                "Passwords"
        ));

        repository.save(new SecurityTopic(
                "Enable two-factor authentication (2FA)",
                "A second factor protects you even if your password leaks.",
                "2FA requires something you have (a code from an app or SMS) in addition to something you know (your password). Authenticator apps like Google Authenticator or Authy are more secure than SMS-based 2FA, which can be intercepted via SIM swapping.",
                "2FA"
        ));

        repository.save(new SecurityTopic(
                "Recognizing phishing attempts",
                "Most breaches start with a convincing fake login page or email.",
                "Check the sender's actual email address, not just the display name. Hover over links before clicking to see the real URL. Legitimate services rarely ask you to 'verify your account' urgently via email.",
                "Phishing"
        ));
    }
}