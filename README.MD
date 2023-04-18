# Excel to DB Importer

This project demonstrates how to import employee data from an Excel file into a MongoDB database and search the data using a simple Node.js server with Express.

## Steps

1. Create a folder named `excel-to-db-importer`.
2. Open a terminal or command prompt, navigate to the `excel-to-db-importer` folder and initialize a new Node.js project with the command: `npm init -y`.
3. Install the required Node.js packages by running the following command: `npm install express read-excel-file multer mongodb nodemon`.
4. Add the following script in the `package.json` file under the `scripts` section: `"start": "npx nodemon index.js"`.
5. Create an `index.js` file in the `excel-to-db-importer` folder and implement the server code.
6. Start the project by running the command: `npm start`.

## APIs

1. **Import Employee Data (POST)**: `http://localhost:3000/import`
   - Upload an Excel file containing employee data to be imported into the MongoDB database.
2. **Search Employee Data (GET)**: `http://localhost:3000/search`
   - Search for employee data based on various filters such as employee ID, job title, department, gender, country, city, hiring date range, and sort the results.

### Example for the Search API

`http://localhost:3000/search?search=E02002&job_title=Controls%20Engineer&department=Engineering&gender=Male&country=United%20States&city=Columbus&from_hiring_date=2022-01-01&to_hiring_date=2022-12-31&sort_by=Hire%20Date`
