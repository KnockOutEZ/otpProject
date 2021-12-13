<template>
  <div>
    <vee-form :validation-schema="editproductschema" class=" md:grid md:grid-cols-3 md:gap-6" @submit="test1">
      <div class="md:col-span-2">
        <div class="px-4 sm:px-0">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <label
                for="company_website"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <vee-field
              v-model="title"
              name="title"
                type="text"
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
      <ErrorMessage class="text-red-600 w-full  text-center" name="title"/>


              <label
                for="company_website"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              
              <div id="theCK" class=" md:w-full w-11/12 flex-1">
                <ckeditor
                :editor="editor"
                v-model="editorData"
                :config="editorConfig"
              ></ckeditor>
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 sm:px-0 mt-5">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <label
                for="company_website"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Media
              </label>
              
              <div v-if="image == ''">
                 <UploadImages
                 v-model="image"
                  class="uploadimg"
                  @changed="handleImages"
                  :max="1"
                  maxError="Maximum 1 images are allowed"
                  ref="files"
                  uploadMsg="upload product images"
                  required
                />
              </div>
              <div v-else class="w-64 h-64 mx-auto relative" >
                <span  @click="image = ''" class="absolute top-0 right-2 px-2 py-1 cursor-pointer text-white rounded-full bg-red-700"><i class="fas fa-trash"></i></span>
               <a :href="image" target="_blank"> <img  class="max-w-64 max-h-64 mx-auto" :src="image" alt=""></a>
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 sm:px-0 mt-5">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="md:grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price
                  </label>
                  <vee-field
                  v-model="price"
                  name="price"
                    type="text"
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
      <ErrorMessage class="text-red-600 w-full  text-center" name="price"/>
                </div>

                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Sale Price
                  </label>
                  <vee-field
                  v-model="salePrice"
                  name="salePrice"
                    type="text"
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
      <ErrorMessage class="text-red-600 w-full  text-center" name="salePrice"/>
                </div>


                <div>
                  <label
                    for="company_website"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Quantity
                  </label>
                  <vee-field
                  v-model="quantity"
                  name="quantity"
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
      <ErrorMessage class="text-red-600 w-full  text-center" name="quantity"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-1">
          <div class="px-4 sm:px-0 mt-5">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="flex justify-between">
                <label
                  for="company_website"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Status
                </label>
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
                  <vee-field
                    type="checkbox"
                    name="toggle"
                    id="toggle"
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
                    for="toggle"
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
              </div>

              <label
                for="company_website"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Collections
              </label>
              <div class="">
                <div class="">
                  <div class="relative">
                    <div class="absolute top-2 left-2">
                      <i
                        class="
                          fa fa-search
                          text-gray-400
                          z-20
                          hover:text-gray-500
                        "
                      ></i>
                    </div>
                    <vee-field
                  v-model="collections"
                    name="collections"
                      type="text"
                      class="
                        focus:ring-indigo-500 focus:border-indigo-500
                        px-3
                        pl-6
                        py-2
                        flex-1
                        block
                        w-full
                        sm:text-sm
                        border-2
                        rounded
                        border-gray-300
                      "
                    />
      <ErrorMessage class="text-red-600 w-full  text-center" name="collections"/>

                  </div>
                </div>
              </div>
            </div>
            <div class="w-full pb-3 bg-gray-50 text-right sm:px-6 px-6">
              <button
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  w-full
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                Update
              </button>
            </div>
          </div>
          </div>
      </div>
    </vee-form>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from '../../store/axios'

export default {
  data() {
    return {
      imageName:"",
                  editproductschema: {
        title: 'required|alpha_spaces',
        // fileUpload:'required',
        price:'required|numeric',
        salePrice:'required|numeric',
        quantity:'required|numeric',
        collections:'required',
      },
      editor: ClassicEditor,
      editorData: "",
      title:"",
      image:"",
      price:"",
      salePrice:"",
      quantity:"",
      collections:"",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  methods:{
    test1(values){
      const formData = new FormData();
formData.append('name', values.title);
formData.append('regularPrice', values.price);
formData.append('salesPrice', values.salePrice);
formData.append('inventory', values.quantity);
formData.append('image', this.imageName );
formData.append('description', this.editorData);

let routerId = this.$route.params.id
      axios.patch(process.env.VUE_APP_API_URL + 'products/'+ routerId,formData,{withCredentials:true})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res)
                     console.log(this.editorData)
                     this.$router.push("/")

                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log(this.imageName)
                     console.log(error)

                 }).finally(() => {
                     //Perform action in always
                     console.log('finally')

                 });
    },

handleImages(files){
                  if(files != null){
this.imageName = files[0]
                    console.log(files)
                  }else{
                    files= this.image
                  }
                  console.log(files)
}
  },

  mounted(){
    
    let routerId = this.$route.params.id
      axios.get(process.env.VUE_APP_API_URL + 'products/'+ routerId,{withCredentials:true})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res)
                     const response= res.data.data
                     this.editorData = response.description
                     this.title = response.name
                     this.price = response.regularPrice
                     this.salePrice = response.salesPrice
                     this.quantity = response.inventory
                     this.collections = response.name
                     this.image = response.image
                     this.handleImages()
      //                fetch(this.image)
      // .then((e) => {
      //   return e.blob()
      // })
      // .then((blob) => {
      //   let b = blob
      //   b.lastModifiedDate = new Date()
      //   b.name = ''
      //   console.log(b)
      //   return b
      // })
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log(error)

                 }).finally(() => {
                     //Perform action in always
                     console.log('finally')

                 });
  }
};
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68d391;
}
</style>