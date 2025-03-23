<template>
  <div>
    <Template>
      <div class="w-12 flex justify-content-center">
        <form @submit.prevent="onFormSubmit" class="w-6 flex-column gap-3 flex">
          <div class="w-12">
            <IftaLabel>
              <InputText class="w-12" v-model="user.name" type="text" />
              <label>Nome</label>
            </IftaLabel>
          </div>
          <div class="w-12">
            <IftaLabel>
              <InputText class="w-12" v-model="user.email" type="text" />
              <label>Email</label>
            </IftaLabel>
          </div>
          <div class="w-12">
            <IftaLabel>
              <Password
                class="w-12"
                v-model="user.password"
                :feedback="false"
                toggleMask
              />
              <label for="password">Password</label>
            </IftaLabel>
          </div>
          <div class="w-12">
            <Select
              :options="profiles"
              optionLabel="name"
              optionValue="code"
              v-model="user.profile"
              placeholder="Perfil"
              class="w-12"
            />
          </div>
          <div v-if="profiles[2].code === user.profile" class="w-12">
            <IftaLabel>
              <InputText class="w-12" v-model="user.document" type="text" />
              <label>CNPJ</label>
            </IftaLabel>
          </div>
          <div v-else class="w-12">
            <IftaLabel>
              <InputText class="w-12" v-model="user.document" type="text" />
              <label>CPF</label>
            </IftaLabel>
          </div>
          <div class="w-12">
            <IftaLabel>
              <InputText class="w-12" v-model="user.fullAdress" type="text" />
              <label>Endereço</label>
            </IftaLabel>
          </div>
          <span class="w-12 text-green-500" v-if="successMessage">{{ successMessage }}</span>
          <span class="w-12 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
          <Button type="submit" severity="secondary" label="Cadastrar" />
        </form>
      </div>
    </Template>
  </div>
</template>
  
  <script setup lang="js">
  import Template from './Template.vue';
  import UserService from "../services/UserService";
  import StringUtils from '@/utils/StringUtils';
  import { ref } from "vue";
  
  const user = ref({});

  const successMessage = ref('');

  const errorMessage = ref('');

  const profiles = ref([
    { name: 'Administrador', code: 'ADMIN' },
    { name: 'Motorista', code: 'DRIVER' },
    { name: 'Filial', code: 'BRANCH' }
]);

const onFormSubmit = () => {
  const erros = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.value.email || !emailRegex.test(user.value.email)) {
    erros.push("Email inválido.");
  }
  if (!user.value.password || user.value.password.length < 6 || user.value.password.length > 20) {
    erros.push(
      "A senha não pode estar vazia e deve conter entre 6 e 20 caracteres."
    );
  }
  if (!user.value.name || user.value.name.length < 3 || user.value.name.length > 20 ){
    erros.push("Campo nome não pode estar vazio e deve conter mais de 3 caracteres.")
  };
  if (!user.value.profile){
    erros.push("Selecione um perfil.")
  };
  if (!user.value.document) {
        erros.push("Documento inválido.")
      } else if (user.value.profile === "BRANCH") {
        if (!StringUtils.isValidCnpj(user.value.document)) {
          erros.push("O documento deve ser um CNPJ válido.")
        }
      } else {
        if (!StringUtils.isValidCpf(user.value.document)) {
          erros.push("O documento deve ser um CPF válido.")
        }
      }
  if (erros.length > 0) {
    errorMessage.value = erros.join(" ");
    successMessage.value = "";
    return;
  }

  UserService.createUser(user.value)
  .then(() => {
    user.value = {
      name: '',
      email: '',
      password: '',
      profile: '',
      document: '',
      fullAdress: ''
    };
    successMessage.value = "Usuário cadastrado com sucesso!";
    errorMessage.value = '';
  })
  .catch(e => {
    errorMessage.value = e.detail;
    successMessage.value = '';
  });
  

}
</script>
  
<style scoped>
:deep(.p-password) {
  width: 100%;
}

:deep(.p-password input) {
  width: 100%;
}
</style>