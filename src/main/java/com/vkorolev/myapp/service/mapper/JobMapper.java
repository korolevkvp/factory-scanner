package com.vkorolev.myapp.service.mapper;

import com.vkorolev.myapp.domain.Job;
import com.vkorolev.myapp.service.dto.JobDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Job} and its DTO {@link JobDTO}.
 */
@Mapper(componentModel = "spring")
public interface JobMapper extends EntityMapper<JobDTO, Job> {}
