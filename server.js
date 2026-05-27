const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- USERS ---------------- */

let users = [
    {
        user_id: 1,
        name: "Diba",
        email: "diba@test.com",
        role: "student"
    }
];

/* ---------------- APPLICATIONS ---------------- */

let applications = [
    {
        application_id: 1,
        student_name: "Diba",
        company: "NexGenKlick",
        position: "Backend Intern",
        status: "Pending"
    }
];

/* ---------------- HOME ---------------- */

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

/* ---------------- GET USERS ---------------- */

app.get("/users", (req, res) => {
    res.json(users);
});

/* ---------------- ADD USER ---------------- */

app.post("/users", (req, res) => {

    const newUser = {
        user_id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    users.push(newUser);

    res.json({
        message: "User added",
        user: newUser
    });
});

/* ---------------- DELETE USER ---------------- */

app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    users = users.filter(user =>
        user.user_id !== id
    );

    res.json({
        message: "User deleted"
    });
});

/* ---------------- EDIT USER ---------------- */

app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user =>
        user.user_id === id
    );

    if (user) {

        user.name = req.body.name;
        user.email = req.body.email;
        user.role = req.body.role;

        res.json({
            message: "User updated"
        });

    } else {

        res.status(404).json({
            message: "User not found"
        });
    }
});

/* ---------------- SEARCH USER ---------------- */

app.get("/search/:name", (req, res) => {

    const name = req.params.name.toLowerCase();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(name)
    );

    res.json(filteredUsers);
});

/* ---------------- LOGIN ---------------- */

app.post("/login", (req, res) => {

    const email = req.body.email;

    const foundUser = users.find(user =>
        user.email === email
    );

    if (foundUser) {

        res.json({
            success: true,
            message: "Login successful"
        });

    } else {

        res.json({
            success: false,
            message: "User not found"
        });
    }
});

/* ---------------- GET APPLICATIONS ---------------- */

app.get("/applications", (req, res) => {
    res.json(applications);
});

/* ---------------- ADD APPLICATION ---------------- */

app.post("/applications", (req, res) => {

    const newApplication = {
        application_id: applications.length + 1,
        student_name: req.body.student_name,
        company: req.body.company,
        position: req.body.position,
        status: "Pending"
    };

    applications.push(newApplication);

    res.json({
        message: "Application submitted",
        application: newApplication
    });
});

/* ---------------- ACCEPT APPLICATION ---------------- */

app.put("/applications/accept/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const application = applications.find(app =>
        app.application_id === id
    );

    if (application) {

        application.status = "Accepted";

        res.json({
            message: "Application accepted"
        });

    } else {

        res.status(404).json({
            message: "Application not found"
        });
    }
});

/* ---------------- REJECT APPLICATION ---------------- */

app.put("/applications/reject/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const application = applications.find(app =>
        app.application_id === id
    );

    if (application) {

        application.status = "Rejected";

        res.json({
            message: "Application rejected"
        });

    } else {

        res.status(404).json({
            message: "Application not found"
        });
    }
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});