export async function getMicrophoneStream(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 16000,
      },
    });

    return stream;
  } catch (err) {
    console.error("Error accessing microphone:", err);
    throw new Error(
      "Microphone access denied or not available. Please check permissions."
    );
  }
}
