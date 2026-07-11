package com.pelinportfolio.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 3000)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @OrderColumn(name = "tech_order")
    private List<String> techStack = new ArrayList<>();

    private String githubUrl;
    private String liveUrl;
    private String imageUrl;
    private boolean featured;

    @Column(nullable = false)
    private int displayOrder;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false, length = 2000)
    private String takeaway;

    @Column(nullable = false)
    private String cardColor;

    @Column(nullable = false)
    private String category;

    @Column(length = 5000)
    private String snippet;

    protected Project() {
    }

    public Project(
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
        this.id = id;
        this.title = title;
        this.description = description;
        this.techStack = new ArrayList<>(techStack);
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
        this.imageUrl = imageUrl;
        this.featured = featured;
        this.displayOrder = displayOrder;
        this.role = role;
        this.takeaway = takeaway;
        this.cardColor = cardColor;
        this.category = category;
        this.snippet = snippet;
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

    public List<String> getTechStack() {
        return List.copyOf(techStack);
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isFeatured() {
        return featured;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public String getRole() {
        return role;
    }

    public String getTakeaway() {
        return takeaway;
    }

    public String getCardColor() {
        return cardColor;
    }

    public String getCategory() {
        return category;
    }

    public String getSnippet() {
        return snippet;
    }
}
