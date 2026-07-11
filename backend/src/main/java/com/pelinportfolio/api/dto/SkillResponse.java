package com.pelinportfolio.api.dto;

import com.pelinportfolio.api.model.Skill;

public record SkillResponse(
        Long id,
        String name,
        String category,
        String level,
        int displayOrder
) {
    public static SkillResponse from(Skill skill) {
        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getLevel(),
                skill.getDisplayOrder()
        );
    }
}
