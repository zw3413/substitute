import React, { useMemo, useState, useEffect  } from "react";
import { Node } from "subtitle";
import { ThemeProvider } from "./hooks/theme";
import { defaultTheme } from "./theme";
import { SubtitlePlayer } from "./components/subtitle_player";
import { TimerProvider, Timer } from "./hooks/timer";
import { LandingPage } from "./components/landing_page";
import { parseSync } from "subtitle";
import { fetchTextFromURL } from './api';

function App() {
  const [subtitles, setSubtitles] = useState<Node[]>();

  // use a new timer instance for every subtitle file
  const timer = useMemo(() => {
    return subtitles ? new Timer() : undefined;
  }, [subtitles]);

  //read subtitle from url
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const url = 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/e19399fbccbc069a2af4266e5120ae6bad62699a/sample.vtt';
      
        const searchParams = new URLSearchParams(window.location.search);
        // Get a specific parameter value
        const id = searchParams.get('id');
        const language = searchParams.get('language');
        const serverAddress = window.location.origin
        var url = serverAddress+'/get_subtitle?id='+id+'&language='+language
  //url = 'http://192.168.1.202:12801/get_subtitle?id=61&language=jpn'
        const text = await fetchTextFromURL(url);
        setSubtitles(parseSync(text))
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      {subtitles ? (
        <TimerProvider value={timer!}>
          <SubtitlePlayer
            close={() => setSubtitles(undefined)}
            subtitles={subtitles}
          />
        </TimerProvider>
      ) : (
        <LandingPage setSubtitles={setSubtitles} />
      )}
    </ThemeProvider>
  );
}

export default App;
