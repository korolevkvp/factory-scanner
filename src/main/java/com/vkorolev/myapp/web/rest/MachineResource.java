package com.vkorolev.myapp.web.rest;

import com.vkorolev.myapp.repository.MachineRepository;
import com.vkorolev.myapp.service.MachineService;
import com.vkorolev.myapp.service.dto.MachineDTO;
import com.vkorolev.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.vkorolev.myapp.domain.Machine}.
 */
@RestController
@RequestMapping("/api")
public class MachineResource {

    private final Logger log = LoggerFactory.getLogger(MachineResource.class);

    private static final String ENTITY_NAME = "machine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MachineService machineService;

    private final MachineRepository machineRepository;

    public MachineResource(MachineService machineService, MachineRepository machineRepository) {
        this.machineService = machineService;
        this.machineRepository = machineRepository;
    }

    /**
     * {@code POST  /machines} : Create a new machine.
     *
     * @param machineDTO the machineDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new machineDTO, or with status {@code 400 (Bad Request)} if the machine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/machines")
    public ResponseEntity<MachineDTO> createMachine(@RequestBody MachineDTO machineDTO) throws URISyntaxException {
        log.debug("REST request to save Machine : {}", machineDTO);
        if (machineDTO.getId() != null) {
            throw new BadRequestAlertException("A new machine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MachineDTO result = machineService.save(machineDTO);
        return ResponseEntity
            .created(new URI("/api/machines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /machines/:id} : Updates an existing machine.
     *
     * @param id the id of the machineDTO to save.
     * @param machineDTO the machineDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated machineDTO,
     * or with status {@code 400 (Bad Request)} if the machineDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the machineDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/machines/{id}")
    public ResponseEntity<MachineDTO> updateMachine(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MachineDTO machineDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Machine : {}, {}", id, machineDTO);
        if (machineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, machineDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!machineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MachineDTO result = machineService.update(machineDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, machineDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /machines/:id} : Partial updates given fields of an existing machine, field will ignore if it is null
     *
     * @param id the id of the machineDTO to save.
     * @param machineDTO the machineDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated machineDTO,
     * or with status {@code 400 (Bad Request)} if the machineDTO is not valid,
     * or with status {@code 404 (Not Found)} if the machineDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the machineDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/machines/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MachineDTO> partialUpdateMachine(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MachineDTO machineDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Machine partially : {}, {}", id, machineDTO);
        if (machineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, machineDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!machineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MachineDTO> result = machineService.partialUpdate(machineDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, machineDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /machines} : get all the machines.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of machines in body.
     */
    @GetMapping("/machines")
    public ResponseEntity<List<MachineDTO>> getAllMachines(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Machines");
        Page<MachineDTO> page = machineService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /machines/:id} : get the "id" machine.
     *
     * @param id the id of the machineDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the machineDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/machines/{id}")
    public ResponseEntity<MachineDTO> getMachine(@PathVariable Long id) {
        log.debug("REST request to get Machine : {}", id);
        Optional<MachineDTO> machineDTO = machineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(machineDTO);
    }

    /**
     * {@code DELETE  /machines/:id} : delete the "id" machine.
     *
     * @param id the id of the machineDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/machines/{id}")
    public ResponseEntity<Void> deleteMachine(@PathVariable Long id) {
        log.debug("REST request to delete Machine : {}", id);
        machineService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
