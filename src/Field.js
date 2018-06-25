import {getFieldValue, getFieldError, isFieldTouched, wasSubmitted} from './selectors';

const valueExtractors = {
  "checkbox": el => el.checked,
  "number": el => parseFloat(el.value),
  "tel": el => parseFloat(el.value),
  "default": el => el.value
};

const Field = component => attr => (state, actions) => {

  const { form, name, validate } = attr;

  const value = getFieldValue(state, form, name),
    error = getFieldError(state, form, name),
    touched = isFieldTouched(state, form, name),
    submitted = wasSubmitted(state, form);
  const input = {
    value,
    error,
    touched,
    submitted,
    onchange: event => {
      const vex = valueExtractors[event.target.type] || valueExtractors.default;
      const value = vex(event.target);
      actions.forms.changeAndValidate({form, name, value, validate});
    },
    onfocus: () => {
      actions.forms.touch({form, name});
    }
  };

  return component({ ...attr, input });
};

export default Field;