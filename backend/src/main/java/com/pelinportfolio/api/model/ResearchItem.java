package com.pelinportfolio.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "research_items")
public class ResearchItem {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 3000)
    private String description;

    private String venue;
    private String status;
    private String url;

    @Column(nullable = false)
    private String iconName;

    @Column(nullable = false)
    private int displayOrder;

    protected ResearchItem() {
    }

    public ResearchItem(
            String id,
            String title,
            String description,
            String venue,
            String status,
            String url,
            String iconName,
            int displayOrder
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.venue = venue;
        this.status = status;
        this.url = url;
        this.iconName = iconName;
        this.displayOrder = displayOrder;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getVenue() {
        return venue;
    }

    public String getStatus() {
        return status;
    }

    public String getUrl() {
        return url;
    }

    public String getIconName() {
        return iconName;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }
}
