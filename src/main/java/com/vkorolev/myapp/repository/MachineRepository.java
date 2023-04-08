package com.vkorolev.myapp.repository;

import com.vkorolev.myapp.domain.Machine;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Machine entity.
 */
@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {
    default Optional<Machine> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Machine> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Machine> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct machine from Machine machine left join fetch machine.factory",
        countQuery = "select count(distinct machine) from Machine machine"
    )
    Page<Machine> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct machine from Machine machine left join fetch machine.factory")
    List<Machine> findAllWithToOneRelationships();

    @Query("select machine from Machine machine left join fetch machine.factory where machine.id =:id")
    Optional<Machine> findOneWithToOneRelationships(@Param("id") Long id);
}
