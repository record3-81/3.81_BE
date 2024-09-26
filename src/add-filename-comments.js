// add-filename-comments.js
const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

function addFilenameComment(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error('Error stating file.', error);
          return;
        }

        if (stat.isFile()) {
          const extension = path.extname(filePath);
          const commentSyntax = extension === '.ts' || '.js' ? '// ' : '# ';
          fs.readFile(filePath, 'utf8', (readErr, data) => {
            if (readErr) {
              console.error('Error reading file.', readErr);
              return;
            }

            if (!data.startsWith(commentSyntax + path.basename(filePath))) {
              const fileNameComment = `${commentSyntax}${path.basename(filePath)}\n`;
              const updatedData = fileNameComment + data;

              fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
                if (writeErr) {
                  console.error('Error writing file.', writeErr);
                } else {
                  console.log(`Added filename comment to ${filePath}`);
                }
              });
            }
          });
        } else if (stat.isDirectory()) {
          addFilenameComment(filePath);
        }
      });
    });
  });
}

addFilenameComment(directoryPath);
