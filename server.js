const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/beaver', async (req, res) => {
  try {
    const response = await fetch('https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/beaver.htm');
    const text = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
