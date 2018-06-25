import defaultFormState from "./defaultFormState";

const actions = {
  forms: {
    changeAndValidate: ({ form, name, value, validate }) => state => {
      const stateForm = state[form] || defaultFormState;
      const values = {
        ...stateForm.values,
        [name]: value
      };
      const touched = {
        ...stateForm.touched,
        [name]: true
      };
      return {
        ...state,
        [form]: {
          ...stateForm,
          errors: validate ? validate(form, name, values) || defaultFormState.errors : defaultFormState.errors,
          values,
          touched
        }
      };
    },
    touch: ({ form, name }) => state => {
      const stateForm = state[form] || defaultFormState;
      return {
        ...state,
        [form]: {
          ...stateForm,
          touched: {
            ...stateForm.touched,
            [name]: true
          }
        }
      }
    },
    startSubmit: ({ form }) => state => {
      const stateForm = state[form] || defaultFormState;
      return {
        ...state,
        [form]: {
          ...stateForm,
          meta: {
            ...stateForm.meta,
            submitting: true,
            submitted: true
          }
        }
      }
    },
    stopSubmit: ({ form, errors }) => state => {
      const stateForm = state[form] || defaultFormState;
      return {
        ...state,
        [form]: {
          ...stateForm,
          asyncErrors: errors || {},
          meta: {
            ...stateForm.meta,
            submitting: false,
          }
        }
      }
    }
  }
};

export default actions;