## MediBloc Javascript library sample project
This project is supported by [medjs] (https://github.com/medibloc/medjs), [phr-js] (https://github.com/medibloc/phr-js) using the Javascript library

The hospital will show you how to access [Panacea (MediBloc Block Chain)] (https://github.com/medibloc/go-medibloc) and certify the data.

### install
`` `bash
npm install
`` `

### Execution
`` `bash
npm start
`` `

### Explanation
The hospital must implement the functions belonging to the Hospital class in the src / hospital.js file in order to use the Medi block block chain to perform data proofs.

The run function in the src / index.js file describes the order in which the hospital, MediBloc, and the user (patient) exchange data.

If the hospital implements the functions of the Hospital class, MediBloc and the user (patient) can perform the proof of the truth of the data by writing the data to the block body in the manner shown in the src / index.js file and then passing the data to the hospital.