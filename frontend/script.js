const API_URL = "http://127.0.0.1:3000";

/* LOAD USERS */

async function loadUsers() {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";

    users.forEach(user => {
        usersList.innerHTML += `
            <div class="card">
                <p>${user.name} - ${user.email} - ${user.role}</p>

                <button onclick="editUser(${user.user_id})">Edit</button>
                <button onclick="deleteUser(${user.user_id})">Delete</button>
            </div>
        `;
    });

    document.getElementById("totalUsers").innerText = users.length;
}

/* REGISTER USER */

async function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, role })
    });

    showNotification("User registered successfully");
    loadUsers();
}

/* LOGIN */

async function loginUser() {
    const email = document.getElementById("loginEmail").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const data = await response.json();
    showNotification(data.message);
}

/* DELETE USER */

async function deleteUser(id) {
    await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE"
    });

    showNotification("User deleted successfully");
    loadUsers();
}

/* EDIT USER */

async function editUser(id) {
    const name = prompt("Enter new name");
    const email = prompt("Enter new email");
    const role = prompt("Enter new role");

    await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, role })
    });

    showNotification("User updated successfully");
    loadUsers();
}

/* SEARCH USERS */

async function searchUsers() {
    const name = document.getElementById("searchInput").value;

    const response = await fetch(`${API_URL}/search/${name}`);
    const users = await response.json();

    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";

    users.forEach(user => {
        usersList.innerHTML += `
            <div class="card">
                <p>${user.name} - ${user.email} - ${user.role}</p>
            </div>
        `;
    });
}

/* LOAD APPLICATIONS */

async function loadApplications() {
    const response = await fetch(`${API_URL}/applications`);
    const applications = await response.json();

    const applicationsList = document.getElementById("applicationsList");
    applicationsList.innerHTML = "";

    applications.forEach(app => {
        applicationsList.innerHTML += `
            <div class="card">
                <p><strong>ID:</strong> ${app.application_id}</p>
                <p><strong>Student:</strong> ${app.student_name}</p>
                <p><strong>Company:</strong> ${app.company}</p>
                <p><strong>Position:</strong> ${app.position}</p>
                <p><strong>Status:</strong> ${app.status}</p>

                <button onclick="acceptApplication(${app.application_id})">Accept</button>
                <button onclick="rejectApplication(${app.application_id})">Reject</button>
            </div>
        `;
    });

    document.getElementById("totalApplications").innerText =
        applications.length;
}

/* SUBMIT APPLICATION */

async function applyInternship() {
    const student_name = document.getElementById("studentName").value;
    const company = document.getElementById("companyName").value;
    const position = document.getElementById("position").value;

    await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            student_name,
            company,
            position
        })
    });

    showNotification("Application submitted successfully");
    loadApplications();
}

/* ACCEPT APPLICATION */

async function acceptApplication(id) {
    await fetch(`${API_URL}/applications/accept/${id}`, {
        method: "PUT"
    });

    showNotification("Application accepted successfully");
    loadApplications();
}

/* REJECT APPLICATION */

async function rejectApplication(id) {
    await fetch(`${API_URL}/applications/reject/${id}`, {
        method: "PUT"
    });

    showNotification("Application rejected successfully");
    loadApplications();
}

/* NOTIFICATION */

function showNotification(message) {
    document.getElementById("notificationBox").innerHTML =
        `<p>${message}</p>`;
}

/* START */

loadUsers();
loadApplications();