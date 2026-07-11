package com.pelinportfolio.api.controller;

import com.pelinportfolio.api.dto.ResearchResponse;
import com.pelinportfolio.api.service.ResearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/research")
public class ResearchController {

    private final ResearchService researchService;

    public ResearchController(ResearchService researchService) {
        this.researchService = researchService;
    }

    @GetMapping
    public List<ResearchResponse> getResearchItems() {
        return researchService.findAll();
    }
}
