const {app}=require('@azure/functions');
const fs=require('fs/promises');
const path=require('path');

app.http('removeCars', {
    methods:['DELETE'],
    authLevel:'anonymous',
    route:'removeCars/{carID}',
    handler:async (request, context) => {
        const carsInfo= await fs.readFile(path.resolve(__dirname, 'cars.json'));
        const carNumber= request.params.carID;
        const details= JSON.parse(carsInfo);

        if (carNumber!=-1) {
            details.splice(carNumber, 1);
            await fs.writeFile(path.resolve(__dirname, 'cars.json'), JSON.stringify(details, null, 2));
            return {
                body:JSON.stringify(details)
            };
        }
        else {
            context.error(404, 'Does not exist');
        }
    }

    
});