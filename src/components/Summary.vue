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
      {{ data.value.inventory }}
    </template>

    <template v-slot:regularPrice="data">
      {{ data.value.regularPrice }}
    </template>

    <template v-slot:salesPrice="data">
      {{ data.value.salesPrice }}
    </template>

    <template v-slot:description="data">
      <span v-html="data.value.description"></span>
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
    <template v-slot:stock="data">
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
          bg-indigo-600
          border border-transparent
          rounded-lg
          active:bg-indigo-600
          hover:bg-indigo-700
          focus:outline-none focus:shadow-outline-indigo
          w-min
        "
        @click="requestProduct(data.value.editUrl)"
        ><nobr>Request</nobr></button>
    </template>
    <template v-slot:status="data">
     <div
                  class="
                    relative
                    inline-block
                    w-10
                    mr-2
                    align-middle
                    select-none
                    transition
                    duration-200
                    ease-in
                  "
                >
                  <input
                  v-model="data.value.status"
                    type="checkbox"
                    name="toggle"
                    @change="statusChange(data.value.editUrl,data.value.id,data.value.status)"
                    v-bind:id="data.value.editUrl"
                    class="
                      toggle-checkbox
                      absolute
                      block
                      w-6
                      h-6
                      rounded-full
                      bg-white
                      border-4
                      appearance-none
                      cursor-pointer
                    "
                  />
                  <label
                    :for="data.value.editUrl"
                    class="
                      toggle-label
                      block
                      overflow-hidden
                      h-6
                      rounded-full
                      bg-gray-300
                      cursor-pointer
                    "
                  ></label>
                </div>
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
  data(){
    return{
      componentKey: 0,
    }
  },
  methods: {
    formOpen() {
      this.$router.push("/editproduct");
    },
    statusChange(productId,index,status){
      console.log(productId,index,status)
     this.$store.state.loader = true

      axios
      .patch(process.env.VUE_APP_API_URL + "products/" + productId,{status:status},{ withCredentials: true })
      .then((res) => {
        console.log(res);
     this.$store.state.loader = false

      })
      .catch((error) => {
        console.log(error);
     this.$store.state.loader = false

      });
    },
    requestProduct(productId){
      console.log(productId)
    },
    deleteProduct(data){
     this.$store.state.loader = true

      console.log(data)
      axios
      .delete(process.env.VUE_APP_API_URL + "products/" + data, { withCredentials: true })
      .then((res) => {
     this.$store.state.loader = false

        console.log(res)
     this.$store.state.loader = false

      this.$router.go(0)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
   beforeRouteEnter(to, from, next) {
           axios.get(process.env.VUE_APP_API_URL + 'vendor/get-me',{withCredentials:true})
        .then((res) => {
          let daResponse = res.data.data
          // daResponse.email == undefined || daResponse.number ==undefined ||  daResponse.firstName ==undefined ||  daResponse.lastName==undefined ||  daResponse.address==undefined ||  daResponse.apartment==undefined ||  daResponse.city==undefined ||  daResponse.country==undefined ||  daResponse.postalCode==undefined || daResponse.website==undefined
          if(daResponse.isVerified == true){
            next()
          }else{
            next({ path: '/loginplease' });
            alert("complete profile please")
          }
          
      }).catch((error) => {
        console.log(error)

})
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
            status:products[i].status
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
          width: "2%",
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
          label: "Price",
          field: "regularPrice",
          width: "10%",
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
          label: "Status",
          field: "status",
          width: "5%",
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
        {
          label: "Stock Request",
          field: "stock",
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


<style scoped>
.card ::v-deep(.table .thead-dark th) {
  color: #fff;
  background-color: #7C3AED;
  border-color: #7C3AED;
}
.card ::v-deep(.table td), .card ::v-deep(.table tr) {
  border-left: none;
  border-right: none;
  border-bottom: 1px solid rgb(228, 227, 227);
}

.card ::v-deep(.table tr:hover){
  background-color: rgb(238, 237, 237);
}

.card ::v-deep(.table tr td){
  width: 100px;
  white-space: normal;
  vertical-align:middle
}
</style>