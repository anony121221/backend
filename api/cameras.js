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
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://its.ntta.org/",
        "Origin": "https://its.ntta.org",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
    });

    if (!response.ok) {
      return res.status(500).json({
        error: `Origin returned HTTP ${response.status}`
      });
    }

    const text = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(text);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
