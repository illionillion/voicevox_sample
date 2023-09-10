import fetch from "node-fetch";
import fs from "fs"

const text = "おはようございます"
const res = await fetch(`http://127.0.0.1:50021/audio_query?text=${text}&speaker=0`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }

})

const query = await res.json()

const sound_row = await fetch(`http://127.0.0.1:50021/synthesis?speaker=0&enable_interrogative_upspeak=true`, {
  method: "POST",
  headers: { 
    'Content-Type': 'application/json',
    'accept': 'audio/wav',
    'responseType': "stream"
   },
   body: JSON.stringify(query)
})

const dest = fs.createWriteStream("stream.wav");
sound_row.body.pipe(dest)