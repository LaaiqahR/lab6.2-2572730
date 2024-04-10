const {app}=require('@azure/functions');
const fs=require('fs/promises');
const path=require('path');

app.http('addCars', {
    methods:['POST'],
    authLevel:'anonymous',

    handler:async (request, context) => {
        const carsInfo= await fs.readFile(path.resolve(__dirname, 'cars.json'));
        const newCar= await request.json();
        const details= JSON.parse(carsInfo);
    

        details.push(newCar);

        await fs.writeFile(path.resolve(__dirname, 'cars.json'), JSON.stringify(details, null, 2));
        return {
            body:JSON.stringify(details)
        };
    }
});