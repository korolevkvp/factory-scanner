package com.vkorolev.myapp.service.dto;

import com.vkorolev.myapp.domain.enumeration.JobType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vkorolev.myapp.domain.Job} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class JobDTO implements Serializable {

    private Long id;

    private String title;

    private JobType type;

    private Long minSalary;

    private Long maxSalary;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public JobType getType() {
        return type;
    }

    public void setType(JobType type) {
        this.type = type;
    }

    public Long getMinSalary() {
        return minSalary;
    }

    public void setMinSalary(Long minSalary) {
        this.minSalary = minSalary;
    }

    public Long getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof JobDTO)) {
            return false;
        }

        JobDTO jobDTO = (JobDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, jobDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", type='" + getType() + "'" +
            ", minSalary=" + getMinSalary() +
            ", maxSalary=" + getMaxSalary() +
            "}";
    }
}
