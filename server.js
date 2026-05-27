const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [];
let applications = [];

// Home Route
app.get("/", (req, res) => {
  res.send("Internship Portal Backend Running");
});

// Register User
app.post("/api/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };

  users.push(user);
  res.json(user);
});

// Get Users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Delete User
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(user => user.id !== id);

  res.json({
    message: "User deleted successfully"
  });
});

// Internship Application
app.post("/api/applications", (req, res) => {
  const application = {
    id: applications.length + 1,
    studentName: req.body.studentName,
    companyName: req.body.companyName,
    position: req.body.position,
    status: "Pending"
  };

  applications.push(application);
  res.json(application);
});

// Get Applications
app.get("/api/applications", (req, res) => {
  res.json(applications);
});

// Accept Application
app.put("/api/applications/:id/accept", (req, res) => {
  const id = parseInt(req.params.id);

  const application = applications.find(app => app.id === id);

  if (application) {
    application.status = "Accepted";
    res.json(application);
  } else {
    res.status(404).json({
      message: "Application not found"
    });
  }
});

// Reject Application
app.put("/api/applications/:id/reject", (req, res) => {
  const id = parseInt(req.params.id);

  const application = applications.find(app => app.id === id);

  if (application) {
    application.status = "Rejected";
    res.json(application);
  } else {
    res.status(404).json({
      message: "Application not found"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});