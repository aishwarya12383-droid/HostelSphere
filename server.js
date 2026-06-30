const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const usersFile = path.join(__dirname, "data", "users.json");
const bookingsFile = path.join(__dirname, "data", "bookings.json");
const complaintsFile = path.join(__dirname, "data", "complaints.json");
const noticesFile = path.join(__dirname, "data", "notices.json");
const menuFile = path.join(__dirname, "data", "menu.json");
const visitorsFile = path.join(__dirname, "data", "visitors.json");

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Student Registration
app.post("/register", async (req, res) => {

const { name, email, phone, password, department, year } = req.body;

    try {

        const users = JSON.parse(fs.readFileSync(usersFile));

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password: hashedPassword,
    department,
    year,
    role: "student"
};

        users.push(newUser);

        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Student Login
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const users = JSON.parse(fs.readFileSync(usersFile));

        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        res.json({
            success: true,
            message: "Login Successful",
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Book Meal
app.post("/book-meal", (req, res) => {

    const { student, email, meal, items } = req.body;

    try {

        const bookings = JSON.parse(fs.readFileSync(bookingsFile));

        const booking = {
            id: Date.now(),
            student,
            email,
            meal,
            items,
            date: new Date().toLocaleDateString()
        };

        bookings.push(booking);

        fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

        res.json({
            success: true,
            message: "Meal Booked Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Admin Dashboard
app.get("/admin/dashboard", (req, res) => {

    try {

        const users = JSON.parse(fs.readFileSync(usersFile));
        const bookings = JSON.parse(fs.readFileSync(bookingsFile));

        res.json({

            students: users.length,
            meals: bookings.length,
            complaints: 0,
            foodSaved: bookings.length + " KG"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// Get All Students
app.get("/students", (req, res) => {

    try {

        const users = JSON.parse(fs.readFileSync(usersFile));

        res.json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// ================= COMPLAINTS =================

// Submit Complaint
app.post("/complaints", (req, res) => {

    try {

        const complaints = JSON.parse(fs.readFileSync(complaintsFile));

        const complaint = {
            id: Date.now(),
            student: req.body.student,
            title: req.body.title,
            category: req.body.category,
            priority: req.body.priority,
            description: req.body.description,
            status: "Pending",
            date: new Date().toLocaleString()
        };

        complaints.push(complaint);

        fs.writeFileSync(
            complaintsFile,
            JSON.stringify(complaints, null, 2)
        );

        res.json({
            success: true,
            message: "Complaint Submitted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Get All Complaints
app.get("/complaints", (req, res) => {

    try {

        const complaints = JSON.parse(fs.readFileSync(complaintsFile));

        res.json(complaints);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Update Complaint Status
app.put("/complaints/:id", (req, res) => {

    try {

        const complaints = JSON.parse(fs.readFileSync(complaintsFile));

        const complaint = complaints.find(
            c => c.id == req.params.id
        );

        if (!complaint) {

            return res.status(404).json({
                success: false,
                message: "Complaint Not Found"
            });

        }

        complaint.status = req.body.status;

        fs.writeFileSync(
            complaintsFile,
            JSON.stringify(complaints, null, 2)
        );

        res.json({
            success: true,
            message: "Status Updated"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Add Notice
app.post("/notices", (req, res) => {

    const { title, message } = req.body;

    try {

        const notices = JSON.parse(fs.readFileSync(noticesFile));

        const notice = {
            id: Date.now(),
            title,
            message,
            date: new Date().toLocaleString()
        };

        notices.push(notice);

        fs.writeFileSync(
            noticesFile,
            JSON.stringify(notices, null, 2)
        );

        res.json({
            success: true,
            message: "Notice Added Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Get All Notices
app.get("/notices", (req, res) => {

    try {

        const notices = JSON.parse(fs.readFileSync(noticesFile));

        res.json(notices);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});
// Analytics
app.get("/analytics", (req, res) => {

    try {

        const users = JSON.parse(fs.readFileSync(usersFile));
        const bookings = JSON.parse(fs.readFileSync(bookingsFile));
        const complaints = JSON.parse(fs.readFileSync(complaintsFile));
        const notices = JSON.parse(fs.readFileSync(noticesFile));

        res.json({

            students: users.length,
            bookings: bookings.length,
            complaints: complaints.length,
            notices: notices.length,
            foodSaved: bookings.length + " KG"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});
// Get Today's Menu
app.get("/menu", (req, res) => {

    try {

        const menu = JSON.parse(fs.readFileSync(menuFile));

        res.json(menu);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Update Menu
app.post("/menu", (req, res) => {

    const { breakfast, lunch, dinner } = req.body;

    try {

        const menu = {
            breakfast,
            lunch,
            dinner
        };

        fs.writeFileSync(menuFile, JSON.stringify(menu, null, 2));

        res.json({
            success: true,
            message: "Menu Updated Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// ================= VISITORS =================

// Get All Visitors
app.get("/visitors", (req, res) => {

    try {

        const visitors = JSON.parse(fs.readFileSync(visitorsFile));

        res.json(visitors);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Submit Visitor Request
app.post("/visitors", (req, res) => {

    try {

        const visitors = JSON.parse(fs.readFileSync(visitorsFile));

        const visitor = {
            id: Date.now(),
            student: req.body.student,
            name: req.body.name,
            relation: req.body.relation,
            date: req.body.date,
            time: req.body.time,
            purpose: req.body.purpose,
            status: "Pending"
        };

        visitors.push(visitor);

        fs.writeFileSync(visitorsFile, JSON.stringify(visitors, null, 2));

        res.json({
            success: true,
            message: "Visitor Request Submitted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Update Visitor Status
app.put("/visitors/:id", (req, res) => {

    try {

        const visitors = JSON.parse(fs.readFileSync(visitorsFile));

        const visitor = visitors.find(v => v.id == req.params.id);

        if (!visitor) {

            return res.status(404).json({
                success: false,
                message: "Visitor Not Found"
            });

        }

        visitor.status = req.body.status;

        fs.writeFileSync(visitorsFile, JSON.stringify(visitors, null, 2));

        res.json({
            success: true,
            message: "Visitor Status Updated"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});