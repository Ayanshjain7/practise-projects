const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));


const port = process.env.PORT || 3000;

let students = [
  { id: 1, name: "Alice", status: "Not Marked" },
  { id: 2, name: "Bob", status: "Not Marked" },
  { id: 3, name: "Charlie", status: "Not Marked" }
];


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.listen(port, () => {
  console.log("✅ Server running at http://localhost:" + port);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "teacher" && password === "1234") {
    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }

});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { teacher: "Teacher A", students: students });
});

app.post("/mark", (req, res) => {
  const { id, status } = req.body;

  // Find student by ID
  let student = students.find(s => s.id == id);
  if (student) {
    student.status = status;
  }

  res.redirect("/dashboard"); // reload the dashboard with updated status
});

app.get("/student", (req, res) => {
  res.render("studentLogin", { error: null });
});

// Student Dashboard
app.post("/student", (req, res) => {
  const { id } = req.body;
  let student = students.find(s => s.id == id);

  if (student) {
    res.render("studentDashboard", { student });
  } else {
    res.render("studentLogin", { error: "Student not found" });
  }
});


