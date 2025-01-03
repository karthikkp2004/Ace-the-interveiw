
// const express = require('express');
// const bodyParser = require('body-parser');
// const { exec } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// // Update the path to your public directory
// const pathToPublic = path.join('D:', 'nodejs', 'project', 'public');

// const app = express();
// const PORT = 5001;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(pathToPublic));

// // Serve static files from the 'login' folder
// app.use('/login', express.static(path.join(__dirname, 'login')));

// // Route for the main page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(pathToPublic, 'index.html'));
// });

// // Handle Code Execution
// app.post('/execute', (req, res) => {
//     const { code, input, language } = req.body;  // added 'language' to explicitly determine C or C++

//     // Save code to a temporary file based on user-selected language
//     const fileExtension = language === 'cpp' ? 'cpp' : 'c';
//     const fileName = `temp.${fileExtension}`;
//     fs.writeFileSync(fileName, code);

//     // Compile the code
//     const compileCommand = (fileExtension === 'cpp' ? 'g++' : 'gcc') + ` ${fileName} -o temp`;

//     // Determine execution command based on the platform
//     const executeCommand = process.platform === 'win32' ? 'temp.exe' : './temp';

//     // Compile the C or C++ code
//     exec(compileCommand, (compileError, compileStdout, compileStderr) => {
//         if (compileError) {
//             cleanupTempFiles(fileName);  // Clean up the files after compilation error
//             return res.json({ output: `Compilation Error:\n${compileStderr}` });
//         }

//         // Prepare the execution command
//         const childProcess = exec(executeCommand, { cwd: __dirname, timeout: 10000 }, (runError, stdout, stderr) => {
//             // Cleanup after execution
//             cleanupTempFiles(fileName);

//             if (runError) {
//                 return res.json({ output: `Execution Error:\n${stderr}` });
//             }

//             let output = stdout || stderr;
//             res.json({ output });
//         });

//         // If input is provided, send it to the executable via stdin
//         if (input) {
//             childProcess.stdin.write(input + '\n');
//             childProcess.stdin.end();
//         }
//     });
// });

// // Function to clean up temporary files
// function cleanupTempFiles(fileName) {
//     fs.unlink(fileName, (err) => {
//         if (err) console.log(`Error deleting temp file: ${fileName}`);
//     });
//     fs.unlink('temp.exe', (err) => {
//         if (err) console.log(`Error deleting temp.exe`);
//     });
//     fs.unlink('temp', (err) => {
//         if (err) console.log(`Error deleting temp`);
//     });
// }

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


// 
//----------modified code-----
// const express = require('express');
// const bodyParser = require('body-parser');
// const { exec } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// // Update the path to your public directory
// // const pathToPublic = path.join('C:', 'Desktop','html', 'web_project');
// const pathToPublic = path.join('C:', 'Users' ,'USER' ,'Desktop','html','web_project');

// const app = express();
// const PORT = 5001;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(pathToPublic));

// // Serve static files from the 'login' folder
// // app.use('/login', express.static(path.join(__dirname, 'login')));

// // Route for the main page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(pathToPublic, 'index2.html'));
// });

// // Handle Code Execution
// app.post('/execute', (req, res) => {
//     const { code, input, language } = req.body;

//     // Save code to a temporary file based on user-selected language
//     const fileExtension = language === 'cpp' ? 'cpp' : 'c';
//     const sourceFileName = path.join(__dirname, `temp.${fileExtension}`);
//     const executableFileName = path.join(__dirname, process.platform === 'win32' ? 'temp.exe' : 'temp');
    
//     fs.writeFileSync(sourceFileName, code);

//     // Compile the code
//     const compileCommand = (fileExtension === 'cpp' ? 'g++' : 'gcc') + ` "${sourceFileName}" -o "${executableFileName}"`;

//     exec(compileCommand, (compileError, compileStdout, compileStderr) => {
//         if (compileError) {
//             cleanupTempFiles(sourceFileName, executableFileName);
//             return res.json({ output: `Compilation Error:\n${compileStderr}` });
//         }

//         // Prepare the execution command
//         const executeCommand = process.platform === 'win32'
//             ? `"${executableFileName}"`
//             : `./${path.basename(executableFileName)}`;

//         const childProcess = exec(
//             executeCommand,
//             { cwd: __dirname, timeout: 10000 },
//             (runError, stdout, stderr) => {
//                 cleanupTempFiles(sourceFileName, executableFileName);

//                 if (runError) {
//                     return res.json({ output: `Execution Error:\n${stderr || runError.message}` });
//                 }

//                 res.json({ output: stdout || stderr });
//             }
//         );

//         // If input is provided, send it to the executable via stdin
//         if (input) {
//             childProcess.stdin.write(input + '\n');
//             childProcess.stdin.end();
//         }
//     });
// });

// // Function to clean up temporary files
// function cleanupTempFiles(sourceFileName, executableFileName) {
//     [sourceFileName, executableFileName].forEach((file) => {
//         fs.unlink(file, (err) => {
//             if (err && err.code !== 'ENOENT') {
//                 console.log(`Error deleting file ${file}:`, err.message);
//             }
//         });
//     });
// }

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Update the path to your public directory
const pathToPublic = path.join('C:', 'Users', 'USER', 'Desktop', 'html', 'web_project');

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(pathToPublic));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(pathToPublic, 'index2.html'));
});

// Handle Code Execution
app.post('/execute', (req, res) => {
    const { code, input, language } = req.body;

    // Save code to a temporary file based on user-selected language
    const fileExtension = language === 'cpp' ? 'cpp' : 'c';
    const sourceFileName = path.join(__dirname, `temp.${fileExtension}`);
    const executableFileName = path.join(__dirname, process.platform === 'win32' ? 'temp.exe' : 'temp');
    
    fs.writeFileSync(sourceFileName, code);

    // Compile the code
    const compileCommand = (fileExtension === 'cpp' ? 'g++' : 'gcc') + ` "${sourceFileName}" -o "${executableFileName}"`;

    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
            cleanupTempFiles(sourceFileName, executableFileName);
            return res.json({ output: `Compilation Error:\n${compileStderr}` });
        }

        // Prepare the execution command
        const executeCommand = process.platform === 'win32'
            ? `"${executableFileName}"`
            : `./${path.basename(executableFileName)}`;

        const childProcess = exec(
            executeCommand,
            { cwd: __dirname, timeout: 10000 },
            (runError, stdout, stderr) => {
                cleanupTempFiles(sourceFileName, executableFileName);

                if (runError) {
                    return res.json({ output: `Execution Error:\n${stderr || runError.message}` });
                }

                res.json({ output: stdout || stderr });
            }
        );

        // If input is provided, send it to the executable via stdin
        if (input) {
            childProcess.stdin.write(input + '\n');
            childProcess.stdin.end();
        }
    });
});

// Function to clean up temporary files
function cleanupTempFiles(sourceFileName, executableFileName) {
    [sourceFileName, executableFileName].forEach((file) => {
        fs.unlink(file, (err) => {
            if (err && err.code !== 'ENOENT') {
                console.log(`Error deleting file ${file}:`, err.message);
            }
        });
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

