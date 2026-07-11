package com.pelinportfolio.api.service;

import com.pelinportfolio.api.dto.ProjectResponse;
import com.pelinportfolio.api.exception.ResourceNotFoundException;
import com.pelinportfolio.api.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(ProjectResponse::from)
                .toList();
    }

    public ProjectResponse findById(String id) {
        return projectRepository.findById(id)
                .map(ProjectResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Project '" + id + "' was not found."));
    }
}
