import {
    Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
  } from 'vee-validate';
  import {
    required, min, max,numeric
  } from '@vee-validate/rules';
  
  export default {
    install(app) {
      app.component('VeeForm', VeeForm);
      app.component('VeeField', VeeField);
      app.component('ErrorMessage', ErrorMessage);
  
      defineRule('required', required);
      defineRule('numeric', numeric);
      defineRule('min', min);
      defineRule('max', max);
  
      configure({
        generateMessage: (ctx) => {
          const messages = {
            required: `The field ${ctx.field} is required`,
            min: `The field ${ctx.field} is too short`,
            max: `The field ${ctx.field} is too long`,
            min_value: `The field  ${ctx.field} is too low`,
            max_value: `The field ${ctx.field} is too high`,
            numeric: 'The field must be numeric',
          };
  
          const message = messages[ctx.rule.name]
            ? messages[ctx.rule.name]
            : `The field ${ctx.field} is invalid`;
  
          return message;
        },
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: false,
      });
    },
  };
  