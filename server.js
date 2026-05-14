const express = require('express');
const sql = require('mssql');

const app = express();
app.use(express.json());

const config = {
  user: 'adminuser',
  password: 'Diba12@@',
  server: 'internship-server123.database.windows.net',
  database: 'InternshipPortalDB',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.post('/register', async (req, res) => {
  try {
    await sql.connect(config);

    const { name, email, role } = req.body;

    await sql.query`
      INSERT INTO Users (name, email, role)
      VALUES (${name}, ${email}, ${role})
    `;

    res.send('User saved in database!');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

app.get('/users', async (req, res) => {
  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT * FROM Users
    `;

    res.json(result.recordset);
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});
app.post('/internships', async (req, res) => {
  try {
    await sql.connect(config);

    const { title, company, description } = req.body;

    await sql.query`
      INSERT INTO Internships (title, company, description)
      VALUES (${title}, ${company}, ${description})
    `;

    res.send('Internship saved in database!');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

app.get('/internships', async (req, res) => {
  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT * FROM Internships
    `;

    res.json(result.recordset);
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});
app.post('/apply', async (req, res) => {
  try {
    await sql.connect(config);

    const { user_id, internship_id } = req.body;

    await sql.query`
      INSERT INTO Applications (user_id, internship_id, status)
      VALUES (${user_id}, ${internship_id}, 'Pending')
    `;

    res.send('Application submitted successfully!');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});
app.get('/applications', async (req, res) => {
  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT * FROM Applications
    `;

    res.json(result.recordset);
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});
app.put('/applications/:id/status', async (req, res) => {
  try {
    await sql.connect(config);

    const applicationId = req.params.id;
    const { status } = req.body;

    await sql.query`
      UPDATE Applications
      SET status = ${status}
      WHERE application_id = ${applicationId}
    `;

    res.send('Application status updated successfully!');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});
app.delete('/applications/:id', async (req, res) => {
  try {
    await sql.connect(config);

    const applicationId = req.params.id;

    await sql.query`
      DELETE FROM Applications
      WHERE application_id = ${applicationId}
    `;

    res.send('Application deleted successfully!');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});
app.post('/login', async (req, res) => {
  try {
    await sql.connect(config);

    const { email } = req.body;

    const result = await sql.query`
      SELECT * FROM Users
      WHERE email = ${email}
    `;

    if (result.recordset.length > 0) {
      res.send('Login successful');
    } else {
      res.send('User not found');
    }

  } catch (err) {
    res.send('Error: ' + err.message);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
