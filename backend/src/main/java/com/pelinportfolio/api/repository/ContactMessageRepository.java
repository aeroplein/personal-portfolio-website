package com.pelinportfolio.api.repository;

import com.pelinportfolio.api.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
