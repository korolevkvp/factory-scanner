package com.vkorolev.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.vkorolev.myapp.IntegrationTest;
import com.vkorolev.myapp.domain.Machine;
import com.vkorolev.myapp.domain.enumeration.MachineType;
import com.vkorolev.myapp.repository.MachineRepository;
import com.vkorolev.myapp.service.MachineService;
import com.vkorolev.myapp.service.dto.MachineDTO;
import com.vkorolev.myapp.service.mapper.MachineMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link MachineResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class MachineResourceIT {

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    private static final MachineType DEFAULT_TYPE = MachineType.LATHE;
    private static final MachineType UPDATED_TYPE = MachineType.MILLING;

    private static final String ENTITY_API_URL = "/api/machines";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MachineRepository machineRepository;

    @Mock
    private MachineRepository machineRepositoryMock;

    @Autowired
    private MachineMapper machineMapper;

    @Mock
    private MachineService machineServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMachineMockMvc;

    private Machine machine;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Machine createEntity(EntityManager em) {
        Machine machine = new Machine().model(DEFAULT_MODEL).type(DEFAULT_TYPE);
        return machine;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Machine createUpdatedEntity(EntityManager em) {
        Machine machine = new Machine().model(UPDATED_MODEL).type(UPDATED_TYPE);
        return machine;
    }

    @BeforeEach
    public void initTest() {
        machine = createEntity(em);
    }

    @Test
    @Transactional
    void createMachine() throws Exception {
        int databaseSizeBeforeCreate = machineRepository.findAll().size();
        // Create the Machine
        MachineDTO machineDTO = machineMapper.toDto(machine);
        restMachineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(machineDTO)))
            .andExpect(status().isCreated());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeCreate + 1);
        Machine testMachine = machineList.get(machineList.size() - 1);
        assertThat(testMachine.getModel()).isEqualTo(DEFAULT_MODEL);
        assertThat(testMachine.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void createMachineWithExistingId() throws Exception {
        // Create the Machine with an existing ID
        machine.setId(1L);
        MachineDTO machineDTO = machineMapper.toDto(machine);

        int databaseSizeBeforeCreate = machineRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMachineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(machineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMachines() throws Exception {
        // Initialize the database
        machineRepository.saveAndFlush(machine);

        // Get all the machineList
        restMachineMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(machine.getId().intValue())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMachinesWithEagerRelationshipsIsEnabled() throws Exception {
        when(machineServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMachineMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(machineServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMachinesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(machineServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMachineMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(machineRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getMachine() throws Exception {
        // Initialize the database
        machineRepository.saveAndFlush(machine);

        // Get the machine
        restMachineMockMvc
            .perform(get(ENTITY_API_URL_ID, machine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(machine.getId().intValue()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingMachine() throws Exception {
        // Get the machine
        restMachineMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMachine() throws Exception {
        // Initialize the database
        machineRepository.saveAndFlush(machine);

        int databaseSizeBeforeUpdate = machineRepository.findAll().size();

        // Update the machine
        Machine updatedMachine = machineRepository.findById(machine.getId()).get();
        // Disconnect from session so that the updates on updatedMachine are not directly saved in db
        em.detach(updatedMachine);
        updatedMachine.model(UPDATED_MODEL).type(UPDATED_TYPE);
        MachineDTO machineDTO = machineMapper.toDto(updatedMachine);

        restMachineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, machineDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(machineDTO))
            )
            .andExpect(status().isOk());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
        Machine testMachine = machineList.get(machineList.size() - 1);
        assertThat(testMachine.getModel()).isEqualTo(UPDATED_MODEL);
        assertThat(testMachine.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingMachine() throws Exception {
        int databaseSizeBeforeUpdate = machineRepository.findAll().size();
        machine.setId(count.incrementAndGet());

        // Create the Machine
        MachineDTO machineDTO = machineMapper.toDto(machine);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMachineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, machineDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(machineDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMachine() throws Exception {
        int databaseSizeBeforeUpdate = machineRepository.findAll().size();
        machine.setId(count.incrementAndGet());

        // Create the Machine
        MachineDTO machineDTO = machineMapper.toDto(machine);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMachineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(machineDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMachine() throws Exception {
        int databaseSizeBeforeUpdate = machineRepository.findAll().size();
        machine.setId(count.incrementAndGet());

        // Create the Machine
        MachineDTO machineDTO = machineMapper.toDto(machine);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMachineMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(machineDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMachineWithPatch() throws Exception {
        // Initialize the database
        machineRepository.saveAndFlush(machine);

        int databaseSizeBeforeUpdate = machineRepository.findAll().size();

        // Update the machine using partial update
        Machine partialUpdatedMachine = new Machine();
        partialUpdatedMachine.setId(machine.getId());

        partialUpdatedMachine.type(UPDATED_TYPE);

        restMachineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMachine.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMachine))
            )
            .andExpect(status().isOk());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
        Machine testMachine = machineList.get(machineList.size() - 1);
        assertThat(testMachine.getModel()).isEqualTo(DEFAULT_MODEL);
        assertThat(testMachine.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateMachineWithPatch() throws Exception {
        // Initialize the database
        machineRepository.saveAndFlush(machine);

        int databaseSizeBeforeUpdate = machineRepository.findAll().size();

        // Update the machine using partial update
        Machine partialUpdatedMachine = new Machine();
        partialUpdatedMachine.setId(machine.getId());

        partialUpdatedMachine.model(UPDATED_MODEL).type(UPDATED_TYPE);

        restMachineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMachine.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMachine))
            )
            .andExpect(status().isOk());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
        Machine testMachine = machineList.get(machineList.size() - 1);
        assertThat(testMachine.getModel()).isEqualTo(UPDATED_MODEL);
        assertThat(testMachine.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingMachine() throws Exception {
        int databaseSizeBeforeUpdate = machineRepository.findAll().size();
        machine.setId(count.incrementAndGet());

        // Create the Machine
        MachineDTO machineDTO = machineMapper.toDto(machine);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMachineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, machineDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(machineDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMachine() throws Exception {
        int databaseSizeBeforeUpdate = machineRepository.findAll().size();
        machine.setId(count.incrementAndGet());

        // Create the Machine
        MachineDTO machineDTO = machineMapper.toDto(machine);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMachineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(machineDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMachine() throws Exception {
        int databaseSizeBeforeUpdate = machineRepository.findAll().size();
        machine.setId(count.incrementAndGet());

        // Create the Machine
        MachineDTO machineDTO = machineMapper.toDto(machine);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMachineMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(machineDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Machine in the database
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMachine() throws Exception {
        // Initialize the database
        machineRepository.saveAndFlush(machine);

        int databaseSizeBeforeDelete = machineRepository.findAll().size();

        // Delete the machine
        restMachineMockMvc
            .perform(delete(ENTITY_API_URL_ID, machine.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Machine> machineList = machineRepository.findAll();
        assertThat(machineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
