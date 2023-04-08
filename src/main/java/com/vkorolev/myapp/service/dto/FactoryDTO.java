package com.vkorolev.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vkorolev.myapp.domain.Factory} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FactoryDTO implements Serializable {

    private Long id;

    private String name;

    private String streetAddress;

    private String postalCode;

    private String city;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FactoryDTO)) {
            return false;
        }

        FactoryDTO factoryDTO = (FactoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, factoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FactoryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
