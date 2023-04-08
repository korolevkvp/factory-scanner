package com.vkorolev.myapp.repository;

import com.vkorolev.myapp.domain.Worker;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Worker entity.
 */
@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
    default Optional<Worker> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Worker> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Worker> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct worker from Worker worker left join fetch worker.job left join fetch worker.factory",
        countQuery = "select count(distinct worker) from Worker worker"
    )
    Page<Worker> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct worker from Worker worker left join fetch worker.job left join fetch worker.factory")
    List<Worker> findAllWithToOneRelationships();

    @Query("select worker from Worker worker left join fetch worker.job left join fetch worker.factory where worker.id =:id")
    Optional<Worker> findOneWithToOneRelationships(@Param("id") Long id);
}
