package com.vkorolev.myapp.service.mapper;

import com.vkorolev.myapp.domain.Factory;
import com.vkorolev.myapp.service.dto.FactoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Factory} and its DTO {@link FactoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface FactoryMapper extends EntityMapper<FactoryDTO, Factory> {}
