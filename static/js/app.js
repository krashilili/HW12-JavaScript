// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select('tbody');

// populate the table
function populateTable(tableData){
    tableData.forEach((record) => {
        var row = tbody.append('tr');
        Object.entries(record).forEach( ([key, value]) =>{
        row.append('td').text(value);
        });
    });
};

populateTable(data);

// Listen to the event
var filterButton = d3.select("#filter-btn");


filterButton.on('click', function () {
   //Prevent the page from refreshing
    d3.event.preventDefault();

    // select the input element
    var inputElement = d3.select('#datetime');

    // get the value property of the input element
    var searchDate = inputElement.property("value");

    // filter the data
    var filteredRecord = data.filter(record => record.datetime===searchDate);

    if (searchDate === undefined || searchDate.length ==0){
        // display the original data
        tbody.text("");
        d3.selectAll('tr').remove();
        populateTable(tableData);
    }
    else if(filteredRecord.length == 0 && searchDate.length != 0) {
        tbody.text("No matched record found in the database!");
    }
    else{
        tbody.text("");
        // remove any existing rows
        d3.selectAll('tr').remove();
        // console.log(filteredRecord);
        populateTable(filteredRecord);
    }

});

