package com.pelinportfolio.api.controller;

import com.pelinportfolio.api.dto.ProjectResponse;
import com.pelinportfolio.api.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectResponse> getProjects() {
        return projectService.findAll();
    }

    @GetMapping("/{id}")
    public ProjectResponse getProject(@PathVariable String id) {
        return projectService.findById(id);
    }
}
