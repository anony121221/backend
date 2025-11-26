import fetch from "node-fetch";

export default async function handler(req, res) {
  const { city } = req.query;

  const SOURCES = {
    dfw: "https://its.ntta.org/TrafficCameras.json",
    corpus: "https://traffic.cctexas.com/cameras.json",
    elpaso: "https://traffic.transvista.net/api/cameras",
  };

  if (!SOURCES[city]) {
    return res.status(400).json({ error: "Invalid or missing city parameter" });
  }

  try {
    const targetURL = SOURCES[city];

    const response = await fetch(targetURL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json,*/*",
        Connection: "keep-alive",
      },
    });

    const data = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Proxy fetch failed",
    });
  }
}
