package com.pelinportfolio.api.dto;

import com.pelinportfolio.api.model.Project;

import java.util.List;

public record ProjectResponse(
        String id,
        String title,
        String description,
        List<String> techStack,
        String githubUrl,
        String liveUrl,
        String imageUrl,
        boolean featured,
        int displayOrder,
        String role,
        String takeaway,
        String cardColor,
        String category,
        String snippet
) {
    public static ProjectResponse from(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechStack(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getImageUrl(),
                project.isFeatured(),
                project.getDisplayOrder(),
                project.getRole(),
                project.getTakeaway(),
                project.getCardColor(),
                project.getCategory(),
                project.getSnippet()
        );
    }
}
