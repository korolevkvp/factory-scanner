package com.vkorolev.myapp.service;

import com.vkorolev.myapp.service.dto.FactoryDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.vkorolev.myapp.domain.Factory}.
 */
public interface FactoryService {
    /**
     * Save a factory.
     *
     * @param factoryDTO the entity to save.
     * @return the persisted entity.
     */
    FactoryDTO save(FactoryDTO factoryDTO);

    /**
     * Updates a factory.
     *
     * @param factoryDTO the entity to update.
     * @return the persisted entity.
     */
    FactoryDTO update(FactoryDTO factoryDTO);

    /**
     * Partially updates a factory.
     *
     * @param factoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FactoryDTO> partialUpdate(FactoryDTO factoryDTO);

    /**
     * Get all the factories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FactoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" factory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FactoryDTO> findOne(Long id);

    /**
     * Delete the "id" factory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
