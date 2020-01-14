# {{input-spark}}

A replacement for \<input\>

<https://ember-sparks.github.io/>

----

## Installation and usage

Install the Ember Sparks addon (this components is part of the standard library)
```bash
ember install ember-sparks
```

Now restart your Ember app and drop the component in there!
```handlebars
{{input-spark
  placeholder="Start typing"
}}
```

## Properties

| Name             | Type             | Default                   | Description                        |
|------------------|------------------|---------------------------|------------------------------------|
| `value`          | `string`         | `null`                    | The predefined value of the input. |
| `placeholder`    | `string`         | `null`                    | The text to be displayed before the user enters a value. |
| `prefix`         | `string`         | `null`                    | The prefix to be displayed before the user's input. This comes in handy if you want to show a domain name in front of a username input for example. |
| `label`          | `boolean/string` | `true`                    | The label to show on top of the input, when the placeholder is no longer visible. If set to `true`, it will have the same value as `placeholder`. |
| `maxlength`      | `number`         | `unlimited`               | The maximum number of characters that the user can type. |
| `disabled`       | `boolean`        | `false`                   | Determines whether the input should be disabled or not. |
| `error`          | `string`         | `null`                    | Specifies an error with the input. If it's set, an error message will appear underneath. |
| `errorComponent` | `string`         | `input-spark/error-spark` | The name of the component to render for error messages. You can overwrite the default one, as long as you make sure it accepts the `error` property. |
| `scrollOnError`  | `boolean`        | `false`                   | Determines whether the page should scroll to the input when `error` is set. This is handy if your page is long, and you want the user to automatically be taken to whichever input is faulty. |


## Actions

| Name             | Description                                                                           |
|------------------|---------------------------------------------------------------------------------------|
| `onKeyUp`        | Triggers when the user releases a key.                                                |
| `onKeyDown`      | Triggers when the user presses down a key.                                            |
| `onEnter`        | Triggers when the user pressed the enter key.                                         |
| `onFocus`        | Triggers when the user focuses on the input.                                          |
| `onBlur`         | Triggers when the user blurs (stops focusing) on the input.                           |
| `onInput`        | Triggers when the user changes the value of the input.                                |
| `onFinishTyping` | Triggers when the user hasn't typed anything new for 1 second.                        |
| `onChange`       | Triggers when the user has changed the value of the input and then focuses out of it. |


## Block version

If you use the blocking version of the component, you can set an icon at the beginning of the input. This can be done through inline SVG (recommended), an icon font or an `img`-tag.

```handlebars
{{#input-spark}}
  <svg role="img">
    <use xlink:href="/assets/icons.svg#user"></use>
  </svg>
{{/input-spark}}
```


## Theming

To see these examples in action, check out the [interactive documentation](https://ember-sparks.github.io/input-spark/).

<em>**Important!** All classes are local in order to avoid naming collisions and unintended CSS side effects. To understand how to style them, check out the Ember Sparks documentation.</em>

- `.container`

  Set some default settings here, such as width, font-size... etc.

  **Example:**
  ```css
  .container {
    font-size: 11px;
  }
  ```

- `.input`

  The (virtual) input box that the user interacts in.
  If the input is focused, the class `.focused` is appended to it.
  If the input is disabled, the class `.disabled` is appended to it.
  If the error bubble is showing, the class `.has-error` is appended to it.

  **Example:**
  ```css
  .input {
    background-color: #ffd9d5;
  }
  ```
  
- `.prefix`

  Style the prefix at the beginning of the input.

  **Example:**
  ```css
  .prefix {
    color: blue;
  }
  ```

- `.icon`

  Style the icon container that contains the eventual SVG icon. Block mode only.

- `.label`

  Style the floating label above the input.

  **Example:**
  ```css
  .label {
    color: red;
  }
  ```

- `.error`

  Style the default error box.

  **Example:**
  ```css
  .prefix {
    background-color: #ffdc30;
    color: #af7c38;
  }
  ```
  
## Contributing

Check out the guidelines at https://ember-sparks.github.io/docs#contribute
