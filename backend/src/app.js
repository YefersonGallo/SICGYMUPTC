const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.use('/public', express.static(`${__dirname}/images`))

app.use('/api/admins', require('./routes/admins'));
app.use('/api/gyms', require('./routes/gyms'));
app.use('/api/adminlogin', require('./routes/loginAdmin'));
app.use('/api/userlogin', require('./routes/loginUser'));
app.use('/api/trainerlogin', require('./routes/loginTrainer'));
app.use('/api/gymTrainer', require('./routes/gymsTrainers'));
app.use('/api/routines', require('./routes/routines'));
app.use('/api/trainers', require('./routes/trainers'));
app.use('/api/users', require('./routes/users'));

module.exports = app;