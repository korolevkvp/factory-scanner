package com.vkorolev.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MachineMapperTest {

    private MachineMapper machineMapper;

    @BeforeEach
    public void setUp() {
        machineMapper = new MachineMapperImpl();
    }
}
