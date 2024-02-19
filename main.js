const funcs = require('./myFunctions.js');
const filePath = './files/baseData.txt';
const masterFilePath = './files-master/baseData.txt';

if (funcs.compareFiles(filePath, masterFilePath)) {
    // Update file and validate data change
    var columnName, searchValue, newData;

    columnName = "EMPLOYEE_NUMBER";
    searchValue = '959484';
    newData = {
        EMPLOYEE_NUMBER: '959484',
        LAST_NAME: 'u2671350_LN',
        FIRST_NAME: 'u2671350_FN',
        MARITAL_STATUS: 'uS',
        DATE_OF_JOIN: "u06-06-2021",
        TERMINATION_DATE: "u20-02-2023",
        SALUTATION: "uMR.",
        EMAIL_ADDRESS: "u"
    };
    funcs.findRowAndReplaceDataInCSV(filePath, columnName, searchValue, newData);

    // filePath = './files/orgDetails.txt';
    // columnName = "EMPLOYEE_NUMBER";
    // searchValue = '793379';
    // newData = {
    //     EMPLOYEE_NUMBER: '793379',
    //     HISTORIC_USERFIELD_NAME: 'uORGANISATION',
    //     ORGANISATION: 'uD2245',
    //     ORGANISATION_START_OATE: 'u18-10-2021'
    // };
    // findRowAndReplaceDataInCSV(filePath, columnName, searchValue, newData);
} else {
    // Copy the master file
    funcs.replaceFile(masterFilePath, filePath);
}