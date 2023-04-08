package com.vkorolev.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.vkorolev.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WorkerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Worker.class);
        Worker worker1 = new Worker();
        worker1.setId(1L);
        Worker worker2 = new Worker();
        worker2.setId(worker1.getId());
        assertThat(worker1).isEqualTo(worker2);
        worker2.setId(2L);
        assertThat(worker1).isNotEqualTo(worker2);
        worker1.setId(null);
        assertThat(worker1).isNotEqualTo(worker2);
    }
}
