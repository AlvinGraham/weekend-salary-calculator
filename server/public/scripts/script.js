// js script file

//global variables
const employees = [{id: '1', salary: 0}];
let totalSalary = 0;
const maxMonthlySalary = 20000;

console.log('employees', employees);
console.log('totalSalary', totalSalary);

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

  // Update Global Variables
  employees.push({id: id, salary: salary});
  console.log('new employees', employees);
  updateTotalSalary();
  console.log('new totalSalary', totalSalary);

  // Update DOM / add row to table
  let tableBodyEle = document.querySelector("#empTableBody");
  console.log('tableBodyEle', tableBodyEle);
  tableBodyEle.innerHTML += `
        <tr>
          <td id="empFirstName">${firstName}</td>
          <td id="empLastName">${lastName}</td>
          <td id="empID">${id}</td>
          <td id="empTitle">${title}</td>
          <td id="empSalary">$ ${salary.toFixed(2)}</td>
          <td><button class="deleteBtn" onclick="deleteRowBtn(event)">Delete</button></td>
        </tr>`;
  document.querySelector('#userMessage').innerHTML =
   `New Employee ID ${id} added.  Ready for next entry...`;
  
   document.querySelector('form').reset();


  return;
}

function deleteRowBtn(event) {
  console.log('Delete row');
  console.log(event.target);
  console.log(event.target.parentElement.parentElement)
  event.target.parentElement.parentElement.remove();
}

function updateTotalSalary() {
  totalSalary = 0;
  for (let item of employees) {
    totalSalary += item.salary;
  }

  console.log('New Total salary (from update)', totalSalary);
  // update DOM
  let monthlySalary = totalSalary / 12;
  let footerEle = document.querySelector('footer')
  // console.log(footerEle);
  footerEle.classList.remove('over-budget'); // Clear Overbudget Status
  if (monthlySalary > maxMonthlySalary) {    // Update Overbudget Status
    footerEle.classList.add('over-budget');  
      
    }
  
  document.querySelector("#monthlyCost").innerHTML = `$ ${monthlySalary.toFixed(2)}`;
   
  
  return;
}