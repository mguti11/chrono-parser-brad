const express = require('express');
const app = express();

app.use(express.json());

app.post('/parse', (req, res) => {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'Missing transcript' });

  const attendance = parseAttendance(transcript);
  const vipInterest = parseVipInterest(transcript);

  return res.status(200).json({ attendance, vipInterest });
});

function parseAttendance(text) {
  const lower = text.toLowerCase();

  if (lower.includes("attendance: confirmed they would attend")) return "Yes";
  if (lower.includes("attendance: won't be able to attend")) return "No";
  if (lower.includes("attendance: unclear")) return "Maybe";

  return "Unknown";
}

function parseVipInterest(text) {
  const lower = text.toLowerCase();

  if (lower.includes("vip interest: expressed interest in vip")) return "Yes";
  if (lower.includes("vip interest: not interested in vip")) return "No";
  if (lower.includes("vip interest: not discussed")) return "No";

  return "Unknown";
}

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Attendance & VIP Parser is working! Use POST /parse');
});

app.listen(PORT, () => {
  console.log(`Parser running on port ${PORT}`);
});
