hideElement('screen-block');
hideElement('screen-sucefull');
hideElement('screen-table');
showElement('screen-register');
hideElement('info');

const reg_text = new RegExp('^[a-zA-ZÁ-ü\\s]{3,30}$');
const reg_grade = new RegExp('^[0-9](([.]|[,])[0-9]?[0-9])?$|^10$');
const reg_freq = new RegExp('^[0-9]?[0-9](([.]|[,])[0-9]?[0-9])?[%]?$|^100[%]?$');

var students = [];

function showError(message, durationInSeconds) {
    document.getElementById('info').innerHTML = message;
    showElement('info');
    setTimeout(function () { fadeOut('info', 2); }, durationInSeconds * 1000);
}

function validateStudentsForm(name, grade_first, grade_second, frequency) {
    if (!name.match(reg_text)) {
        showError('Nome inválido!', 5);
        return false;
    }
    if (!grade_first.match(reg_grade) || !grade_second.match(reg_grade)) {
        showError('Nota Inválida', 5);
        return false;
    }
    if (!frequency.match(reg_freq)) {
        showError('Frequência Inválida', 5);
        return false;
    }
    return true;
}

function clearForm(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function registerStudent() {
    let input_name = document.getElementById('input_student_name');
    let input_grade_first = document.getElementById('input_student_grade_first');
    let input_grade_second = document.getElementById('input_student_grade_second');
    let input_frequency = document.getElementById('input_student_frequency');
    if (validateStudentsForm(input_name.value, input_grade_first.value, input_grade_second.value, input_frequency.value)) {
        let newStudent = {
            name: input_name.value,
            grade_first: input_grade_first.value.replace(',', '.'),
            grade_second: input_grade_second.value.replace(',', '.'),
            frequency: input_frequency.value.replace('%', '')
        };
        students.push(newStudent);
        showElement('screen-block');
        showElement('screen-sucefull');

        clearForm([input_name, input_grade_first, input_grade_second, input_frequency]);
    }
}

function hideElement(id) {
    let element = document.getElementById(id);
    element.style.display = 'none';
}

function showElement(id) {
    let element = document.getElementById(id);
    element.style.display = 'block';
    element.style.opacity = 1;
}

function fadeOut(id, seconds) {
    let element = document.getElementById(id);
    let opacity = window.getComputedStyle(element).getPropertyValue("opacity");
    if (opacity > 0) {
        element.style.opacity = opacity - 0.0299 / seconds;
        setTimeout(() => { fadeOut(id, seconds) }, 33.334);
    } else {
        element.style.display = "none;"
    }
}

function choiceContinue() {
    hideElement('screen-sucefull');
    hideElement('screen-block');
}

function choiceFinish() {
    hideElement('screen-sucefull');
    hideElement('screen-block');
    generateTable();
    hideElement('screen-register');
    showElement('screen-table');
}

function generateTable() {
    let base = document.getElementById('screen-table');
    let table = document.createElement('table');
    let first_row = document.createElement('tr');

    let head_empty = document.createElement('th');
    first_row.appendChild(head_empty);

    let head_name = document.createElement('th');
    head_name.innerHTML = "Nome";
    first_row.appendChild(head_name);

    let head_grade_first = document.createElement('th');
    head_grade_first.innerHTML = "1º Semestre";
    first_row.appendChild(head_grade_first);

    let head_grade_second = document.createElement('th');
    head_grade_second.innerHTML = "2º Semestre";
    first_row.appendChild(head_grade_second);

    let head_average = document.createElement('th');
    head_average.innerHTML = "Nota Final";
    first_row.appendChild(head_average);

    let head_frequency = document.createElement('th');
    head_frequency.innerHTML = "Frequência";

    first_row.appendChild(head_frequency);
    table.appendChild(first_row);

    for (let i = 0; i < students.length; i++) {
        let average = ((+students[i].grade_first + +students[i].grade_second) / 2);
        let status = average >= 5 && students[i].frequency >= 75 ? 'aproved' : 'reproved';
        let row = document.createElement('tr');
        row.className = status;
        
        let data_id = document.createElement('td');
        data_id.innerHTML = i+1;
        row.appendChild(data_id);

        let data_name = document.createElement('td');
        data_name.innerHTML = students[i].name;
        row.appendChild(data_name);

        let data_grade_first = document.createElement('td');
        data_grade_first.innerHTML = students[i].grade_first;
        row.appendChild(data_grade_first);

        let data_grade_second = document.createElement('td');
        data_grade_second.innerHTML = students[i].grade_second;
        row.appendChild(data_grade_second);

        let data_average = document.createElement('td');
        data_average.innerHTML = average.toFixed(2);
        row.appendChild(data_average);

        let data_frequency = document.createElement('td');
        data_frequency.innerHTML = students[i].frequency + ' %';
        row.appendChild(data_frequency);

        table.appendChild(row);
    }
    base.appendChild(table);
}