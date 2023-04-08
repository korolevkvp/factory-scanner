package com.vkorolev.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.vkorolev.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MachineTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Machine.class);
        Machine machine1 = new Machine();
        machine1.setId(1L);
        Machine machine2 = new Machine();
        machine2.setId(machine1.getId());
        assertThat(machine1).isEqualTo(machine2);
        machine2.setId(2L);
        assertThat(machine1).isNotEqualTo(machine2);
        machine1.setId(null);
        assertThat(machine1).isNotEqualTo(machine2);
    }
}
