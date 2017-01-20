# {{input-spark}}

A replacement for \<input\>

<http://www.ember-sparks.com/>

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

| Name        | Type   | Default | Description                                                      |
|-------------|--------|---------|------------------------------------------------------------------|
| text        | string | `null`  | Describe the property here. This can be edited in the README.md  |


## Actions

| Name        | Description                                                                         |
|-------------|-------------------------------------------------------------------------------------|
| onKeyUp     | Describe your action here. This can be edited in the README.md                      | 


## Block version

If you use the blocking version of the component, you can prepend an icon to the input. This could be an element with a class from an icon font, or an `img`-tag, but we recommend SVG:

```handlebars
{{#input-spark}}
  <svg></svg>
{{/input-spark}}
```


## Theming

To see these examples in action, check out the interactive documentation.

<em>**Important!** All classes are local in order to avoid naming collisions and unintended CSS side effects. To understand how to style them, check out the Ember Sparks documentation.</em>

- `.input`

  The input box that the user interacts in.
  If the input is focused, the class `.focused` is appended to it.
  If the error bubble is showing, the class `.has-error` is appended to it.

  **Example:**
  ```css
  .input {
    background-color: #ffd9d5;
  }
  ```
  
- `.prefix`

  Style the prefix

  **Example:**
  ```css
  .prefix {
    color: blue;
  }
  ```

- `.error`

  Style the error box

  **Example:**
  ```css
  .prefix {
    background-color: #ffdc30;
    color: #af7c38;
  }
  ```
  
## Contributing

