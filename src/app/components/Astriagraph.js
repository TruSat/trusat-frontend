import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Astriagraph() {
  const [tles, setTles] = useState([]);

  useEffect(() => {
    axios
      // TODO
      // Perhaps this will become a POST request so that we can re-render the visual when user changes the catalog filter
      .get(`https://api.consensys.space:8080/tle`)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }, []);

  return <div>This is the Astriagraph visual</div>;
}

// TODO
// reasses this data structure after examining what data Astriagraph tool expects
const data = {
  tles: [
    {
      name: "ATLAS CENTAUR 2",
      1: "00694U 63047A   19233.90264505  .00000307  00000-0  28948-4 0  9993",
      2: "00694  30.3553 105.5304 0586089  97.4022 269.3525 14.02496249794876"
    },
    {
      name: "THOR AGENA D R/B",
      1: "00733U 64002A   19233.61326856 -.00000021  00000-0  10035-4 0  9997",
      2: "00733  99.0503 107.8043 0034427  29.1861 331.1236 14.32364970895753"
    },
    {
      name: "SL-3 R/B",
      1: "00877U 64053B   19233.94930282 -.00000090  00000-0  65180-5 0  9990",
      2: "00877  65.0782 127.0861 0062243 172.9668 187.2320 14.59368946917648"
    }
  ]
};
