// script-processor.js

class ScriptProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    // エコーのパラメータ
    this.echoDelay = 0.5; // エコーの遅延時間（秒）
    this.echoGain = 0.4; // エコーの音量調整
    this.sampleRate = sampleRate;
    this.delaySamples = Math.floor(this.sampleRate * this.echoDelay);
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    const inputData = input[0];
    const outputData = output[0];

    for (let channel = 0; channel < input.length; ++channel) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let i = 0; i < inputChannel.length; ++i) {
        const echoIndex = i - this.delaySamples;
        outputChannel[i] = inputChannel[i] + (echoIndex >= 0 ? inputChannel[echoIndex] * this.echoGain : 0);
      }
    }

    return true;
  }
}

registerProcessor('script-processor', ScriptProcessor);
