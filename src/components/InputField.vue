<template>
  <div class="parent">
    <div class="flex flex-col justify-center items-center h-screen bg-gray-100 ">
      <vee-form :validation-schema="loginschema" class="md:w-4/12 sm:w-screen bg-gray-50 p-10 rounded-lg">
      <h1 class="font-bold text-xl mb-2">Please enter your number:</h1>
     <vee-field placeholder="01XXXXXXXXX" name="number" type="text"  id="mainInput"  @submit="login" @input="lengthHandler()"
        class="border-2 transition duration-500 placeholder-indigo-400 focus:placeholder-transparent border-indigo-400 mb-1 w-full p-2 text-left text-indigo-400 bg-transparent rounded-md focus:outline-none "/><br/>
      <ErrorMessage class="text-red-600 w-full  text-center" name="number"/>
      <div class="w-full grid grid-cols-4 gap-4 mt-2" v-if="input == true" id="otp">
        <vee-field name="ist" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="ist" maxlength="1" v-on:keyup="clickevent(this,'sec')" />
        <vee-field name="snd" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="sec" maxlength="1" v-on:keyup="clickevent(this,'third')" />
        <vee-field name="trd" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="third" maxlength="1" v-on:keyup="clickevent(this,'fourth')" />
        <vee-field name="fth" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="fourth" maxlength="1" v-on:keyup="test()"/>
      </div>

      <button v-if="resend" @click="resend1()" class="text-green-400 text-right w-full">Resend code?</button>
      
      <vue-countdown v-if="timer"  :time=" 60 * 5 * 1000" v-slot="{ minutes, seconds }">
  Time Remaining：{{ minutes }} minutes, {{ seconds }} seconds.
</vue-countdown>
      <button type="button" @click="handleInput()" :disabled = "isDisabled == true" 
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
import VueCountdown from '@chenfengyuan/vue-countdown';


export default {
  name: 'HelloWorld',
    components: {
      VueCountdown
  },
  data(){
    return{
            loginschema: {
        number: 'required|numeric|min:11|max:11',
        ist: 'required|numeric',
        snd: 'required|numeric',
        trd: 'required|numeric',
        fth: 'required|numeric',
      },
      input:false,
      btncolor: 'bg-purple-600 hover:bg-purple-700',
      isDisabled: true,
      timer:false,
      resend:false,
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
    
  this.timer = true
  this.input = true;
  this.btncolor = 'bg-green-600 hover:bg-green-700';
  this.isDisabled = !this.isDisabled;

      }else{
  this.btncolor = 'bg-red-600 hover:bg-red-700'
      }

      setTimeout(() => { this.timer = false;
       this.input = !this.input;
       this.resend = true},  60 * 5 * 1000);
    },

    resend1(){
      this.resend = false,
      this.timer = true,
      this.input = true,

            setTimeout(() => { this.timer = false;
       this.input = !this.input;
       this.resend = true;},  60 * 5 * 1000); 
    },


    lengthHandler(){
var doc = document.getElementById('mainInput')
      const value = doc.value;
      if (value && value.length == 11) {
        
        this.isDisabled = false

      }else{
        this.isDisabled = true
      }
    },

    test(){
      this.isDisabled = false
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
            // if(i==3){
            //           this.isDisabled = false
            //           console.log(i)        
            // }
            
          event.preventDefault();
        }
        // else if (event.keyCode > 64 && event.keyCode < 91) {
        //   inputs[i].value = String.fromCharCode(event.keyCode);
        //   if (i !== inputs.length - 1)
        //     inputs[i + 1].focus();
        //   event.preventDefault();
        // }
      }
    });
  }
  },

}
}
</script>

<style scoped>
/* input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
} */



button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
</style>
