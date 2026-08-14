package com.pelinportfolio.api.service;

import com.pelinportfolio.api.exception.ContactRateLimitException;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ContactRateLimiter {

    private static final int MAX_REQUESTS = 5;
    private static final long WINDOW_MILLIS = Duration.ofMinutes(15).toMillis();

    private final ConcurrentHashMap<String, RequestWindow> windows = new ConcurrentHashMap<>();

    public void check(String clientKey) {
        long now = System.currentTimeMillis();
        RequestWindow window = windows.compute(clientKey, (key, current) -> {
            if (current == null || current.resetAt() <= now) {
                return new RequestWindow(1, now + WINDOW_MILLIS);
            }
            return new RequestWindow(current.count() + 1, current.resetAt());
        });

        if (window.count() > MAX_REQUESTS) {
            throw new ContactRateLimitException("Too many messages. Please try again later.");
        }

        if (windows.size() > 10_000) {
            windows.entrySet().removeIf(entry -> entry.getValue().resetAt() <= now);
        }
    }

    private record RequestWindow(int count, long resetAt) {
    }
}
