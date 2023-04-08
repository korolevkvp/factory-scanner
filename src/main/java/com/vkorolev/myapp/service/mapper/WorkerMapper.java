package com.vkorolev.myapp.service.mapper;

import com.vkorolev.myapp.domain.Factory;
import com.vkorolev.myapp.domain.Job;
import com.vkorolev.myapp.domain.Worker;
import com.vkorolev.myapp.service.dto.FactoryDTO;
import com.vkorolev.myapp.service.dto.JobDTO;
import com.vkorolev.myapp.service.dto.WorkerDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Worker} and its DTO {@link WorkerDTO}.
 */
@Mapper(componentModel = "spring")
public interface WorkerMapper extends EntityMapper<WorkerDTO, Worker> {
    @Mapping(target = "job", source = "job", qualifiedByName = "jobId")
    @Mapping(target = "factory", source = "factory", qualifiedByName = "factoryId")
    WorkerDTO toDto(Worker s);

    @Named("jobId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    JobDTO toDtoJobId(Job job);

    @Named("factoryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FactoryDTO toDtoFactoryId(Factory factory);
}
