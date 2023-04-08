package com.vkorolev.myapp.service.impl;

import com.vkorolev.myapp.domain.Worker;
import com.vkorolev.myapp.repository.WorkerRepository;
import com.vkorolev.myapp.service.WorkerService;
import com.vkorolev.myapp.service.dto.WorkerDTO;
import com.vkorolev.myapp.service.mapper.WorkerMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Worker}.
 */
@Service
@Transactional
public class WorkerServiceImpl implements WorkerService {

    private final Logger log = LoggerFactory.getLogger(WorkerServiceImpl.class);

    private final WorkerRepository workerRepository;

    private final WorkerMapper workerMapper;

    public WorkerServiceImpl(WorkerRepository workerRepository, WorkerMapper workerMapper) {
        this.workerRepository = workerRepository;
        this.workerMapper = workerMapper;
    }

    @Override
    public WorkerDTO save(WorkerDTO workerDTO) {
        log.debug("Request to save Worker : {}", workerDTO);
        Worker worker = workerMapper.toEntity(workerDTO);
        worker = workerRepository.save(worker);
        return workerMapper.toDto(worker);
    }

    @Override
    public WorkerDTO update(WorkerDTO workerDTO) {
        log.debug("Request to update Worker : {}", workerDTO);
        Worker worker = workerMapper.toEntity(workerDTO);
        worker = workerRepository.save(worker);
        return workerMapper.toDto(worker);
    }

    @Override
    public Optional<WorkerDTO> partialUpdate(WorkerDTO workerDTO) {
        log.debug("Request to partially update Worker : {}", workerDTO);

        return workerRepository
            .findById(workerDTO.getId())
            .map(existingWorker -> {
                workerMapper.partialUpdate(existingWorker, workerDTO);

                return existingWorker;
            })
            .map(workerRepository::save)
            .map(workerMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WorkerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Workers");
        return workerRepository.findAll(pageable).map(workerMapper::toDto);
    }

    public Page<WorkerDTO> findAllWithEagerRelationships(Pageable pageable) {
        return workerRepository.findAllWithEagerRelationships(pageable).map(workerMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WorkerDTO> findOne(Long id) {
        log.debug("Request to get Worker : {}", id);
        return workerRepository.findOneWithEagerRelationships(id).map(workerMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Worker : {}", id);
        workerRepository.deleteById(id);
    }
}
