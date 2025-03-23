<template>
  <div>
    <Template>
      <div>
        <DataTable :value="users" stripedRows>
          <Column field="name" header="Nome" />
          <Column field="status" header="Status">
            <template #body="slotProps">
              <ToggleSwitch
                v-model="slotProps.data.status"
                @change="updateStatus(slotProps.data)"
              />
            </template>
          </Column>
          <Column field="profile" header="Perfil" />
        </DataTable>
      </div>
    </Template>
  </div>
</template>

<script setup lang="js">
import Template from './Template.vue';
import UserService from "../services/UserService";
import { onMounted } from "vue";
import { ref } from "vue";

const users = ref([]);

const updateStatus = (user) => {
    UserService.updateUserStatus(user.id, user.status)
        .then(() => {
            console.log("Status atualizado com sucesso.");
        })
        .catch((error) => {
            console.error("Erro ao atualizar status:", error);
        });
};


onMounted (() => {
    UserService.getUsers().then(response => users.value = response.data)
})



</script>

<style scoped>
</style>