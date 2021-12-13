<template>
  <router-link to="/addproduct" class="mt-auto text-indigo-400 ml-auto">
    Create <i class="fa fa-plus" aria-hidden="true"></i>
  </router-link>
  <table-lite
    style="overflow-x: auto !important"
    :is-slot-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
  >
    <template v-slot:name="data">
      {{ data.value.name }}
    </template>
    <template v-slot:inventory="data">
      {{ data.value.name }}
    </template>

    <template v-slot:regularPrice="data">
      {{ data.value.regularPrice }}
    </template>

    <template v-slot:salesPrice="data">
      {{ data.value.salesPrice }}
    </template>

    <template v-slot:description="data">
      {{ data.value.description }}
    </template>

    <template v-slot:id="data">
      {{ data.value.id }}
    </template>

    <template v-slot:quick="data">
      <router-link
        class="
          formOpen
          mx-auto
          is-rows-el
          quick-btn
          flex
          items-center
          justify-between
          px-4
          py-2
          text-sm
          font-medium
          leading-5
          text-white
          transition-colors
          duration-150
          bg-purple-600
          border border-transparent
          rounded-lg
          active:bg-purple-600
          hover:bg-purple-700
          focus:outline-none focus:shadow-outline-purple
          w-min
        "
        :to="{ path: '/editproduct/' + data.value.editUrl,params: { id: data.value.editUrl }}"
        >Edit</router-link>
    </template>

    <template v-slot:delete="data">
      <button
        class="
          formOpen
          mx-auto
          is-rows-el
          quick-btn
          flex
          items-center
          justify-between
          px-4
          py-2
          text-sm
          font-medium
          leading-5
          text-white
          transition-colors
          duration-150
          bg-red-600
          border border-transparent
          rounded-lg
          active:bg-red-600
          hover:bg-red-700
          focus:outline-none focus:shadow-outline-red
          w-min
        "
        @click="deleteProduct(data.value.editUrl)"
        >Delete</button>
    </template>
  </table-lite>
</template>

<script>
import { reactive, computed } from "vue";
import TableLite from "vue3-table-lite";
import axios from "../store/axios";
// import routerLink from "../router/index"
export default {
  name: "App",
  components: { TableLite },
  methods: {
    formOpen() {
      this.$router.push("/editproduct");
    },
    deleteProduct(data){
      console.log(data)
      axios
      .delete(process.env.VUE_APP_API_URL + "products/" + data, { withCredentials: true })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  setup() {
    const data1 = reactive([]);
    let products = [];
    // let image=""
    // let ProductId=""
    // let name=""
    // let regularPrice=""
    // let salesPrice=""
    // let inventory=""
    // let description=""

    axios
      .get(process.env.VUE_APP_API_URL + "products", { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        products = res.data.data;
        let maxLength = products.length;
        console.log(maxLength);
        for (let i = 0; i < maxLength; i++) {
          data1.push({
            id: i,
            name: products[i].name,
            inventory: products[i].inventory,
            description: products[i].description,
            regularPrice: products[i].regularPrice,
            salesPrice: products[i].salesPrice,
            image: products[i].image,
            editUrl:products[i]._id,
          });
        }
        // let maxLength = res.data.data.length
        // for (let i = 0; i < maxLength; i++) {
        // // console.log(res.data.data[i])
        // console.log(name)
        // let daResponse = res.data.data[i]
        // image = daResponse.image
        // ProductId = daResponse._id
        // console.log(ProductId)
        // name = daResponse.name
        // regularPrice = daResponse.regularPrice
        // salesPrice = daResponse.salesPrice
        // inventory = daResponse.inventory
        // description = daResponse.description
        // }
      })
      .catch((error) => {
        console.log(error);
      });
    // Fake data

    // setTimeout(function(){

    // },3000);
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
        {
          label: "Images",
          field: "images",
          width: "5%",
          sortable: true,

          //     display: function (row) {
          //   return (
          //     '<button type="button" data-id="' + row.user_id + '" class="quick-btn">Button</button>'
          //   );
          // },

          display: function (rows) {
            return (
              "<img style='width:100px' class='mx-auto' src=" +
              rows.image +
              "></img>"
            );
          },
        },
        {
          label: "Edit",
          field: "quick",
          width: "5%",
        },
        {
          label: "Delete",
          field: "delete",
          width: "5%",
        },
      ],
      rows: data1,
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
    return {
      table,
      products,
    };
  },
};
</script>