package com.pelinportfolio.api.repository;

import com.pelinportfolio.api.model.ResearchItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResearchItemRepository extends JpaRepository<ResearchItem, String> {
    List<ResearchItem> findAllByOrderByDisplayOrderAsc();
}
