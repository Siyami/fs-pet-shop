'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const petIndex = parseInt(process.argv[3]);

    if (petIndex >= 0) {

      console.log(pets[petIndex]);
    } else {

      console.log(pets);
    }

  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const pets = JSON.parse(data);
    const petAge = parseInt(process.argv[3]);
    const petKind = process.argv[4];
    const petName = process.argv[5];
    const newPet = {
      age: petAge,
      kind: petKind,
      name: petName
    };

    if (cmd === 'create' && !petAge && !petKind && !petName) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (cmd === 'create' && petAge && !petKind && !petName) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (cmd === 'create' && petAge && petKind && !petName) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (petAge && petKind && petName) {
      pets.push(newPet);
    }

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }

      console.log(newPet);
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}


//Class Solution
// #!/usr/bin/env node
//
// /* eslint-disable no-console */
//
// 'use strict';
//
// const fs = require('fs');
// const path = require('path');
// const petsPath = path.join(__dirname, 'pets.json');
//
// const node = path.basename(process.argv[0]);
// const file = path.basename(process.argv[1]);
// const cmd = process.argv[2];
//
// if (cmd === 'read') {
//   fs.readFile(petsPath, 'utf8', (err, data) => {
//     if (err) {
//       throw err;
//     }
//
//     const index = Number.parseInt(process.argv[3]);
//     const pets = JSON.parse(data);
//
//     if (Number.isNaN(index)) {
//       console.log(pets);
//       process.exit();
//     }
//
//     if (index < 0 || index >= pets.length) {
//       console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
//       process.exit(1);
//     }
//
//     console.log(pets[index]);
//   });
// }
// else if (cmd === 'create') {
//   fs.readFile(petsPath, 'utf8', (readErr, data) => {
//     if (readErr) {
//       throw readErr;
//     }
//
//     const pets = JSON.parse(data);
//     const age = Number.parseInt(process.argv[3]);
//     const kind = process.argv[4];
//     const name = process.argv[5];
//
//     if (Number.isNaN(age) || !kind || !name) {
//       console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
//       process.exit(1);
//     }
//
//     const pet = { age, kind, name };
//
//     pets.push(pet);
//
//     const petsJSON = JSON.stringify(pets);
//
//     fs.writeFile(petsPath, petsJSON, (writeErr) => {
//       if (writeErr) {
//         throw writeErr;
//       }
//
//       console.log(pet);
//     });
//   });
// }
// else if (cmd === 'update') {
//   // eslint-disable-next-line max-statements
//   fs.readFile(petsPath, 'utf8', (readErr, data) => {
//     if (readErr) {
//       throw readErr;
//     }
//
//     const index = Number.parseInt(process.argv[3]);
//     const pets = JSON.parse(data);
//
//     if (Number.isNaN(index) || index < 0 || index >= pets.length) {
//       console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
//       process.exit(1);
//     }
//
//     const age = Number.parseInt(process.argv[4]);
//     const kind = process.argv[5];
//     const name = process.argv[6];
//
//     if (Number.isNaN(age) || !kind || !name) {
//       console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
//       process.exit(1);
//     }
//
//     const pet = { age, kind, name };
//
//     pets[index] = pet;
//
//     const petsJSON = JSON.stringify(pets);
//
//     fs.writeFile(petsPath, petsJSON, (writeErr) => {
//       if (writeErr) {
//         throw writeErr;
//       }
//
//       console.log(pet);
//     });
//   });
// }
// else if (cmd === 'destroy') {
//   fs.readFile(petsPath, 'utf8', (readErr, data) => {
//     if (readErr) {
//       throw readErr;
//     }
//
//     const index = Number.parseInt(process.argv[3]);
//     const pets = JSON.parse(data);
//
//     if (Number.isNaN(index) || index < 0 || index >= pets.length) {
//       console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
//       process.exit(1);
//     }
//
//     const pet = pets.splice(index, 1)[0];
//     const petsJSON = JSON.stringify(pets);
//
//     fs.writeFile(petsPath, petsJSON, (writeErr) => {
//       if (writeErr) {
//         throw writeErr;
//       }
//
//       console.log(pet);
//     });
//   });
// }
// else {
//   console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
//   process.exit(1);
// }
