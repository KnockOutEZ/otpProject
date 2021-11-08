<template>
  <div class="parent">
    <div class="flex flex-col justify-center items-center h-screen bg-gray-100 ">
      <vee-form :validation-schema="loginschema" class="md:w-4/12 sm:w-screen bg-gray-50 p-10 rounded-lg">
      <h1 class="font-bold text-xl mb-2">Please enter your number:</h1>
     <vee-field placeholder="01XXXXXXXXX" name="number" type="text"  id="mainInput"  @submit="login"
        class="border-2 transition duration-500 placeholder-indigo-400 focus:placeholder-transparent border-indigo-400 mb-1 w-full p-2 text-left text-indigo-400 bg-transparent rounded-md focus:outline-none "/><br/>
      <ErrorMessage class="text-red-600 w-full  text-center" name="number"/>
      <div class="w-full grid grid-cols-4 gap-4 mt-2" v-if="input == true" id="otp">
        <input class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="ist" maxlength="1" v-on:keyup="clickevent(this,'sec')">
        <input class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="sec" maxlength="1" v-on:keyup="clickevent(this,'third')">
        <input class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="third" maxlength="1" v-on:keyup="clickevent(this,'fourth')">
        <input class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="fourth" maxlength="1">
      </div>
      <button type="button" @click="handleInput()"
              class="block w-full  text-white py-1.5 px-3 rounded transition mt-2
               " :class="btncolor">
              Submit
            </button>
      </vee-form>

      
</div>
  </div>
</template>

<script>
// import axios from 'axios'


export default {
  name: 'HelloWorld',
    components: {
  },
  data(){
    return{
            loginschema: {
        number: 'required|numeric|min:11|max:11',
      },
      input:false,
      btncolor: 'bg-purple-600 hover:bg-purple-700',
    }
  },

methods:{
  login(){
    console.log('qweqwe')
  },

  // testMethod () {
  //     axios.post('/randomEndpoint', {
  //   params: {
  //     ID: 12345
  //   }
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });  
  //   },


handleInput() {
  var doc = document.getElementById('mainInput')
      const value = doc.value;
      if (value && value.length == 11) {
        
  this.input = true;
  this.btncolor = 'bg-green-600 hover:bg-green-700'

      }else{
  this.btncolor = 'bg-red-600 hover:bg-red-700'
      }

      return 
    },


  clickevent(){
    const inputs = document.querySelectorAll('#otp > *[id]');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', function(event) {
      if (event.key === "Backspace") {
        inputs[i].value = '';
        if (i !== 0)
          inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== '') {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 64 && event.keyCode < 91) {
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
  },


}
}
</script>

<style scoped>

</style>
