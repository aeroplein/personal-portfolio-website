package com.pelinportfolio.api.dto;

import com.pelinportfolio.api.model.ResearchItem;

public record ResearchResponse(
        String id,
        String title,
        String description,
        String venue,
        String status,
        String url,
        String iconName,
        int displayOrder
) {
    public static ResearchResponse from(ResearchItem item) {
        return new ResearchResponse(
                item.getId(),
                item.getTitle(),
                item.getDescription(),
                item.getVenue(),
                item.getStatus(),
                item.getUrl(),
                item.getIconName(),
                item.getDisplayOrder()
        );
    }
}
