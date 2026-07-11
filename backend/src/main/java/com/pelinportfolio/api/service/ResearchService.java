package com.pelinportfolio.api.service;

import com.pelinportfolio.api.dto.ResearchResponse;
import com.pelinportfolio.api.repository.ResearchItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResearchService {

    private final ResearchItemRepository researchItemRepository;

    public ResearchService(ResearchItemRepository researchItemRepository) {
        this.researchItemRepository = researchItemRepository;
    }

    public List<ResearchResponse> findAll() {
        return researchItemRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(ResearchResponse::from)
                .toList();
    }
}
