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

//
// function filterFunction(record, category){
//     var filteredData;
//     switch(category){
//         case 'date':
//             return record => record.datetime === search);
//             break;
//         default:
//             filteredData = data.filter(record => record.datetime === search);
//             break;
//     }
//     return filteredData;
// }

filterButton.on('click', function () {
   //Prevent the page from refreshing
    d3.event.preventDefault();

    // select the input elements
    var inputDate = d3.select('#datetime').node().value;
    var inputCity = d3.select('#cityname').node().value;
    var inputState = d3.select('#statename').node().value;
    var inputCountry = d3.select('#countryname').node().value;
    var inputShape = d3.select('#shapename').node().value;

    console.log(`City: ${inputCity}, State: ${inputState}, Country: ${inputCountry}, Shape: ${inputShape}`);

    // filter the data by the inputs

    var filteredRecord = data.filter(record =>   ( ((record.datetime===inputDate) || !inputDate)
                                                && ((record.city === inputCity) || !inputCity)
                                                && ((record.state === inputState) || !inputState)
                                                && ((record.country === inputCountry) || !inputCountry)
                                                && ((record.shape === inputShape) || !inputShape)
        ));

    // var filteredData = data.filter(function(record){
    //     var filters;
    //     if (inputDate){
    //         filters = filterFunction()
    //     }
    // });

    if (inputDate === undefined || inputDate.length ==0){
        // display the original data
        tbody.text("");
        populateTable(tableData);
    }
    else if(filteredRecord.length == 0 && inputDate.length != 0) {
        tbody.text("No matched record found in the database!");
    }
    else{
        tbody.text("");
        // console.log(filteredRecord);
        populateTable(filteredRecord);
    }

});

