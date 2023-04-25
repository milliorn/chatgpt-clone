# ChatGPT Clone Website

This site is my clone of the original site found at <https://chat.openai.com/>

## Requirements

You will need your own api key found at <https://platform.openai.com/account/api-keys>

After you received your own api key, you need to store the key in an `.env` file and put it in project root. You will name the key `CHAT_GPT_API_KEY`

### Example

`CHAT_GPT_API_KEY=someApiKey`

`server.js` calls the api key. If you wish to change the name it needs to be updated there.

## Miscellaneous

This is not production ready. This is meant to be run in development.

## Dependencies

### concurrently

<https://www.npmjs.com/package/concurrently>

Run multiple commands concurrently. Like npm run watch-js & npm run watch-less but better.

### cors

<https://www.npmjs.com/package/cors>

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

### express

<https://www.npmjs.com/package/express>

Fast, unopinionated, minimalist web framework for Node.js.

### nodemon

<https://www.npmjs.com/package/nodemon>

nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

### react-icons

<https://react-icons.github.io/react-icons/>

Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.

### vite

<https://vitejs.dev/>

Next Generation Frontend Tooling
