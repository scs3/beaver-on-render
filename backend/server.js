const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/beaver', async (req, res) => {
  try {
    const response = await fetch('https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/beaver.htm');
    const html = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
