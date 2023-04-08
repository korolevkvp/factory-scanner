package com.vkorolev.myapp.service;

import com.vkorolev.myapp.service.dto.MachineDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.vkorolev.myapp.domain.Machine}.
 */
public interface MachineService {
    /**
     * Save a machine.
     *
     * @param machineDTO the entity to save.
     * @return the persisted entity.
     */
    MachineDTO save(MachineDTO machineDTO);

    /**
     * Updates a machine.
     *
     * @param machineDTO the entity to update.
     * @return the persisted entity.
     */
    MachineDTO update(MachineDTO machineDTO);

    /**
     * Partially updates a machine.
     *
     * @param machineDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MachineDTO> partialUpdate(MachineDTO machineDTO);

    /**
     * Get all the machines.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MachineDTO> findAll(Pageable pageable);

    /**
     * Get all the machines with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MachineDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" machine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MachineDTO> findOne(Long id);

    /**
     * Delete the "id" machine.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
