<template>
  <div>
    <vee-form
      :validation-schema="editprofileschema"
      class="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-white sm:p-6"
    >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-first-name"
          >
            First Name
          </label>
          <vee-field
            v-model="firstName"
            name="firstName"
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
            id="grid-first-name"
            type="text"
            placeholder="Jane"
          />

          <ErrorMessage
            class="text-red-600 w-full text-center"
            name="firstName"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-last-name"
          >
            Last Name
          </label>
          <vee-field
            v-model="lastName"
            name="lastName"
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
            id="grid-last-name"
            type="text"
            placeholder="Doe"
          />
          <ErrorMessage
            class="text-red-600 w-full text-center"
            name="lastName"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            Email
          </label>
          <vee-field
            v-model="email"
            name="email"
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
            id="grid-password"
            type="text"
          />
          <ErrorMessage class="text-red-600 w-full text-center" name="email" />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            Store Name
          </label>
          <vee-field
            v-model="storeName"
            name="storeName"
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
            id="grid-password"
            type="text"
          />
          <ErrorMessage class="text-red-600 w-full text-center" name="storeName" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            Address
          </label>
          <vee-field
            v-model="address"
            name="address"
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
            id="grid-password"
            type="text"
          />
          <ErrorMessage
            class="text-red-600 w-full text-center"
            name="address"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            Apartment,suite,etc
          </label>
          <vee-field
            v-model="apartment"
            name="apartment"
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
            id="grid-password"
            type="text"
          />
          <ErrorMessage
            class="text-red-600 w-full text-center"
            name="apartment"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            City
          </label>
          <vee-field
            v-model="city"
            name="city"
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
            id="grid-password"
            type="text"
            placeholder="Albuquerque"
          />
          <ErrorMessage class="text-red-600 w-full text-center" name="city" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-city"
          >
            Country/region
          </label>
          <select
            id="country"
            class="
              focus:ring-indigo-500 focus:border-indigo-500
              text-black
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
            required
          >
            <option>Bangladesh</option>
            <option>No</option>
            <option>Maybe</option>
          </select>
        </div>
        <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-state"
          >
            Postal Code
          </label>
          <div class="relative">
            <vee-field
              v-model="postalCode"
              name="postalCode"
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
              id="grid-password"
              type="text"
              placeholder="1206"
            />
            <ErrorMessage
              class="text-red-600 w-full text-center"
              name="postalCode"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
        <!-- <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone
                  </label>
                  <div class="relative flex w-full flex-wrap items-stretch">
  <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-500 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
    <i class="fas fa-percent"></i>
  </span>
  <vee-field v-model="phone" name="phone" id="phone" type="text" class="pl-8 focus:ring-indigo-500 focus:border-indigo-500
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
</div></div> -->
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-city"
          >
            Phone
          </label>
          <div class="relative">
            <vee-field
              name="phone"
              id="phone"
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
              v-model="phone"
            />
            <ErrorMessage
              class="text-red-600 w-full text-center"
              name="phone"
            />

            <!-- <vue-tel-input id="phone" class="focus:ring-indigo-500 focus:border-indigo-500
                      px-3
                      py-1
                      mb-2
                      flex-1
                      block
                      w-full
                      sm:text-sm
                      border-2
                      rounded
                      border-gray-300" v-model="phone" mode="international"  required></vue-tel-input> -->
          </div>
        </div>
        <div class="w-full md:w-2/4 px-3 mb-6 md:mb-0">
          <label
            class="block text-sm font-medium text-gray-700 mb-2"
            for="grid-state"
          >
            Business or personal website (optional)
          </label>
          <div class="relative">
            <vee-field
              v-model="website"
              name="website"
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
              id="grid-password"
              type="text"
            />
            <ErrorMessage
              class="text-red-600 w-full text-center"
              name="website"
            />
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
        <router-link to="/" class="block text-sm font-medium text-gray-700 mb-2"
          ><i class="fas fa-angle-left"></i> Back</router-link
        >
        <button
          type="button"
          @click="daSubmit()"
          class="
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
          "
        >
          Save
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import axios from "../../store/axios";

export default {
  data() {
    return {
      editprofileschema: {
        firstName: "required|alpha_spaces",
        lastName: "required|alpha_spaces",
        address: "required",
        email: "required",
        apartment: "required",
        city: "required|alpha_spaces",
        postalCode: "required|numeric",
        website: "",
        phone: "required|numeric",
        storeName:"required"
      },
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      website: "",
      phone: "",
    };
  },
  methods: {
    daSubmit() {
      let country = document.getElementById("country").value
      axios
        .patch(
          process.env.VUE_APP_API_URL + "auth/profile-update",
          {
            email: this.email,
            number: this.phone,
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            apartment: this.apartment,
            city: this.city,
            country: country,
            postalCode: this.postalCode,
            website: this.website,
          },
          { withCredentials: true }
        )
        .then((res) => {
          //Perform Success Action
          console.log(res);
          this.$router.push("/")
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error);
          console.log(country);
        })
        .finally(() => {
          //Perform action in always
          console.log("finally");
        });
    },
  },

  mounted(){
axios.get(process.env.VUE_APP_API_URL + 'auth/get-me',{withCredentials:true})
        .then((res) => {
          let daResponse = res.data.data
if (daResponse.email) this.email = daResponse.email;
if (daResponse.number) this.phone = daResponse.number;
if (daResponse.firstName) this.firstName = daResponse.firstName;
if (daResponse.lastName) this.lastName = daResponse.lastName;
if (daResponse.address) this.address = daResponse.address;
if (daResponse.apartment) this.apartment = daResponse.apartment;
if (daResponse.city) this.city = daResponse.city;
if (daResponse.country) document.getElementById('country').value = daResponse.country;
if (daResponse.postalCode) this.postalCode = daResponse.postalCode;
if (daResponse.website) this.website = daResponse.website;
      }).catch((error) => {
        console.log(error)

})
  }
};
</script>



<style>
</style>