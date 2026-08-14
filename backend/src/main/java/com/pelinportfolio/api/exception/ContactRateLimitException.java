package com.pelinportfolio.api.exception;

public class ContactRateLimitException extends RuntimeException {

    public ContactRateLimitException(String message) {
        super(message);
    }
}
