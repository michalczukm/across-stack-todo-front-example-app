# Across Stack
This repository contains example implementation of TODO list app - the front-end part.

:rocket: Run it now -> [demo based on localStorage](https://michalczukm.github.io/across-stack-todo-front-example-app/)

It expects that API will cover [this specification](https://michalczukmpresentstodoapi.docs.apiary.io).

To run it just call 

```
npm install
npm start
```

OR

```
yarn
yarn start
```

By default app works with `json-server`, you can run it by calling `npm run start:dev`.

If nothing is defined app works on `localStorage` --> its the ultimate fallback for it, and a showcase.

---

## How to plugin my own back-end?
You have to fulfill 

### Fill the .env file
It should look like that:
```
REACT_APP_API_BASE=http://localhost:3001
```

Where `http://localhost:3001` is your API base URL.

### Use temporary environment variables in shell
This app is based on [create-react-app](https://github.com/facebook/create-react-app), just do it same way:


Where `http://localhost:3001` is your API base URL.

#### Windows (cmd.exe)

```cmd
set "REACT_APP_API_BASE=http://localhost:3001" && npm start
```

(Note: Quotes around the variable assignment are required to avoid a trailing whitespace.)

#### Windows (Powershell)

```Powershell
($env:REACT_APP_API_BASE = "http://localhost:3001") -and (npm start)
```

#### Linux, macOS (Bash)

```bash
REACT_APP_API_BASE=http://localhost:3001 npm start
```

Enjoy :smile:
