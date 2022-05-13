const fs = require('fs/promises');

exports.seed = () =>  {

    console.log(__dirname)
    fs.copyFile(`${__dirname}/test-seed-data.json`, `${__dirname}/test/data.json`)
        .catch((err) => {
            console.log(`Failed to seed data, error: ${err}`);
        });
}
