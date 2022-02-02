// iteration 1
// currently self invoking. maybe a function other than self invoking will fix issues with pushing objects into arrays

const parsing = (ev) => {
  // 9/4 prevents the page from reloading (which is default behavior for submitting a form)
  ev.preventDefault();

  // *** NOTE: python3 -m http.server to go LOCALHOST
  {
    var contents = document.getElementById("tableContent");
    if (contents != null) contents.remove();

    var tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "tableContent");
    var table = document.querySelector("table");

    var courseNumber = [];
  } // removing the table body and creating a new one for repopulation

  // 9/4 obtain user inputs from <input>
  let submission = {
    department: String(document.getElementById("Department").value),
    course: String(document.getElementById("Course").value),
  };

  // ajax get request, populates csvData with csv data
  $.get("engineering-final.csv", function (csvData) {
    // jQuery function to convert csv file to columnHeader:value pairs
    var data = $.csv.toObjects(csvData);

    //
    data.forEach(function (element) {
      {
        let firstHyphen = element.Section.indexOf("-");
        let secondHyphen = element.Section.indexOf("-", firstHyphen + 1);
        element.Course = element.Section.substring(0, firstHyphen);
        element.Number = element.Section.substring(
          firstHyphen + 1,
          secondHyphen
        );
        element.Section = element.Section.substring(secondHyphen + 1);
      } // retrieve elements for HTML

      // complete request if csv row of data > course & number are valid.
      // 9/4 added uppercase conversion to handle all requests
      if (
        element.Course === submission.department.toUpperCase() &&
        element.Number === submission.course.toUpperCase()
      ) {
        courseNumber.push(element);
        const tableRow = document.createElement("tr");
        var content = `
          <td> ${element.Semester + " " + element.Year} </td>
          <td> ${element.Instructor} </td>
          <td> ${element.Section} </td>
          <td> ${element.GPA} </td>
          <td> ${element.A} </td>
          <td> ${element.B} </td>
          <td> ${element.C} </td>
          <td> ${element.D} </td>
          <td> ${element.F} </td>
          <td> ${element.AtoF} </td>
          <td> ${element.Total} </td>
          `;
        tableRow.innerHTML = content;
        tableBody.append(tableRow);
      }
    });
    console.log(courseNumber); // check callback functions and eventListeners for sorting
  });
  table.append(tableBody);
};

// implementation work in progress
var testing = [];
const sorting = (course) => {
  course
    .sort(function (a, b) {
      return a.GPA - b.GPA;
    })
    .reverse();
};

// added 9/4, performs parsing function when click is made
// https://www.youtube.com/watch?v=NxVCq4p0Kb0&ab_channel=SteveGriffith-Prof3ssorSt3v3
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formSubmit").addEventListener("click", parsing);
});
