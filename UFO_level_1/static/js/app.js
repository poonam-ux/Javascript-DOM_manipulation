// Get data from data.js
const tableData = data;

// Use D3 to select the table body (Get table references or get all attributes of tbody)
let tbody = d3. select("tbody");

// Select the button
var filterButton = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Function buildTable()
function buildTable(data){
    // Start by clearing existing data
    tbody.html("");
    // Loop through each row of 'data'
    data.forEach((dataRow) => {
        // Append table row `tr` to the table body `tbody`
        let row = tbody.append("tr");
        // `Object.values` & `forEach` to Iterate Through Values
        Object.values(dataRow).forEach((val) => {
            // Append a cell to the row for each value
            let cell = row.append("td");
            cell.text(val);
        });
    })
}

// Create event handlers (`on` function to attach an Event to the Handler Function)
filterButton.on("click", handleClick);
form.on("submit",handleClick);

// Event that Triggers a Function When the Button is Clicked
function handleClick(){
    // Prevent the Page from Refreshing
    d3.event.preventDefault();
    // Select HTML Input Element & Get the Value Property of that Input Element
    let userdate = d3.select("#datetime").property("value");
    let filteredData = tableData;

    // Check if a Date was Entered & Filter Data Using that Date;
    if(userdate) {
        // Apply Filter to the Table Data to Only Keep Rows Where datetime Value Matches the Filter Value
        filteredData = filteredData.filter((row) => row.datetime === userdate);
    }
    // Build Table with Filtered Data
    buildTable(filteredData);
}

// Build the table when the page loads
buildTable(tableData);