# vite-starter

This starter includes `Typescript`

## Environment Variables

Just like CRA, Vite supports environment variables. We can create a .env file in the root of our project. We can then add environment variables to this file. They must begin with VITE_.

`VITE_API_KEY=123456789`

```jsx
const Header = () => {
  return <div>{import.meta.env.VITE_API_KEY}</div>;
};

export default Header;
```

## Using SASS

Sass support is built into Vite. We can use it by installing the sass package.

`npm install sass`

Create a `styles` folder and add `main.scss` file.

```css
body {
  background-color: steelblue;
}
```

Import Sass file into the app.jsx file.

`import './styles/main.scss';`
