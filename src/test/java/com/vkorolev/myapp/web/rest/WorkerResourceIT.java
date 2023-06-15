package com.vkorolev.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.vkorolev.myapp.IntegrationTest;
import com.vkorolev.myapp.domain.Worker;
import com.vkorolev.myapp.repository.WorkerRepository;
import com.vkorolev.myapp.service.WorkerService;
import com.vkorolev.myapp.service.dto.WorkerDTO;
import com.vkorolev.myapp.service.mapper.WorkerMapper;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link WorkerResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class WorkerResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_SALARY = 1L;
    private static final Long UPDATED_SALARY = 2L;

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_HIRE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HIRE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_GRADE = 1L;
    private static final Long UPDATED_GRADE = 2L;

    private static final String ENTITY_API_URL = "/api/workers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private WorkerRepository workerRepository;

    @Mock
    private WorkerRepository workerRepositoryMock;

    @Autowired
    private WorkerMapper workerMapper;

    @Mock
    private WorkerService workerServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWorkerMockMvc;

    private Worker worker;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Worker createEntity(EntityManager em) {
        Worker worker = new Worker()
            .firstName(DEFAULT_FIRST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .salary(DEFAULT_SALARY)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .hireDate(DEFAULT_HIRE_DATE)
            .grade(DEFAULT_GRADE);
        return worker;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Worker createUpdatedEntity(EntityManager em) {
        Worker worker = new Worker()
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .salary(UPDATED_SALARY)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .hireDate(UPDATED_HIRE_DATE)
            .grade(UPDATED_GRADE);
        return worker;
    }

    @BeforeEach
    public void initTest() {
        worker = createEntity(em);
    }

    @Test
    @Transactional
    void createWorker() throws Exception {
        int databaseSizeBeforeCreate = workerRepository.findAll().size();
        // Create the Worker
        WorkerDTO workerDTO = workerMapper.toDto(worker);
        restWorkerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(workerDTO)))
            .andExpect(status().isCreated());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeCreate + 1);
        Worker testWorker = workerList.get(workerList.size() - 1);
        assertThat(testWorker.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testWorker.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testWorker.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testWorker.getSalary()).isEqualTo(DEFAULT_SALARY);
        assertThat(testWorker.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testWorker.getHireDate()).isEqualTo(DEFAULT_HIRE_DATE);
        assertThat(testWorker.getGrade()).isEqualTo(DEFAULT_GRADE);
    }

    @Test
    @Transactional
    void createWorkerWithExistingId() throws Exception {
        // Create the Worker with an existing ID
        worker.setId(1L);
        WorkerDTO workerDTO = workerMapper.toDto(worker);

        int databaseSizeBeforeCreate = workerRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(workerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllWorkers() throws Exception {
        // Initialize the database
        workerRepository.saveAndFlush(worker);

        // Get all the workerList
        restWorkerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(worker.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].salary").value(hasItem(DEFAULT_SALARY.intValue())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].hireDate").value(hasItem(DEFAULT_HIRE_DATE.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE.intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWorkersWithEagerRelationshipsIsEnabled() throws Exception {
        when(workerServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restWorkerMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(workerServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWorkersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(workerServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restWorkerMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(workerRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getWorker() throws Exception {
        // Initialize the database
        workerRepository.saveAndFlush(worker);

        // Get the worker
        restWorkerMockMvc
            .perform(get(ENTITY_API_URL_ID, worker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(worker.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.salary").value(DEFAULT_SALARY.intValue()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.hireDate").value(DEFAULT_HIRE_DATE.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingWorker() throws Exception {
        // Get the worker
        restWorkerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingWorker() throws Exception {
        // Initialize the database
        workerRepository.saveAndFlush(worker);

        int databaseSizeBeforeUpdate = workerRepository.findAll().size();

        // Update the worker
        Worker updatedWorker = workerRepository.findById(worker.getId()).get();
        // Disconnect from session so that the updates on updatedWorker are not directly saved in db
        em.detach(updatedWorker);
        updatedWorker
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .salary(UPDATED_SALARY)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .hireDate(UPDATED_HIRE_DATE)
            .grade(UPDATED_GRADE);
        WorkerDTO workerDTO = workerMapper.toDto(updatedWorker);

        restWorkerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, workerDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(workerDTO))
            )
            .andExpect(status().isOk());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
        Worker testWorker = workerList.get(workerList.size() - 1);
        assertThat(testWorker.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testWorker.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testWorker.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testWorker.getSalary()).isEqualTo(UPDATED_SALARY);
        assertThat(testWorker.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testWorker.getHireDate()).isEqualTo(UPDATED_HIRE_DATE);
        assertThat(testWorker.getGrade()).isEqualTo(UPDATED_GRADE);
    }

    @Test
    @Transactional
    void putNonExistingWorker() throws Exception {
        int databaseSizeBeforeUpdate = workerRepository.findAll().size();
        worker.setId(count.incrementAndGet());

        // Create the Worker
        WorkerDTO workerDTO = workerMapper.toDto(worker);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, workerDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(workerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWorker() throws Exception {
        int databaseSizeBeforeUpdate = workerRepository.findAll().size();
        worker.setId(count.incrementAndGet());

        // Create the Worker
        WorkerDTO workerDTO = workerMapper.toDto(worker);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(workerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWorker() throws Exception {
        int databaseSizeBeforeUpdate = workerRepository.findAll().size();
        worker.setId(count.incrementAndGet());

        // Create the Worker
        WorkerDTO workerDTO = workerMapper.toDto(worker);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(workerDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWorkerWithPatch() throws Exception {
        // Initialize the database
        workerRepository.saveAndFlush(worker);

        int databaseSizeBeforeUpdate = workerRepository.findAll().size();

        // Update the worker using partial update
        Worker partialUpdatedWorker = new Worker();
        partialUpdatedWorker.setId(worker.getId());

        partialUpdatedWorker
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .salary(UPDATED_SALARY)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .grade(UPDATED_GRADE);

        restWorkerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorker.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWorker))
            )
            .andExpect(status().isOk());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
        Worker testWorker = workerList.get(workerList.size() - 1);
        assertThat(testWorker.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testWorker.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testWorker.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testWorker.getSalary()).isEqualTo(UPDATED_SALARY);
        assertThat(testWorker.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testWorker.getHireDate()).isEqualTo(DEFAULT_HIRE_DATE);
        assertThat(testWorker.getGrade()).isEqualTo(UPDATED_GRADE);
    }

    @Test
    @Transactional
    void fullUpdateWorkerWithPatch() throws Exception {
        // Initialize the database
        workerRepository.saveAndFlush(worker);

        int databaseSizeBeforeUpdate = workerRepository.findAll().size();

        // Update the worker using partial update
        Worker partialUpdatedWorker = new Worker();
        partialUpdatedWorker.setId(worker.getId());

        partialUpdatedWorker
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .salary(UPDATED_SALARY)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .hireDate(UPDATED_HIRE_DATE)
            .grade(UPDATED_GRADE);

        restWorkerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorker.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWorker))
            )
            .andExpect(status().isOk());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
        Worker testWorker = workerList.get(workerList.size() - 1);
        assertThat(testWorker.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testWorker.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testWorker.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testWorker.getSalary()).isEqualTo(UPDATED_SALARY);
        assertThat(testWorker.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testWorker.getHireDate()).isEqualTo(UPDATED_HIRE_DATE);
        assertThat(testWorker.getGrade()).isEqualTo(UPDATED_GRADE);
    }

    @Test
    @Transactional
    void patchNonExistingWorker() throws Exception {
        int databaseSizeBeforeUpdate = workerRepository.findAll().size();
        worker.setId(count.incrementAndGet());

        // Create the Worker
        WorkerDTO workerDTO = workerMapper.toDto(worker);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, workerDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(workerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWorker() throws Exception {
        int databaseSizeBeforeUpdate = workerRepository.findAll().size();
        worker.setId(count.incrementAndGet());

        // Create the Worker
        WorkerDTO workerDTO = workerMapper.toDto(worker);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(workerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWorker() throws Exception {
        int databaseSizeBeforeUpdate = workerRepository.findAll().size();
        worker.setId(count.incrementAndGet());

        // Create the Worker
        WorkerDTO workerDTO = workerMapper.toDto(worker);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkerMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(workerDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Worker in the database
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWorker() throws Exception {
        // Initialize the database
        workerRepository.saveAndFlush(worker);

        int databaseSizeBeforeDelete = workerRepository.findAll().size();

        // Delete the worker
        restWorkerMockMvc
            .perform(delete(ENTITY_API_URL_ID, worker.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Worker> workerList = workerRepository.findAll();
        assertThat(workerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
