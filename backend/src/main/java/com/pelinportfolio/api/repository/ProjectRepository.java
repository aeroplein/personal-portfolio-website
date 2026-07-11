package com.pelinportfolio.api.repository;

import com.pelinportfolio.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, String> {
    List<Project> findAllByOrderByDisplayOrderAsc();
}
