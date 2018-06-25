import defaultFormState from './defaultFormState';

const _form = (state, form) => (state.forms && state.forms[form]) || defaultFormState;

const getFormValues = (state, form) => _form(state, form).values;
const isSubmitting = (state, form) => Boolean(_form(state, form).meta.submitting);
const isValid = (state, form) => _form(form.state) ? Object.keys(state.forms[form].errors).length > 0 : false;
const wasSubmitted = (state, form) => Boolean(_form(state, form).meta.submitted);

const getFieldValue = (state, form, name) => _form(state, form).values[name] || '';
const getFieldError = (state, form, name) => {
  const s = _form(state, form); return s.asyncErrors[name] || s.errors[name];
};
const isFieldTouched = (state, form, name) => _form(state, form).touched[name] || false;

export {
  getFormValues,
  isSubmitting,
  isValid,
  wasSubmitted,
  getFieldValue,
  getFieldError,
  isFieldTouched
};