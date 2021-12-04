<template>
  <vee-form :validation-schema="editprofileschema" @submit="submitProfileForm" class="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-white sm:p-6">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-first-name">
        First Name
      </label>
      <vee-field name="firstName" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-first-name" type="text" placeholder="Jane"/>

                      <ErrorMessage class="text-red-600 w-full  text-center" name="firstName"/>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-last-name">
        Last Name
      </label>
      <vee-field name="lastName" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-last-name" type="text" placeholder="Doe"/>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="lastName"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-password">
        Address
      </label>
      <vee-field name="address" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text"/>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="address"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-password">
        Apartment,suite,etc
      </label>
      <vee-field name="apartment" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text"/>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="apartment"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-password">
        City
      </label>
      <vee-field name="city" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text" placeholder="Albuquerque"/>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="city"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-city">
        Country/region
      </label>
      <vee-field as="select" name="country" class="focus:ring-indigo-500 focus:border-indigo-500 text-black
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-city" type="text" >
                      <option>Bangladesh</option>
  <option>No</option>
  <option>Maybe</option>
      </vee-field>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="country"/>
    </div>
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-state">
        Postal Code
      </label>
      <div class="relative">
              <vee-field name="postalCode" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text" placeholder="1206"/>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="postalCode"/>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-city">
        Phone
      </label>
      <div class="relative">
               <vue-tel-input name="phone" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-1
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" mode="international" v-model="phone" required></vue-tel-input>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="phone"/>
      </div>
    </div>
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-state">
        Business or personal website (optional)
      </label>
      <div class="relative">
              <vee-field name="website" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text"/>
                      <ErrorMessage class="text-red-600 w-full  text-center" name="website"/>
      </div>
    </div>
  </div>

  <!-- <div class="flex flex-wrap -mx-3 mb-2">
    <div class="inline-flex items-center px-3">
        <input type="checkbox" class="form-checkbox"/>
        <span class="ml-2">This store is a registered business</span>
      </div>
  </div> -->

  <div class="w-full items-center flex justify-between">
      <router-link to="/" class="block text-sm font-medium text-gray-700 mb-2"><i class="fas fa-angle-left"></i> Back</router-link>
      <button
              class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Save
            </button>
  </div>
</vee-form>
</template>

<script>
export default {
data(){
  return{
     editprofileschema: {
        firstName: 'required|alpha_spaces',
        lastName: 'required|alpha_spaces',
        address: 'required',
        apartment: 'required',
        city: 'required|alpha_spaces',
        country: '',
        postalCode:'required|numeric',
        phone:'required|numeric',
        website:'required'
      },
  }
},

methods:{
  submitProfileForm(){
    console.log(123)
  }
}
}
</script>

<style>

</style>