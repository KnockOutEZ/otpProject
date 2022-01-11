<template>
  <vee-form :validation-schema="couponFormSchema" @submit="couponForm">
      <div class="px-4 sm:px-0 mt-5">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="md:grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Coupon Name
                  </label>
                  <div class="relative flex w-full flex-wrap items-stretch">
  <vee-field v-model="couponName" name="couponName" type="text" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300"/>
</div>
      <ErrorMessage class="text-red-600 w-full  text-center" name="couponName"/>
                </div>

                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Coupon Expiry Date
                  </label>
                  <div class="relative">
  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
  </div>
  <vee-field v-model="couponExpiryDate" name="couponExpiryDate" type="date" class="focus:ring-indigo-500 focus:border-indigo-500
                      pl-9
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" placeholder="Select date"/>
</div>
      <ErrorMessage class="text-red-600 w-full  text-center" name="couponExpiryDate"/>
                </div>
                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Coupon Amount
                  </label>
                  <div class="relative flex w-full flex-wrap items-stretch">
  <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-500 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
    <i class="fas fa-percent"></i>
  </span>
  <vee-field v-model="couponAmount" name="couponAmount" type="text" placeholder="50" class="pl-8 focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300"/>
</div></div>

                <div class="">
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Products
                  </label>
                    <Multiselect
                   mode="tags"
                  :closeOnSelect="false"
                  :searchable="true"
                  :createTag="false"
      v-model="value"
      :options="options.name"
    />
                </div>

                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Usage Limit Per Coupon
                  </label>
<vee-field
                  name="usagelimitpercoupon"
                  v-model="usagelimitpercoupon"
                    type="number"
                    class="
                      focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300
                    "
                  />
      <ErrorMessage class="text-red-600 w-full  text-center" name="usagelimitpercoupon"/>
                </div>

                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Usage Limit Per User
                  </label>
<vee-field
                  name="usagelimitperuser"
                  v-model="usagelimitperuser"
                    type="number"
                    class="
                      focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300
                    "
                  />
      <ErrorMessage class="text-red-600 w-full  text-center" name="usagelimitperuser"/>
                </div>
              </div>
        <button class="md:float-right md:w-auto w-full mb-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Add Coupon</button>
            </div>
          </div>
        </div>
  </vee-form>
</template>

<script>
  import Multiselect from '@vueform/multiselect'
  import axios from "../../store/axios";

export default {
  components: {
      Multiselect,
    },
    data(){
        return{
            couponFormSchema:{
                    usagelimitpercoupon:'required|numeric',
                    usagelimitperuser:'required|numeric',
                    couponExpiryDate:'required',
                    couponAmount:'required|numeric',
                    couponName:'required'
            },
                  value: null,
        options: {
          name:[],id:[]
        }
        }
    },
    mounted(){
      axios
      .get(process.env.VUE_APP_API_URL + "products", { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        let products = res.data.data;
        let maxLength = products.length;
        for (let i = 0; i < maxLength; i++) {
          console.log(products[i].name)
          this.options.name.push(products[i].name)
          this.options.id.push(products[i]._id)
        }
      }).catch((error) => {
        console.log(error)
});

 axios
      .get(process.env.VUE_APP_API_URL + "coupon", { withCredentials: true })
      .then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error)
})
    },
    methods:{
      couponForm(values){
        console.log(values)
         axios
      .post(process.env.VUE_APP_API_URL + "coupon",{productIds:this.value,name:values.couponName,amount:values.couponAmount,limitPerUser:values.usagelimitperuser,limitPerCoupon:values.usagelimitpercoupon,expiryDate:values.couponExpiryDate}, { withCredentials: true })
      .then((res) => {
        console.log(this.options.id)
        this.$router.push("/allcoupons")
        console.log(res);
      }).catch((error) => {
        console.log(error)
})
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
}
</script>

<style>

</style>