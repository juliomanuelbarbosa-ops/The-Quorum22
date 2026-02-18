export const playSound = (type: 'click' | 'scan' | 'launch' | 'success') => {
  const audio = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = type === 'launch' ? 'sawtooth' : 'sine';
  gain.gain.value = 0.15;

  const filter = audio.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = type === 'scan' ? 1200 : 800;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);

  if (type === 'click') {
    osc.frequency.value = 920;
    osc.start();
    setTimeout(() => osc.stop(), 40);
  } else if (type === 'scan') {
    osc.frequency.value = 440;
    osc.start();
    setTimeout(() => { osc.frequency.value = 660; }, 80);
    setTimeout(() => osc.stop(), 280);
  } else if (type === 'launch') {
    osc.frequency.setValueAtTime(180, audio.currentTime);
    osc.frequency.linearRampToValueAtTime(60, audio.currentTime + 0.8);
    gain.gain.linearRampToValueAtTime(0.001, audio.currentTime + 0.9);
    osc.start();
    osc.stop(audio.currentTime + 1);
  } else {
    osc.frequency.value = 1200;
    osc.start();
    setTimeout(() => osc.stop(), 120);
  }
};
