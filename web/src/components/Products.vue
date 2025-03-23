<template>
    <div>
      <Template>
        <div>
          <DataTable
            :expandedRows="expandedRows"
            :value="groupedProducts"
            dataKey="id"
            @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse"
            tableStyle="min-width: 60rem"
          >
            <Column expander style="width: 5rem" />
            <Column field="name" header="Nome"></Column>
            <Column field="url_cover" header="Imagem">
              <template #body="slotProps">
                <img
                  :src="slotProps.data.url_cover"
                  class="shadow-lg"
                  width="100"
                />
              </template>
            </Column>
            <Column field="totalAmount" header="Quantidade">
              <template #body="slotProps">
                {{ slotProps.data.totalAmount }}
              </template>
            </Column>
            <Column field="description" header="Descrição"></Column>
  
            <template #expansion="slotProps">
              <div class="p-4">
                <h5>Detalhes dos Produtos:</h5>
                <DataTable :value="slotProps.data.products">
                  <Column field="name" header="Nome"></Column>
                  <Column field="amount" header="Quantidade"></Column>
                  <Column field="branch.id" header="Filial"></Column>
                </DataTable>
              </div>
            </template>
          </DataTable>
          <Toast />
        </div>
      </Template>
    </div>
  </template>
  
  <script setup lang="js">
  import Template from './Template.vue';
  import ProductService from "../services/ProductService";
  import { onMounted, ref } from "vue";
  
  const products = ref([]);
  const expandedRows = ref([]);
  const groupedProducts = ref([]);
  
  // Função para agrupar produtos
  const groupProducts = (productsList) => {
    const grouped = {};
  
    productsList.forEach(product => {
      if (!grouped[product.name]) {
        grouped[product.name] = {
          id: product.id, // Pode ser o ID do produto principal ou um valor fixo
          name: product.name,
          totalAmount: product.amount, // Inicializa com a quantidade do produto
          description: product.description,
          url_cover: product.url_cover,
          products: [product] // Armazena os produtos individuais
        };
      } else {
        grouped[product.name].totalAmount += product.amount; // Soma a quantidade
        grouped[product.name].products.push(product); // Adiciona o produto individual
      }
    });
  
    return Object.values(grouped); // Retorna um array com os produtos agrupados
  };
  
  const getProducts = async () => {
    try {
      const response = await ProductService.getProducts();
      products.value = response; 
      console.log("Produtos carregados com sucesso.");
  
      // Agrupar produtos após o carregamento
      groupedProducts.value = groupProducts(products.value);
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    }
  };
  
  onMounted(() => {
    getProducts();
  });
  
  </script>
  
  <style scoped>
  </style>
  