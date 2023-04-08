package com.vkorolev.myapp.service.dto;

import com.vkorolev.myapp.domain.enumeration.MachineType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vkorolev.myapp.domain.Machine} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MachineDTO implements Serializable {

    private Long id;

    private String model;

    private MachineType type;

    private FactoryDTO factory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public MachineType getType() {
        return type;
    }

    public void setType(MachineType type) {
        this.type = type;
    }

    public FactoryDTO getFactory() {
        return factory;
    }

    public void setFactory(FactoryDTO factory) {
        this.factory = factory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MachineDTO)) {
            return false;
        }

        MachineDTO machineDTO = (MachineDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, machineDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MachineDTO{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            ", type='" + getType() + "'" +
            ", factory=" + getFactory() +
            "}";
    }
}
