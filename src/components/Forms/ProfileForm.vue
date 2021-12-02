<template>
  <form class="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-white sm:p-6">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-first-name">
        First Name
      </label>
      <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-first-name" type="text" placeholder="Jane">
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-last-name">
        Last Name
      </label>
      <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-last-name" type="text" placeholder="Doe">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-password">
        Address
      </label>
      <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-password">
        Apartment,suite,etc
      </label>
      <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-password">
        City
      </label>
      <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text" placeholder="Albuquerque">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-city">
        Country/region
      </label>
      <select class="focus:ring-indigo-500 focus:border-indigo-500
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
      </select>
    </div>
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-state">
        Postal Code
      </label>
      <div class="relative">
              <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text" placeholder="1206">
      </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-city">
        Phone
      </label>
      <div class="relative">
              <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text">
      </div>
    </div>
    <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="grid-state">
        Business or personal website (optional)
      </label>
      <div class="relative">
              <input class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-2
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" id="grid-password" type="text">
      </div>
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="inline-flex items-center px-3">
        <input type="checkbox" class="form-checkbox"/>
        <span class="ml-2">This store is a registered business</span>
      </div>
  </div>

  <div class="w-full items-center flex justify-between">
      <router-link to="/" class="block text-sm font-medium text-gray-700 mb-2"><i class="fas fa-angle-left"></i> Back</router-link>
      <button
              class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Save
            </button>
  </div>
</form>
</template>

<script>
export default {

}
</script>

<style>

</style>