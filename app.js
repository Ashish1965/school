const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Middleware to parse JSON

// Route setup
app.use('/api', schoolRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
