package com.vkorolev.myapp.domain;

import com.vkorolev.myapp.domain.enumeration.Grade;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;

/**
 * A Worker.
 */
@Entity
@Table(name = "worker")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Worker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "salary")
    private Long salary;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "hire_date")
    private LocalDate hireDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "grade")
    private Grade grade;

    @ManyToOne
    private Job job;

    @ManyToOne
    private Factory factory;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Worker id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Worker firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return this.middleName;
    }

    public Worker middleName(String middleName) {
        this.setMiddleName(middleName);
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Worker lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getSalary() {
        return this.salary;
    }

    public Worker salary(Long salary) {
        this.setSalary(salary);
        return this;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Worker phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getHireDate() {
        return this.hireDate;
    }

    public Worker hireDate(LocalDate hireDate) {
        this.setHireDate(hireDate);
        return this;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public Grade getGrade() {
        return this.grade;
    }

    public Worker grade(Grade grade) {
        this.setGrade(grade);
        return this;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Job getJob() {
        return this.job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Worker job(Job job) {
        this.setJob(job);
        return this;
    }

    public Factory getFactory() {
        return this.factory;
    }

    public void setFactory(Factory factory) {
        this.factory = factory;
    }

    public Worker factory(Factory factory) {
        this.setFactory(factory);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Worker)) {
            return false;
        }
        return id != null && id.equals(((Worker) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Worker{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", salary=" + getSalary() +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", grade='" + getGrade() + "'" +
            "}";
    }
}
