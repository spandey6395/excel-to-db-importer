const express = require('express');
const readXlsxFile = require('read-excel-file/node');
const { MongoClient } = require('mongodb');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

// MongoDB connection settings
const dbURI = 'mongodb+srv://spandey6395:R43s8If0R4EpfraA@cluster0.mknlo.mongodb.net';
const dbName = 'Saurabh56790';

app.use(express.json());

app.post('/import', upload.single('file'), async (req, res) => {
  const excelFile = req.file;

  if (!excelFile) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const rows = await readXlsxFile(excelFile.path);

    // Read the header row
    const headerRow = rows.shift();

    const client = await MongoClient.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(dbName);
    const employeesCollection = db.collection('employees');

    const employees = rows.map((row) => {
      const employee = {};
    
      headerRow.forEach((columnName, index) => {
        employee[columnName] = row[index];
      });
    
      return employee;
    });

    await employeesCollection.insertMany(employees);

    await client.close();

    res.status(200).send('Employee data imported successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error importing employee data');
  }
});


app.get('/search', async (req, res) => {
    const { search, job_title, department, gender, country, city, from_hiring_date, to_hiring_date, sort_by } = req.query;

    const query = {};

    if (search) {
      query['Employee ID'] = search;
    }
    if (job_title) {
      query['Job Title'] = job_title;
    }
    if (department) {
      query.Department = department;
    }
    if (gender) {
      query.Gender = gender;
    }
    if (country) {
      query.Country = country;
    }
    if (city) {
      query.City = city;
    }
    if (from_hiring_date && to_hiring_date) {
      query['Hire Date'] = {
        $gte: new Date(from_hiring_date),
        $lte: new Date(to_hiring_date),
      };
    } else if (from_hiring_date) {
      query['Hire Date'] = { $gte: new Date(from_hiring_date) };
    } else if (to_hiring_date) {
      query['Hire Date'] = { $lte: new Date(to_hiring_date) };
    }

    try {
    const client = await MongoClient.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    const db = client.db(dbName);
    const employeesCollection = db.collection('employees');

    const sort = {};
    if (sort_by) {
      sort[sort_by] = 1;
    }

    const employees = await employeesCollection.find(query).sort(sort).toArray();

    await client.close();

    res.status(200).send(employees);
} catch (error) {
    console.error(error);
    res.status(500).send('Error searching employee data');
    }
    });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
