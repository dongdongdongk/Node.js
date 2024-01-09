const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const dogsRoutes = require('./routes/dogs');

// app.use('/',shelterRoutes);

app.use('shelters',shelterRoutes) // �������� request mapping �ϰ� ����ϴ� 
app.use('dogs',dogsRoutes)



app.listen(3000, () => {
    console.log('Server---3000')
})