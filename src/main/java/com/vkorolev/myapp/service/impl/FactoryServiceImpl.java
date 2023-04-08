package com.vkorolev.myapp.service.impl;

import com.vkorolev.myapp.domain.Factory;
import com.vkorolev.myapp.repository.FactoryRepository;
import com.vkorolev.myapp.service.FactoryService;
import com.vkorolev.myapp.service.dto.FactoryDTO;
import com.vkorolev.myapp.service.mapper.FactoryMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Factory}.
 */
@Service
@Transactional
public class FactoryServiceImpl implements FactoryService {

    private final Logger log = LoggerFactory.getLogger(FactoryServiceImpl.class);

    private final FactoryRepository factoryRepository;

    private final FactoryMapper factoryMapper;

    public FactoryServiceImpl(FactoryRepository factoryRepository, FactoryMapper factoryMapper) {
        this.factoryRepository = factoryRepository;
        this.factoryMapper = factoryMapper;
    }

    @Override
    public FactoryDTO save(FactoryDTO factoryDTO) {
        log.debug("Request to save Factory : {}", factoryDTO);
        Factory factory = factoryMapper.toEntity(factoryDTO);
        factory = factoryRepository.save(factory);
        return factoryMapper.toDto(factory);
    }

    @Override
    public FactoryDTO update(FactoryDTO factoryDTO) {
        log.debug("Request to update Factory : {}", factoryDTO);
        Factory factory = factoryMapper.toEntity(factoryDTO);
        factory = factoryRepository.save(factory);
        return factoryMapper.toDto(factory);
    }

    @Override
    public Optional<FactoryDTO> partialUpdate(FactoryDTO factoryDTO) {
        log.debug("Request to partially update Factory : {}", factoryDTO);

        return factoryRepository
            .findById(factoryDTO.getId())
            .map(existingFactory -> {
                factoryMapper.partialUpdate(existingFactory, factoryDTO);

                return existingFactory;
            })
            .map(factoryRepository::save)
            .map(factoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FactoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Factories");
        return factoryRepository.findAll(pageable).map(factoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FactoryDTO> findOne(Long id) {
        log.debug("Request to get Factory : {}", id);
        return factoryRepository.findById(id).map(factoryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Factory : {}", id);
        factoryRepository.deleteById(id);
    }
}
