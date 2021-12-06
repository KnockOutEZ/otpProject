import {
    Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure
  } from 'vee-validate';
  import {
    required, min, max,numeric,alpha_spaces as alphaSpaces
  } from '@vee-validate/rules';
  
  export default {
    install(app) {
      app.component('VeeForm', VeeForm);
      app.component('VeeField', VeeField);
      app.component('ErrorMessage', ErrorMessage);
  
      defineRule('required', required);
      defineRule('numeric', numeric);
      defineRule('alpha_spaces', alphaSpaces);
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
            alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces`,
            excluded: `You are not allowed to use this value for the field ${ctx.field}`,
            tos: 'You must accept the terms and services',
          };
  
          const message = messages[ctx.rule.name]
            ? messages[ctx.rule.name]
            : `The field ${ctx.field} is invalid`;
  
          return message;
        },
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: false,
        classes: true,
        validity: true,
        classNames: {
          valid: 'is-valid',
          invalid: 'is-invalid'
        }
      });
    },
  };
  