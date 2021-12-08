<template>

  <!-- <div v-if="products.length">
    <li v-for="(product, index) in products" :key="index">
    {{product}} + {{index}}
  </li>
  </div> -->
<div class="flex w-full justify-between">
    <div style="text-align: left" class="mb-2 mt-5">
    <label>SearchBy:</label><input class="ml-2 pl-5 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white border-purple-100 focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input" v-model="searchTerm" />
  </div>
  <router-link to="/addproduct" class="mt-auto text-indigo-400">
    Create <i class="fa fa-plus" aria-hidden="true"></i>
  </router-link>
</div>
  <table-lite
  style="overflow-x:auto !important"
  :do-search="true"
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :has-checkbox="true"
  ></table-lite>
</template>

<script>
import {  reactive, ref, computed  } from "vue";
import TableLite from 'vue3-table-lite'
import axios from "../store/axios";
export default {
  components: { TableLite },
  setup() {
      let products=[]
      let image=""
      let name=""
      let regularPrice=""
      let salesPrice=""
      let inventory=""
      let description=""


    axios.get(process.env.VUE_APP_API_URL + 'products',{withCredentials:true})
        .then((res) => {
          console.log(res.data.data)
          products = res.data.data

          let maxLength = res.data.data.length
          for (let i = 0; i < maxLength; i++) {
          // console.log(res.data.data[i])
          console.log(name)
          let daResponse = res.data.data[i]
          image = daResponse.image
          name = daResponse.name
          regularPrice = daResponse.regularPrice
          salesPrice = daResponse.salesPrice
          inventory = daResponse.inventory
          description = daResponse.description
          }
      }).catch((error) => {
        console.log(error)
})
  



    const searchTerm = ref("");
    // Fake data
    
    const data1 = reactive([]);

setTimeout(function(){
      let maxLength = products.length
      console.log(maxLength)
  for (let i = 0; i < maxLength; i++) {
      data1.push({
        id: i,
        name: products[i].name,
        inventory: products[i].inventory,
        description: products[i].description,
        regularPrice: products[i].regularPrice,
        salesPrice: products[i].salesPrice,
      });
    }
},3000);

    // Table config
    const table = reactive({
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Description",
          field: "description",
          width: "10%",
          sortable: true,
        },
        {
          label: "Inventory",
          field: "inventory",
          width: "15%",
          sortable: true,
        },
        {
          label: "regular Price",
          field: "regularPrice",
          width: "15%",
          sortable: true,
        },
        {
          label: "Sales Price",
          field: "salesPrice",
          width: "15%",
          sortable: true,
        },
      ],
      rows: computed(() => {
        return data1.filter(
          (x) =>
            x.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.inventory.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.regularPrice.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.salesPrice.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }),
            totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    return {
      searchTerm,
      table,
      products,
      image,
      name,
      regularPrice,
      salesPrice,
      inventory,
      description
    };
  },

};
</script>