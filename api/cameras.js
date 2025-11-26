export default async function handler(req, res) {
  const { city } = req.query;

  const SOURCES = {
    dfw: "https://its.ntta.org/TrafficCameras.json",
    corpus: "https://traffic.cctexas.com/cameras.json",
    elpaso: "https://traffic.transvista.net/api/cameras",
  };

  if (!SOURCES[city]) {
    return res.status(400).json({ error: "Invalid city parameter" });
  }

  try {
    const response = await fetch(SOURCES[city], {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json,*/*",
      },
    });

    const data = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
