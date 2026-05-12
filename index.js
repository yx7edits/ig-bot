const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'my_secret_2024';

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const messages = req.body?.entry?.[0]?.messaging;
  if (messages) {
    messages.forEach(event => {
      const text = event.message?.text;
      if (text) console.log('رسالة:', text);
    });
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log('شغّال!'));
