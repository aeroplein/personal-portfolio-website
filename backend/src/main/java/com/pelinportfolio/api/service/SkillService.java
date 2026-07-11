package com.pelinportfolio.api.service;

import com.pelinportfolio.api.dto.SkillResponse;
import com.pelinportfolio.api.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillResponse> findAll() {
        return skillRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(SkillResponse::from)
                .toList();
    }
}
