import { getFormValues } from "./selectors";

const handleSubmit = (state, actions, form, callback) => e => {
  e.preventDefault();
  actions.forms.startSubmit({ form });
  const stopForm = (errors) => {
    actions.forms.stopSubmit({ form, errors });
  };
  const values = getFormValues(state, form);
  callback(values, actions).then(stopForm).catch(stopForm);
};

export default handleSubmit;