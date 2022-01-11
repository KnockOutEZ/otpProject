<template>
  <vee-form :validation-schema="categoryFormSchema" @submit="category">
      <div class="px-4 sm:px-0 mt-5 w-full h-full md:w-2/4 mx-auto">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="">
                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category Name
                  </label>
                  <div class="relative flex w-full flex-wrap items-stretch">
  <vee-field v-model="categoryName" name="categoryName" type="text" class="focus:ring-indigo-500 focus:border-indigo-500
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
      <ErrorMessage class="text-red-600 w-full  text-center" name="categoryName"/>
                </div>

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
      :options="options"
    />
                </div>

                
        <button class="w-full mt-3 mb-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Add Category</button>
            </div>
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
          profileComplete:false,
            categoryFormSchema:{
                    categoryName:'required'
            },
                  value: null,
                  categoryName:"",
        options: [
        ]
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
          this.options.push(products[i].name)
        }
      }).catch((error) => {
        console.log(error)
});
    },
    methods:{
      category(values){
        console.log(values)
         axios
      .post(process.env.VUE_APP_API_URL + "collections",{name:this.categoryName,productIds:this.value}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.$router.push("/allcategories")
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
          }
          
      }).catch((error) => {
        console.log(error)

})
},
         
}
</script>

<style>

</style>