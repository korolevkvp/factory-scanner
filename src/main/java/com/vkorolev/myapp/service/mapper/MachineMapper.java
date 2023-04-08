package com.vkorolev.myapp.service.mapper;

import com.vkorolev.myapp.domain.Factory;
import com.vkorolev.myapp.domain.Machine;
import com.vkorolev.myapp.service.dto.FactoryDTO;
import com.vkorolev.myapp.service.dto.MachineDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Machine} and its DTO {@link MachineDTO}.
 */
@Mapper(componentModel = "spring")
public interface MachineMapper extends EntityMapper<MachineDTO, Machine> {
    @Mapping(target = "factory", source = "factory", qualifiedByName = "factoryName")
    MachineDTO toDto(Machine s);

    @Named("factoryName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    FactoryDTO toDtoFactoryName(Factory factory);
}
