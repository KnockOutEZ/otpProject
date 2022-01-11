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
    <template v-slot:amount="data">
      {{ data.value.amount }}
    </template>

    <template v-slot:expiryDate="data">
      {{ data.value.expiryDate }}
    </template>

    <template v-slot:limitPerCoupon="data">
      {{ data.value.limitPerCoupon }}
    </template>

    <template v-slot:createdAt="data">
      <span v-html="data.value.createdAt"></span>
    </template>

    <template v-slot:limitPerUser="data">
      <span v-html="data.value.limitPerUser"></span>
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
        :to="{ path: '/editcoupon/' + data.value.editUrl,params: { id: data.value.editUrl }}"
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
    <template v-slot:productIds="data">
      {{ data.value.productIds }}
    </template>
  </table-lite>
</template>

<script>
import { reactive, computed } from "vue";
import TableLite from "vue3-table-lite";
import axios from "../../store/axios";
// import routerLink from "../router/index"
export default {
  name: "App",
  components: { TableLite },
  data(){
    return{
      componentKey: 0,
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
  methods: {
    formOpen() {
      this.$router.push("/editproduct");
    },
    statusChange(productId,index,status){
     this.$store.state.loader = true

      console.log(productId,index,status)
      axios
      .patch(process.env.VUE_APP_API_URL + "collections/" + productId,{status:status},{ withCredentials: true })
      .then((res) => {
     this.$store.state.loader = false

        console.log(res);
      })
      .catch((error) => {
     this.$store.state.loader = false

        console.log(error);
      });
    },
    requestProduct(productId){
      console.log(productId)
    },
    deleteProduct(data){
     this.$store.state.loader = true

      console.log(data)
      axios
      .delete(process.env.VUE_APP_API_URL + "collections/" + data, { withCredentials: true })
      .then((res) => {
     this.$store.state.loader = false

        console.log(res)
      this.$router.go(0)
      })
      .catch((error) => {
     this.$store.state.loader = false

        console.log(error);
      });
    }
  },
  setup() {
    const data1 = reactive([]);
    let coupon = [];
    // let image=""
    // let ProductId=""
    // let name=""
    // let expiryDate=""
    // let limitPerCoupon=""
    // let amount=""
    // let createdAt=""

    axios
      .get(process.env.VUE_APP_API_URL + "collections", { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        coupon = res.data.data;
        let maxLength = coupon.length;
        console.log(maxLength);
        for (let i = 0; i < maxLength; i++) {
          data1.push({
            id: i,
            name: coupon[i].name,
            // amount: coupon[i].amount,
            // createdAt: coupon[i].createdAt,
            // expiryDate: coupon[i].expiryDate,
            // limitPerCoupon: coupon[i].limitPerCoupon,
            // limitPerUser: coupon[i].limitPerUser,
            editUrl:coupon[i]._id,
            productIds:coupon[i].productIds
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
        // expiryDate = daResponse.expiryDate
        // limitPerCoupon = daResponse.limitPerCoupon
        // amount = daResponse.amount
        // createdAt = daResponse.createdAt
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
          label: "productIds",
          field: "productIds",
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
      coupon,
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
  vertical-align:middle;
  
}
</style>