package com.vkorolev.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WorkerMapperTest {

    private WorkerMapper workerMapper;

    @BeforeEach
    public void setUp() {
        workerMapper = new WorkerMapperImpl();
    }
}
