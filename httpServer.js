'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

//operating system independent when you use __dirname
//put forward or back slash automatiacally
const petsPath = path.join(__dirname, 'pets.json');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  } else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return;
      }

      const pets = JSON.parse(petsJSON);
      const petJSON = JSON.stringify(pets[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }
  ///////
  else if (req.method === 'POST' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return;
      }

      const pets = JSON.parse(petsJSON);
      //////////

      const nameVal = path.basename(process.argv[0]);
      const ageVal = Number.parseInt(process.argv[1]);
      const kindVal = process.argv[2];

      const newPet = {
        name: nameVal,
        age: ageVal,
        kind: kindVal
      };
      console.log(kindVal);
      console.log(nameVal);

      pets.push(newPet);
      const petJSON = JSON.stringify(pets);

      //////////////

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }
  //////
  else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return;
      }

      const pets = JSON.parse(petsJSON);
      const petJSON = JSON.stringify(pets[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;


//Class Solution
// 'use strict';
//
// const fs = require('fs');
// const path = require('path');
// const petsPath = path.join(__dirname, 'pets.json');
//
// const http = require('http');
//
// const server = http.createServer((req, res) => {
//   const petRegExp = /^\/pets\/(.*)$/;
//
//   if (req.method === 'GET' && req.url === '/pets') {
//     fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
//       if (err) {
//         console.error(err.stack);
//
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Internal Server Error');
//
//         return;
//       }
//
//       res.setHeader('Content-Type', 'application/json');
//       res.end(petsJSON);
//     });
//   }
//   else if (req.method === 'GET' && petRegExp.test(req.url)) {
//     fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
//       if (err) {
//         console.error(err.stack);
//
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Internal Server Error');
//
//         return;
//       }
//
//       const pets = JSON.parse(petsJSON);
//
//       const matches = req.url.match(petRegExp);
//       const index = Number.parseInt(matches[1]);
//
//       if (index < 0 || index >= pets.length || Number.isNaN(index)) {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Not Found');
//
//         return;
//       }
//
//       const petJSON = JSON.stringify(pets[index]);
//
//       res.setHeader('Content-Type', 'application/json');
//       res.end(petJSON);
//     });
//   }
//   else if (req.method === 'POST' && req.url === '/pets') {
//     let bodyJSON = '';
//
//     req.on('data', (chunk) => {
//       bodyJSON += chunk.toString();
//     });
//
//     req.on('end', () => {
//       // eslint-disable-next-line max-statements
//       fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
//         if (readErr) {
//           console.error(readErr.stack);
//
//           res.statusCode = 500;
//           res.setHeader('Content-Type', 'text/plain');
//           res.end('Internal Server Error');
//
//           return;
//         }
//
//         const body = JSON.parse(bodyJSON);
//         const pets = JSON.parse(petsJSON);
//         const age = Number.parseInt(body.age);
//         const kind = body.kind;
//         const name = body.name;
//
//         if (Number.isNaN(age) || !kind || !name) {
//           res.statusCode = 400;
//           res.setHeader('Content-Type', 'text/plain');
//           res.end('Bad Request');
//
//           return;
//         }
//
//         const pet = { age, kind, name };
//
//         pets.push(pet);
//
//         const petJSON = JSON.stringify(pet);
//         const newPetsJSON = JSON.stringify(pets);
//
//         fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
//           if (writeErr) {
//             console.error(readErr.stack);
//
//             res.statusCode = 500;
//             res.setHeader('Content-Type', 'text/plain');
//             res.end('Internal Server Error');
//
//             return;
//           }
//
//           res.setHeader('Content-Type', 'application/json');
//           res.end(petJSON);
//         });
//       });
//     });
//   }
//   else {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Not Found');
//   }
// });
//
// const port = process.env.PORT || 8000;
//
// server.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log('Listening on port', port);
// });
//
// module.exports = server;
