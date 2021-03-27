// Get data from data.js
var tableData = data;

// Create lists of unique countries and shapes for dropdown menu
let uniqueCountries = [...new Set(tableData.map(td => td.country))];

let uniqueShapes = [...new Set(tableData.map(td => td.shape))];

uniqueCountries.forEach((country) => {
	d3.select("#country").append("option").text(country);
})

uniqueShapes.forEach((shape) => {
	d3.select("#shape").append("option").text(shape);
})

// Get a reference to the table body
var tbody = d3.select("tbody");

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.selectAll(".form-control");

// Create event handlers 
button.on("click", updateFilters);
form.on("change", updateFilters);

// Function to build a table:

function buildTable(data) {
    // Start by clearing existing data
    tbody.html("")
    
    // Loop through each row of 'data'
    data.forEach(function(dataRow){
        // Append table row `tr` to the table body `tbody`
        var row = tbody.append("tr");
        // `Object.values` & `forEach` to Iterate Through Values
        Object.values(dataRow).forEach(function(val){
            // Append a cell to the row for each value
            let cell = row.append("td");
            cell.text(val);
        });
    })
}

// Build the table when the page loads
buildTable(tableData);

// Keep track of all filters
var filters = {
  'datetime': "",
  'city': "",
  'state': "",
  'country': "",
  'shape': ""
}

// Create the event handler function
function updateFilters() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input elements and get the value property of them
  filters.datetime = d3.select("#datetime").property("value");
  filters.city = d3.select("#city").property("value").toLowerCase();
  filters.state = d3.select("#state").property("value").toLowerCase();
  filters.country = d3.select("#country").property("value").toLowerCase();
  filters.shape = d3.select("#shape").property("value").toLowerCase();

  // Initialze filteredData with all data
  var filteredData = tableData

  // Iterate through filter object
  Object.entries(filters).forEach(([key, input]) => {
    // Check if user input does exist
    if (input) {
      // Filter data
      filteredData = filteredData.filter(sighting =>
        sighting[key] === input);
    }
  });
  // Render the table with filtered data
  buildTable(filteredData);
}
