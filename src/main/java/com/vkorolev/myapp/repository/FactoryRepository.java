package com.vkorolev.myapp.repository;

import com.vkorolev.myapp.domain.Factory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Factory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FactoryRepository extends JpaRepository<Factory, Long> {}
