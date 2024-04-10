const {app}=require('@azure/functions');
const fs=require('fs/promises');
const path=require('path');

app.http('getCars', {
    methods:['GET'],
    authLevel:'anonymous',
    handler:async (request, context) => {
        const carsInfo=await fs.readFile(path.resolve(__dirname, 'cars.json'));
        const details=JSON.parse(carsInfo);
        
        return {
            body:JSON.stringify(details)
        };
    }
});