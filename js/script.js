/* 
 File: script.js
 GUI Assignment: Dynamic multiplication table
 Christopher Huerta
 10/29/25
here is my scrip which allows me to read the inputs the user puts in as well as validates inputs to see if they work with 
my values as well create the dynamic table for the assingment
 */

// event listener that allows use to read the inputs the usesr puts in after pressing the enter button
document.addEventListener('DOMContentLoaded', () => {
    const readBtn = document.getElementById('readBtn');

    readBtn.addEventListener('click', generateTable);
});


//dynamically create table through this function
function generateTable() {
    // getting all input values done this way to handles invalid inputs easier
    const inputs = [
        { id: 'minCol', value: parseInt(document.getElementById('minCol').value) },
        { id: 'maxCol', value: parseInt(document.getElementById('maxCol').value) },
        { id: 'minRow', value: parseInt(document.getElementById('minRow').value) },
        { id: 'maxRow', value: parseInt(document.getElementById('maxRow').value) },
    ];
    const tableContainer = document.getElementById('tableContainer');

    // Clear last table
    tableContainer.innerHTML = "";

    // Resets all inputs when checking for valid inpiuts
    inputs.forEach(input => clearValidation(input.id));

    // checks for nan values in inputs
    let hasError = false;
    inputs.forEach(input => {
        if (isNaN(input.value)) {
            showInputError(input.id, "Please enter a valid number");
            hasError = true;
        }
    });

    // leave current task if invalid values are entered
    if (hasError) return;

    const minCol = inputs[0].value;
    const maxCol = inputs[1].value;
    const minRow = inputs[2].value;
    const maxRow = inputs[3].value;

    //  check ranges for inputs to make sure they are valid
    if (minCol > maxCol) {
        showInputError('minCol', "Min column must be ≤ Max column");
        showInputError('maxCol', "Max column must be ≥ Min column");
        return;
    }
    if (minRow > maxRow) {
        showInputError('minRow', "Min row must be ≤ Max row");
        showInputError('maxRow', "Max row must be ≥ Min row");
        return;
    }

    //makes limit so the user doesnt make the page unresponsive
    const limit = 50;
    const allValues = [minCol, maxCol, minRow, maxRow];
    if (allValues.some(v => v < -limit || v > limit)) {
        alert(`Values must be between -${limit} and ${limit}.`);
        return;
    }

    // create table elements
    const table = document.createElement('table');
    table.className = "custom-table";
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // top left corner of table
    headerRow.appendChild(document.createElement('th'));

    // Column headers
    for (let col = minCol; col <= maxCol; col++) {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    }

    // adds header row to the table head
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let row = minRow; row <= maxRow; row++) {
        const tr = document.createElement('tr');

        //create for cell in each row
        const rowHeader = document.createElement('th');
        rowHeader.textContent = row;
        tr.appendChild(rowHeader);

        //multiplication cells are made here
        for (let col = minCol; col <= maxCol; col++) {
            const td = document.createElement('td');
            td.textContent = row * col;
            tr.appendChild(td);
        }

        //add the finished row to the table body
        tbody.appendChild(tr);
    }

    //add table body to the table container
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}


function showInputError(inputId, message) {
    const input = document.getElementById(inputId);

    // Clear the field
    input.value = "";
    input.classList.add("is-invalid");


    let feedback = input.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        input.parentElement.appendChild(feedback);
    }

    feedback.textContent = message;

    // Remove error when user starts typing again
    input.addEventListener('input', () => clearValidation(inputId), { once: true });
}

//remove error message when validating inputs
function clearValidation(inputId) {
    const input = document.getElementById(inputId);
    input.classList.remove("is-invalid");

    // clear feedback message
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.remove();
}