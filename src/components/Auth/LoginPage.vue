<template>
  <div class="parent">
    <div class="flex flex-col justify-center items-center h-screen bg-gray-100 ">
      <vee-form @submit.prevent :validation-schema="loginschema" class="md:w-4/12 sm:w-screen bg-gray-50 p-10 rounded-lg">
      <h1 class="font-bold text-xl mb-2">Please enter your number:</h1>

    <div class="relative text-gray-600 focus-within:text-gray-400 mb-2">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <span type="submit" class="p-2 mb-1 focus:outline-none focus:shadow-outline text-left text-indigo-400">
          88
        </span>
      </span>
      <vee-field v-model="message" placeholder="01XXXXXXXXX" name="number" type="text"  id="mainInput" @keyup.enter="handleInput()" @input="lengthHandler()"
        class="border-2 transition duration-500 placeholder-indigo-400 focus:placeholder-transparent border-indigo-400 mb-1 w-full p-2 pl-8 text-left text-indigo-400 bg-transparent rounded-md focus:outline-none "/>
    </div>
      <ErrorMessage class="text-red-600 w-full  text-center" name="number"/>
      <!-- <div class="w-full grid grid-cols-4 gap-4 mt-2" v-if="input == true" id="otp">
        <vee-field name="ist" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " type="text" id="ist" maxlength="1" v-on:keyup="clickevent()" />
        <vee-field name="snd" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " disabled type="text" id="sec" maxlength="1" v-on:keyup="clickevent()" />
        <vee-field name="trd" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " disabled type="text" id="third" maxlength="1" v-on:keyup="clickevent()" />
        <vee-field name="fth" class="border-2 transition duration-500 placeholder-gray-400 focus:placeholder-transparent border-gray-400 mb-1 w-full p-2 text-center text-gray-400 bg-transparent rounded-md focus:outline-none " disabled type="text" id="fourth" maxlength="1" v-on:keyup="test()"/>
      </div> -->
      <!-- <input  v-on:keyup="checkSubmitBtn()" id="otpInput" placeholder="0000" type="text" maxlength="4" class="tracking-widest border-2 transition duration-500 placeholder-indigo-400 focus:placeholder-transparent border-indigo-400 mb-1 w-full p-2 text-left text-indigo-400 bg-transparent rounded-md focus:outline-none "/> -->
      <div v-if="input" style="display: flex; flex-direction: row;">
    <OtpInput
    id="otpInput"
      ref="otpInput"
      input-classes="otp-input"
      separator="-"
      :num-inputs="4"
      :should-auto-focus="true"
      :is-input-num="true"
      @on-change="handleOnChange"
      @on-complete="checkSubmitBtn"
      @keyup.enter="handleInput()"
      v-model="otp"
    />
  </div>
      <button type="button" v-if="resend" @click="resend1()" class="text-green-400 text-right w-full">Resend code?</button>
      
      <vue-countdown v-if="timer"  :time=" 60 * 3 * 1000" v-slot="{ minutes, seconds }">
  Time Remaining：{{ minutes }} minutes, {{ seconds }} seconds.
</vue-countdown>
      <button id="submitButton" type="button" @click.prevent="handleInput()" :disabled = "isDisabled == true" 
              class="block w-full  text-white py-1.5 px-3 rounded transition mt-2
               " :class="btncolor">
              Submit
            </button>
      </vee-form>
      
</div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCountdown from '@chenfengyuan/vue-countdown';
import OtpInput from 'vue3-otp-input';
import { ref } from "vue";



export default {
  name: 'LoginPage',
    components: {
      VueCountdown,
      OtpInput,
  },
  setup() {
    const otpInput = ref(null)
     const clearInput = () => {
      otpInput.value.clearInput()
    }

    return { clearInput, otpInput };
  },
  data(){
    return{
            loginschema: {
        number: 'required|numeric|min:11|max:11',
        // ist: 'required|numeric',
        // snd: 'required|numeric',
        // trd: 'required|numeric',
        // fth: 'required|numeric',
      },
      input:false,
      btncolor: 'bg-purple-600 hover:bg-purple-700',
      isDisabled: true,
      timer:false,
      resend:false,
      message:"",
      otp:"",
      otpSent:false,
    }
  },

methods:{
  handleOnComplete(value) {
      console.log('OTP completed: ', value);
      this.otp = value
    },

    handleOnChange(value){
      console.log('OTP changed: ', value);
      this.otp = value
    },
  // loginForm(){
  //   console.log(this.message)
  // },
// https://sellbee-api.herokuapp.com/v1/auth/verify-otp
  numberMethod () {
     this.$store.state.loader = true
  axios.post(process.env.VUE_APP_API_URL + 'vendor/login', {number: 88 + this.message})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res)
                     this.otpSent = true
     this.$store.state.loader = false

                 })
                 .catch((error) => {
                     // error.response.status Check status code
                     console.log(error)
                     this.otpSent = false
                     this.btncolor = 'bg-red-600 hover:bg-red-700'
                     this.isDisabled = !this.isDisabled;
     this.$store.state.loader = false


                 }).finally(() => {
                     //Perform action in always
                     console.log('finally')

                 });
        },

// https://sellbee-api.herokuapp.com/v1/auth/verify-otp
// {withCredentials:true}
          otpMethod () {
     this.$store.state.loader = true

  axios.post(process.env.VUE_APP_API_URL + 'vendor/verify-otp', {number:88 + this.message,otp:this.otp},{withCredentials:true})
                 .then((res) => {
                     //Perform Success Action
                     console.log(res)
     this.$store.state.loader = false

                     this.$store.commit('toggleAuthenticated')
    this.$router.push({ name: 'Dashboard' });
    console.log(res.data)
                 })
                 .catch((error) => {
     this.$store.state.loader = false

                     // error.response.status Check status code
                     console.log(error)
                     console.log(this.otp)

                 }).finally(() => {
                     //Perform action in always
                     console.log('finally')
                     console.log("succsess")
                 });
        },


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
       this.resend = true},  60 * 3 * 1000);
  if(this.otpSent == true){
    this.otpMethod()
  }else{
    this.numberMethod()
  }
      //  this.loginForm()
    },

    resend1(){
      this.resend = false,
      this.timer = true,
      this.input = true,
      this.otpSent = false,
      this.otp = "",
      this.numberMethod()

            setTimeout(() => { this.timer = false;
       this.input = !this.input;
       this.resend = true;},  60 * 3 * 1000); 
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

checkSubmitBtn(value){
    this.isDisabled = !this.isDisabled
    console.log(value)
},

    test(){
      
              //       if(document.getElementById('fourth').value.length != 0){
              //   this.isDisabled = false;
              // }else{
              //   this.isDisabled = true;

              // }
    },


  // clickevent(){
  //   const inputs = document.querySelectorAll('#otp > *[id]');
  //   for (let i = 0; i < inputs.length; i++) {
  //   inputs[i].addEventListener('keydown', function(event) {
  //     if (event.key === "Backspace") {
  //       inputs[i].value = '';
  //       if (i !== 0)
  //         inputs[i - 1].focus();
  //         if(i <= 2){
  //             inputs[i+1].setAttribute('disabled','disabled')
  //             document.getElementById('submitButton').setAttribute('disabled','disabled')
  //           }
  //     } else {
  //       if (i === inputs.length - 1 && inputs[i].value !== '') {
  //         return true;
  //       } else if (event.keyCode > 47 && event.keyCode < 58) {
  //         inputs[i].value = event.key;
  //         if (i !== inputs.length - 1)
  //           inputs[i + 1].focus();
  //           // if(i <= 2){
  //           //   inputs[i + 1].removeAttribute('disabled')
  //           // }
  //           // if(i==3){
  //           //           this.isDisabled = false
  //           //           console.log(i)        
  //           // }
            
  //         event.preventDefault();
  //       }
  //       // else if (event.keyCode > 64 && event.keyCode < 91) {
  //       //   inputs[i].value = String.fromCharCode(event.keyCode);
  //       //   if (i !== inputs.length - 1)
  //       //     inputs[i + 1].focus();
  //       //   event.preventDefault();
  //       // }
  //     }
  //   });
  // }
  // },

},
mounted(){
  console.log(this.$store.state.isAuthenticated)
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

input:disabled,
input[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
</style>
