import { useState, useEffect } from "react";

export interface Station {
  name: string;
  url: string;
  tags: string;
  country: string;
  favicon: string;
  votes: number;
  stationuuid: string;
}

const API_SERVERS = [
  "https://de1.api.radio-browser.info",
  "https://nl1.api.radio-browser.info",
  "https://at1.api.radio-browser.info",
];

const FALLBACK_STATIONS: Station[] = [
  { name: "Lofi Girl", url: "https://play.streamafrica.net/lofiradio", tags: "lofi,chillhop", country: "US", favicon: "", votes: 100, stationuuid: "fallback-1" },
  { name: "Chillhop Radio", url: "https://streams.fluxfm.de/Chillhop/mp3-320/streams.fluxfm.de/", tags: "chillhop,lofi", country: "DE", favicon: "", votes: 90, stationuuid: "fallback-2" },
  { name: "Box Lofi", url: "https://boxradio-edge-10.streamafrica.net/lofi", tags: "lofi", country: "US", favicon: "", votes: 80, stationuuid: "fallback-3" },
  { name: "Nightride FM", url: "https://stream.nightride.fm/nightride.m4a", tags: "synthwave,lofi", country: "US", favicon: "", votes: 70, stationuuid: "fallback-4" },
  { name: "Lofi Hip Hop", url: "https://hyades.shoutca.st:8043/stream", tags: "lofi,hip-hop", country: "US", favicon: "", votes: 60, stationuuid: "fallback-5" },
];

export const useStations = () => {
  const [stations, setStations] = useState<Station[]>(FALLBACK_STATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchStations = async () => {
      for (const server of API_SERVERS) {
        try {
          const res = await fetch(
            `${server}/json/stations/search?tag=lofi&limit=50&order=clickcount&reverse=true&hidebroken=true&has_extended_info=false`,
            { headers: { "User-Agent": "LofiRadioApp/1.0" } }
          );
          if (!res.ok) continue;
          const data = await res.json();
          if (cancelled) return;

          const valid = data
            .filter((s: any) => s.url_resolved && s.name)
            .map((s: any) => ({
              name: s.name.trim(),
              url: s.url_resolved,
              tags: s.tags || "",
              country: s.countrycode || "",
              favicon: s.favicon || "",
              votes: s.votes || 0,
              stationuuid: s.stationuuid,
            }));

          if (valid.length > 0) {
            setStations(valid);
          }
          setLoading(false);
          return;
        } catch {
          continue;
        }
      }
      if (!cancelled) setLoading(false);
    };

    fetchStations();
    return () => { cancelled = true; };
  }, []);

  return { stations, loading };
};
