// Skapa enkla jingle-ljud med Web Audio API
// Detta är en temporär lösning tills du hittar riktiga ljudfiler

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createJingle(frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Exportera funktioner för att spela olika ljud
window.playJingle1 = () => {
    // Glad "pling" ljud
    createJingle(523.25, 0.2); // C5
    setTimeout(() => createJingle(659.25, 0.3), 100); // E5
};

window.playJingle2 = () => {
    // Djupare "boink" ljud
    createJingle(261.63, 0.15, 'square'); // C4
    setTimeout(() => createJingle(329.63, 0.25, 'square'), 80); // E4
};

window.playJingle3 = () => {
    // Högre "ting" ljud
    createJingle(783.99, 0.15); // G5
    setTimeout(() => createJingle(1046.50, 0.2), 100); // C6
    setTimeout(() => createJingle(1318.51, 0.25), 200); // E6
};

window.playJingle4 = () => {
    // Lekfull "bloom" ljud
    createJingle(440.00, 0.15, 'triangle'); // A4
    setTimeout(() => createJingle(554.37, 0.15, 'triangle'), 100); // C#5
    setTimeout(() => createJingle(659.25, 0.25, 'triangle'), 200); // E5
};
