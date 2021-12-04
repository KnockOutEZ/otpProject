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
                    Coupon Amount
                  </label>
                  <div class="relative flex w-full flex-wrap items-stretch">
  <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-500 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
    <i class="fas fa-percent"></i>
  </span>
  <vee-field name="couponAmount" type="text" placeholder="50" class="pl-8 focus:ring-indigo-500 focus:border-indigo-500
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
      <ErrorMessage class="text-red-600 w-full  text-center" name="couponAmount"/>
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
  <vee-field name="couponExpiryDate" type="date" class="focus:ring-indigo-500 focus:border-indigo-500
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

                <div class="col-span-2">
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Products
                  </label>
                  <vee-field v-model="products" type="text" name="products">
                    <Multiselect
                  name="products"
                   mode="tags"
                  :closeOnSelect="false"
                  :searchable="true"
                  :createTag="false"
      v-model="value"
      :options="options"
    />
                  </vee-field>
      <ErrorMessage class="text-red-600 w-full  text-center" name="products"/>
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
            </div>
          </div>
        </div>
  </vee-form>
</template>

<script>
  import Multiselect from '@vueform/multiselect'

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
                    products:'required|numeric',
                    couponAmount:'required|numeric',
            },
                  value: null,
        options: [
          'Batman',
          'Robin',
          'Joker',
        ]
        }
    }
}
</script>

<style>

</style>