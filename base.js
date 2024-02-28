// First, we will select HTML elements from the DOM
// Step 1: Select elements from the HTML document
const form = document.getElementById("employee-form");
const tableBody = document.getElementById("employee-table-body");

// This line adds an event listener to the form element.
// This is an anonymous function (a function without a name) that serves as the event handler.
form.addEventListener("submit", function (event) {
  // This line of code prevents the form from being submitted in the traditional way.
  // We don't want the page to reload when the form is submitted.
  event.preventDefault();

  // Now Next, we need to extract the data entered by the user into the form fields.
  // We could do this by accessing the value property of each input element.
  const firstName = document.getElementById("firstNameInput").value;
  const lastName = document.getElementById("lastNameInput").value;
  const idNumber = document.getElementById("idInput").value;
  const jobTitle = document.getElementById("titleInput").value;
  //// We're using parseFloat() to convert the value to a floating-point number rather than decimal
  const annualSalary = parseFloat(
    document.getElementById("annualSalaryInput").value
  );

  // We need to create a new row in the table to display this data.
  // We use document.createElement() to create a new row
  // and then we use innerHTML to set the content of the new row.
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${idNumber}</td>
    <td>${jobTitle}</td>
    <td>$${annualSalary.toFixed(2)}</td>
    <td><button class="delete-button">Delete</button></td>
  `;

  /// We append the new row to the table so that it appears in the user interface.
  tableBody.appendChild(newRow);

  // We're updating the total monthly cost displayed in the footer. We call a function named this below.
  updateTotalMonthlyCost();
});

// Define a function to update the total monthly cost
function updateTotalMonthlyCost() {
  // Select all elements containing annual salaries in the employee table
  const allSalaries = document.querySelectorAll(
    "#employee-table-body td:nth-child(5)"
  );
  // Initialize a variable to store the total monthly cost
  let totalMonthlyCost = 0;

  // Iterate over each salary element
  allSalaries.forEach((salary) => {
    // Obtain the text content of the salary element and convert it to a number
    totalMonthlyCost += parseFloat(
      salary.textContent.replace("$", "").replace(/,/g, "")
    );
  });

  // Update the text content of the element displaying the total monthly cost
  document.getElementById(
    "totalMonthlyCost"
  ).textContent = `$${totalMonthlyCost.toFixed(2)}`;

  // Select the footer element
  const footer = document.getElementById("footer");
  // Check if the total monthly cost exceeds $20,000
  if (totalMonthlyCost > 20000) {
    // Add the 'over-budget' CSS class to the footer if the cost is over budget
    footer.classList.add("over-budget");
  } else {
    // Remove the 'over-budget' CSS class from the footer if the cost is within budget
    footer.classList.remove("over-budget");
  }
}

// Select the table body element and add an event listener to it
tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    // Remove the closest row to the delete button clicked
    event.target.closest("tr").remove();
    // Update total monthly cost after removing the row
    updateTotalMonthlyCost();
  }
});
