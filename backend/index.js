const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend from here:
app.use(express.static(path.join(__dirname, '../frontend')));

// Optional: Redirect root URL to signup
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'signup.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  console.log(`\n✅ Server running:\n- Local: http://localhost:${PORT}`);
  Object.values(interfaces).forEach(ifaces =>
    ifaces.forEach(iface => {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`- Network: http://${iface.address}:${PORT}`);
      }
    })
  );
});
