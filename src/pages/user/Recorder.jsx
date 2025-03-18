import React, { useState, useRef } from "react";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };

    audioChunks.current = [];
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Audio Recorder</h2>
      <div className="flex gap-4">
        {recording ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={startRecording}
          >
            Start Recording
          </button>
        )}
      </div>
      {audioURL && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-medium mb-2">Recorded Audio:</h3>
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default Recorder;
