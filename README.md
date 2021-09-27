# Planetly code challenge

## Start the aplication

I used Create React App to develop the challenge. In order to run it, first install the dependencies:

### `yarn`

and then

### `yarn start`

This will run the app in the development mode.\
Open [http://localhost:3000](~http://localhost:3000~) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## API Key

in order to have access to the API, you should save the carbon interface key in a file called **.env** stored in the main folder. It should look like this:

`REACT_APP_API_KEY=[YOUR KEY]`

## State Management

In the first approach I used `createContext` to store the state of the date retrieved from the API, but when I refactored i decided that this was unnecessary for this small application and change it for a simple `useState`.
