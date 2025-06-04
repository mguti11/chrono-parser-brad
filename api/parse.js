export default function handler(req, res) {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'Missing transcript' });

  const attendance = parseAttendance(transcript);
  const vipInterest = parseVipInterest(transcript);

  return res.status(200).json({ attendance, vipInterest });
}

function parseAttendance(text) {
  const lower = text.toLowerCase();
  const yes = ["confirmed they would attend", "will attend", "agreed to attend", "looking forward", "asked for the date", "will be there"];
  const no = ["cannot attend", "won't attend", "declined", "not attending", "can't make it"];
  const maybe = ["not sure", "might attend", "thinking about it", "checking calendar"];

  if (yes.some(p => lower.includes(p))) return "Yes";
  if (no.some(p => lower.includes(p))) return "No";
  if (maybe.some(p => lower.includes(p))) return "Maybe";

  return "Unknown";
}

function parseVipInterest(text) {
  const lower = text.toLowerCase();
  const yes = ["expressed interest in vip", "interested in vip", "asked about vip", "wants to upgrade", "wants vip", "requested an email"];
  const no = ["not interested in vip", "declined vip", "no upgrade", "no interest"];

  if (yes.some(p => lower.includes(p))) return "Yes";
  if (no.some(p => lower.includes(p))) return "No";

  return "Unknown";
}
