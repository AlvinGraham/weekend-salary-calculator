// js script file

//global variables
const employees = [{id: '1', salary: 0}];
let totalSalary = 0;
const maxMonthlySalary = 20000;

// console.log('employees', employees);
// console.log('totalSalary', totalSalary);

function submitBtnClk(event) {
  event.preventDefault();
  console.log('Submit Button Handler function', event);
  // Assign local variables
  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let id = document.querySelector("#idInput").value;
  let title = document.querySelector("#title").value;
  let salary = parseInt(document.querySelector("#annualSalary").value);
  
  // ADD Validation CODE HERE (Unique ID and required fields)
    // ensure ID and salary (required fields) are populated
    if (!id || !salary || (salary < 0)) {
      document.querySelector('#userMessage').innerHTML =
      `ID and positive Salary are required fields. Try again!!!`;
      document.querySelector('form').reset();
      return;
    }

    // ensure ID is unique
    if (!isUnique(id)){
      document.querySelector('#userMessage').innerHTML =
      `ID entry must be unique. Try again!!!`;
      document.querySelector('form').reset();
      return;
    }

  // Update Global Variables
  employees.push({id: id, salary: salary});
  console.log('employees Array Updated:', employees)

  updateTotalSalary();
  // console.log('new totalSalary', totalSalary);

  // Update DOM / add row to table
  let tableBodyEle = document.querySelector("#empTableBody");
  console.log('tableBodyEle', tableBodyEle);
  tableBodyEle.innerHTML += `
        <tr>
          <td id="empFirstName">${firstName}</td>
          <td id="empLastName">${lastName}</td>
          <td id="empID">${id}</td>
          <td id="empTitle">${title}</td>
          <td id="empSalary">$ ${toCurrency(salary)}</td>
          <td><button class="deleteBtn" onclick="deleteRowBtn(event)">Delete</button></td>
        </tr>`;
        // update user message
        document.querySelector('#userMessage').innerHTML =
   `New Employee ID ${id} added.  Ready for next entry...`;
  
   document.querySelector('form').reset();


  return;
}

function deleteRowBtn(event) {
  console.log('deleteRowBtn(event) called', event);
  console.log('Event Target', event.target);
  console.log('Targeted row', event.target.parentElement.parentElement)
  
  // update global variables
    //update employees array
    let currentID = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    console.log('currentID', currentID);
    let employeeIndex = 0;
    for (let counter = 0; counter < employees.length; counter++) {
      console.log('counter', counter);
      console.log('currentID', currentID, 'employees id prop', employees[counter].id);
      if (currentID === employees[counter].id) {
        employeeIndex = counter;
        break;
      }
    }
    employees.splice(employeeIndex, 1);
    console.log('New employees', employees); 

    //update Total Salary
    updateTotalSalary();
  
    //update user message
    document.querySelector('#userMessage').innerHTML =
    `Employee ID ${currentID} terminated with prejudice.  Ready for next entry...`;
    
    // remove row from DOM
  event.target.parentElement.parentElement.remove();
}

function updateTotalSalary() {
  totalSalary = 0;
  for (let item of employees) {
    totalSalary += item.salary;
  }

  console.log('updateTotalSalary() called. New totalSalary:', totalSalary);
  // update DOM
  let monthlySalary = totalSalary / 12;
  let footerEle = document.querySelector('footer')
  // console.log(footerEle);
  
  // check for over-budeget state
  footerEle.classList.remove('over-budget'); // Clear Overbudget Status
  if (monthlySalary > maxMonthlySalary) {    // Update Overbudget Status
    console.log('Applying styles due to over-budget state');
    footerEle.classList.add('over-budget');        
    }
  
  document.querySelector("#monthlyCost").innerHTML = `$ ${toCurrency(monthlySalary)}`;
   
  
  return;
}

function isUnique (id) {
  console.log('isUnique() called')
 
  for (let counter = 0; counter < employees.length; counter++) {
    if (id === employees[counter].id) {
      return false;
    }
  }  

  return true;
}

function toCurrency (number) {
  let result;
  
  // convert to 2 point decimal
  result = number.toFixed(2);
  console.log('Number to fixed value: ', result);

  // separte decimal from whole
  let decimal = result.slice(result.lastIndexOf('.'));
  console.log('decimal', decimal);
  let whole = result.slice(0, result.indexOf('.'));
  console.log('whole', whole);

  // format whole with commas
  whole = parseInt(whole).toLocaleString();
  // console.log('with locale string', whole);
  
  // recombine components
  result = `${whole}${decimal}`;

  return result;
}