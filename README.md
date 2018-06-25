[![npm version](https://badge.fury.io/js/hyperapp-forms.svg)](https://badge.fury.io/js/hyperapp-forms)


# hyperapp-forms

Hyperapp form state management library

* Simple
* Small in size (3kb minified)

**Heavily inspired by [`redux-form`](https://redux-form.com/)**

## Installation

```
npm i -S hyperapp-forms
```

## Usage


### Import 

Add the imported actions object contents to the main actions object.

```js

import forms from 'hyperapp-forms';

..

const actions = {
  ..

  ...forms,
};

..

app(state,actions,view,document.body);

```

### Field components

Wrap your input components with the `Field` decorator.

Textbox.js
```js
import { h } from 'hyperapp';
import {Field} from "hyperapp-forms";

const Textbox = ({ input, type, name, title, disabled }) => {
  const showError = (input.touched || input.submitted) && !!input.error;
  return (
    <label>
      {title}
      <input type={type}
             name={name}
             value={input.value}
             disabled={disabled}
             onchange={input.onchange}
             onfocus={input.onfocus}
      />
      {showError && <sup>{input.error}</sup>}
    </label>
  );
};

export default Field(Textbox);
```

The attributes the `Field` decorator adds to the component are:

|Attribute|Type|Description|
|---|---|---|
|form|string|The form's name|
|name|string|The field's name|
|validate|function(form, name, values) : Object |A validate function to run after change

## Actions

### `changeAndValidate({ form, name, value, validate })`

Changes a value for a certain field, also runs the `validate` function and updates the sync errors accordingly.

`validate` is a callback with the following structure `validate(form, name, values)` (see explanation above).

### `touch({ form, name })`

Sets the field as been touched.

### `startSubmit({ form })`

Sets the form's status to be submitting

### `stopSubmit({ form, errors })`

Sets the form's status to be not submitting, and apply server errors by matching field names.


## Selectors

|Selector|Description|
|---|---|
|`getFormValues(state, form)`|Get an object with the form values|
|`isSubmitting(state, form)`|Is the form submitting|
|`isValid(state, form)`|Is the form valid (are there any errors)|
|`wasSubmitted(state, form)`|Was the form submitted at least once (useful for showing errors)|
|`getFieldValue(state, form, field)`|Get a certain field value|
|`getFieldError(state, form, field)`|Get a certain field error|
|`isFieldTouched(state, form, field)`|Was field touched (useful for showing errors)|

## Submission and error handling

`handleSubmit(state, actions, form, callback)`

Use `handleSubmit` in the form's onsubmit (or any button's callback, see example below),

Supply a callback function which will return a promise, which at first will start the form's submission automatically.

And once resolved or rejected will stop the form's submission.

The callback function needs to be in the following structure:

`callback(values, actions) : Promise`

The resolve or reject argument should be


## Usage example

```js

const signIn = (values, actions) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (values.username === 'test') {
      actions.login.login();
      resolve();
    }
    else {
      reject({ username: 'Not "test"!'});
    }
  }, 2000);
});

const validate = (form, name, values) => {

  let errors = null;

  const usernameInvalid = !/^t/.test(values.username);
  if (usernameInvalid) {
    if (!errors) errors = {};
    errors.username = 'not starting with t!';
  }

  const passwordInvalid = !values.password;
  if (passwordInvalid) {
    if (!errors) errors = {};
    errors.password = 'password is required!';
  }

  return errors; // if everything is valid, returns null
};


export default (state, actions) => {

  const submitting = isSubmitting(state, 'login');

  return (
    <form onsubmit={handleSubmit(state, actions, 'login', signIn)}>

      <h2>Login to your account:</h2>

      <Textbox type="text" form="login" name="username" title="Username" disabled={submitting} validate={validate}/>
      <Textbox type="password" form="login" name="password" title="Password" disabled={submitting} validate={validate}/>

      <Checkbox form="login" name="rememberMe" title="Remember me" disabled={submitting}/>

      <button disabled={submitting}>Sign In</button>

      {submitting && <div data-loader />}

    </form>
  );
});
```