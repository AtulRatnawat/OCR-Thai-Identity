# Thai ID OCR System - https://ocr-thai-identification.netlify.app/

Welcome to the Thai ID OCR System! This project is designed to provide a solution for Optical Character Recognition (OCR) of Thai ID cards. The system includes a backend implemented in Node.js using Express and MongoDB for data storage. On the front-end, user interface (created by ReactJs) interacts with the backend to upload images, view OCR results, and manage all the records.

**Link to project** - https://ocr-thai-identification.netlify.app/

## Backend

### Folder Structure
- `src`: Contains the main source code files.
  - `database.js`: Establishes a connection to MongoDB.
- `model`: Contains the MongoDB schemas.
  - `ImgDataModel.js`: Defines the MongoDB schema for storing image data.
  - `entryModel.js`: Specifies the schema for storing OCR results.
- `index.js`: The main entry point for the backend application.
- `package.json`: Lists dependencies and scripts for the backend.

### Database
The backend uses MongoDB to store two types of data: image data (`image-data` collection) and OCR results (`identities` collection).

### API Endpoints

1. **Upload Image and Perform OCR**
   - Endpoint: `/upload`
   - Method: POST
   - Description: Uploads an image file and processes it using the Google Vision API for OCR. The OCR results are stored in the MongoDB `identities` collection.

2. **Fetch Previous Records (History Page)**
   - Endpoint: `/api/entries`
   - Method: GET
   - Description: Retrieves all previous OCR records stored in the `identities` collection.

3. **Add a New Entry**
   - Endpoint: `/api/entries`
   - Method: POST
   - Description: Adds a new entry to the `identities` collection. This can be used to manually add OCR results.

4. **Delete an Entry by ID**
   - Endpoint: `/api/entries/:identificationNumber`
   - Method: DELETE
   - Description: Deletes an OCR entry based on the identification number.

5. **Get Success OCR Operations**
   - Endpoint: `/api/successRate`
   - Method: GET
   - Description: Calculates and returns the success rate of OCR operations.

6. **Save Image in the Database**
   - Endpoint: `/api/saveImage`
   - Method: POST
   - Description: Saves the binary image data in the MongoDB `image-data` collection.

7. **Get Image Data by ID**
   - Endpoint: `/api/getImageData/:id`
   - Method: GET
   - Description: Retrieves the binary image data based on the image ID.

### Running the Backend
1. Set up a MongoDB database and obtain the connection URI.
2. Create a `.env` file in the `src` folder with `DB_URI` set to your MongoDB connection URI.
3. Run `npm install` to install dependencies.
4. Execute `npm start` to start the backend server.

## Frontend

### Folder Structure
- `src`: Contains the main React source code files.
  - `Components`: Holds individual React components.
  - `App.js`: The main application component.
  - `index.js`: The entry point for the React application.
- `public`: Contains static files like `index.html`.
- `package.json`: Lists dependencies and scripts for the frontend.

### Components
1. **Home**
   - Displays a welcome message on the home page.

2. **Identity**
   - Provides a form to upload an image and initiate OCR.

3. **Records**
   - Displays a list of previous OCR records.

4. **SuccessRate**
   - Shows the success rate of OCR operations.

5. **NavBar**
   - A navigation bar is used for easy access to different sections.

### Running the Frontend
1. Run `npm install` to install dependencies.
2. Execute `npm start` to start the React development server.
3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

### Backend
- The backend is deployed on hosting services of render.
- Deployed Link - https://backend-ocr-thai-identity.onrender.com

### Frontend
- The frontend is deployed separately on Netlify.
- Deployed Link - https://ocr-thai-identification.netlify.app/

Feel free to explore, contribute, and enhance this Thai ID OCR System! If you encounter any issues or have suggestions, please create a new GitHub issue.





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
