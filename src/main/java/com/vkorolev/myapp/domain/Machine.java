package com.vkorolev.myapp.domain;

import com.vkorolev.myapp.domain.enumeration.MachineType;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Machine.
 */
@Entity
@Table(name = "machine")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Machine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "model")
    private String model;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private MachineType type;

    @ManyToOne
    private Factory factory;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Machine id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return this.model;
    }

    public Machine model(String model) {
        this.setModel(model);
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public MachineType getType() {
        return this.type;
    }

    public Machine type(MachineType type) {
        this.setType(type);
        return this;
    }

    public void setType(MachineType type) {
        this.type = type;
    }

    public Factory getFactory() {
        return this.factory;
    }

    public void setFactory(Factory factory) {
        this.factory = factory;
    }

    public Machine factory(Factory factory) {
        this.setFactory(factory);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Machine)) {
            return false;
        }
        return id != null && id.equals(((Machine) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Machine{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
