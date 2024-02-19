const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function findRowAndReplaceDataInCSV(filePath, columnName, searchValue, newData) {
    let rows = [];

    fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
            rows.push(row);
        })
        .on('end', () => {
            const rowIndex = rows.findIndex(row => row[columnName] === searchValue);
            if (rowIndex === -1) {
                console.log(`Column '${columnName}' not found.`);
                return;
            }
            rows[rowIndex] = newData;

            const csvWriter = createCsvWriter({
                path: filePath,
                header: Object.keys(rows[0]).map(key => ({ id: key, title: key })),
                fieldDelimiter: ';'
            });

            csvWriter.writeRecords(rows)
                .then(() => console.log('Data replaced successfully'))
                .catch(error => console.error(error));
        });
}

function compareFiles(file1Path, file2Path) {
    const file1Content = fs.readFileSync(file1Path, 'utf8');
    const file2Content = fs.readFileSync(file2Path, 'utf8');

    if (file1Content === file2Content) {
        console.log('The contents of the two files are the same.');
        return true;
    } else {
        console.log('The contents of the two files are different.');
        return false;
    }
}

function replaceFile(sourceFilePath, destinationFilePath) {
    fs.readFile(sourceFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading source file: ${err}`);
            return;
        }

        fs.writeFile(destinationFilePath, data, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to destination file: ${err}`);
                return;
            }
            console.log(`File replaced successfully from ${sourceFilePath} to ${destinationFilePath}`);
        });
    });
}

module.exports= {findRowAndReplaceDataInCSV, compareFiles, replaceFile}