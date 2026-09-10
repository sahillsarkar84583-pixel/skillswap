let selectedTeacher = "";
let selectedPrice = 0;

let bookings = [];

// Menu
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("open");
}


// Page navigation
function showPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  document.getElementById("sideMenu").classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Search
function searchSkill() {

  const search = document
    .getElementById("skillSearch")
    .value
    .toLowerCase()
    .trim();

  if (!search) {
    alert("Please enter a skill.");
    return;
  }

  alert("Searching for: " + search);
}


// Skill selection
function selectSkill(skill) {

  document.getElementById("skillSearch").value = skill;

  alert("You selected " + skill);

  showPage("home");
}


// Open booking modal
function bookSession(teacher, price) {

  selectedTeacher = teacher;
  selectedPrice = price;

  document.getElementById("teacherName").innerText =
    "Teacher: " + teacher;

  document.getElementById("sessionPrice").innerText =
    price === 0
      ? "Price: FREE"
      : "Price: ₹" + price;

  document.getElementById("modal").classList.add("show");
}


// Close modal
function closeModal() {
  document.getElementById("modal").classList.remove("show");
}


// Confirm booking
function confirmBooking() {

  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;

  if (!date) {
    alert("Please select a date.");
    return;
  }

  const commission = selectedPrice * 0.10;
  const teacherAmount = selectedPrice - commission;

  const booking = {
    teacher: selectedTeacher,
    price: selectedPrice,
    commission: commission,
    teacherAmount: teacherAmount,
    date: date,
    time: time
  };

  bookings.push(booking);

  closeModal();

  updateBookings();

  showPage("bookings");

  if (selectedPrice > 0) {

    alert(
      "Prototype booking created!\n\n" +
      "Payment required: ₹" + selectedPrice +
      "\nPlatform commission: ₹" + commission +
      "\nTeacher amount: ₹" + teacherAmount
    );

  } else {

    alert("Free session booked successfully!");
  }
}


// Display bookings
function updateBookings() {

  const container = document.getElementById("bookingList");

  if (bookings.length === 0) {

    container.innerHTML =
      '<p class="empty">No bookings yet.</p>';

    return;
  }

  container.innerHTML = "";

  bookings.forEach((booking, index) => {

    const div = document.createElement("div");

    div.className = "session-card";

    div.innerHTML = `
      <h3>${booking.teacher}</h3>
      <p>Date: ${booking.date}</p>
      <p>Time: ${booking.time}</p>
      <p>
        ${booking.price === 0
          ? "FREE"
          : "Paid: ₹" + booking.price}
      </p>
      <button onclick="cancelBooking(${index})">
        Cancel Booking
      </button>
    `;

    container.appendChild(div);
  });
}


// Cancel booking
function cancelBooking(index) {

  if (confirm("Cancel this booking?")) {

    bookings.splice(index, 1);

    updateBookings();

    alert("Booking cancelled.");
  }
}


// Course enrollment
function enroll(course) {

  alert(
    "You are enrolled in:\n" +
    course
  );
}


// Teacher actions
function createCourse() {

  const name = prompt("Enter course name:");

  if (name) {
    alert("Course created: " + name);
  }
}


function createSession() {

  const type = prompt(
    "Enter session type:\nFree or Paid"
  );

  if (type) {

    alert(
      "Session creation started.\nType: " +
      type
    );
  }
}