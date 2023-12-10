// js script file

function submitBtnClk(event) {
  event.preventDefault();
  console.log('Submit Button Handler function');
}

function deleteRowBtn(event) {
  console.log('Delete row');
  console.log(event.target);
  console.log(event.target.parentElement.parentElement)
  event.target.parentElement.parentElement.remove();
}