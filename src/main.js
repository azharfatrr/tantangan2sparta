const express = require('express');
const path = require('path');

function main() {
  // Setup express.
  const app = express();
  const port = process.env.SERVER_PORT || 5000;

  // Global Middleware
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // sendFile will go here
  app.get('/', (req, res) => {
    res.send(path.join(__dirname, '/public/index.html'));
  });

  // Catch Endpoint not found.
  app.use((req, res) => {
    res.status(404).send('404: File Not Found');
  });

  // Start listening to port.
  app.listen(port, () => {
    console.log(`Server running on : http://localhost:${port}`);
  });
}

main();