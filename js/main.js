// Vänta tills DOM:en är laddad
document.addEventListener('DOMContentLoaded', function() {
    const fishes = document.querySelectorAll('.fish');
    const audioPlayer = document.getElementById('audioPlayer');
    const pond = document.querySelector('.pond');
    
    // Web Audio API för fallback-ljud
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
    
    // Olika jingle-ljud för varje fisk
    const jingleFunctions = {
        'assets/sounds/jingle1.mp3': () => {
            createJingle(523.25, 0.2);
            setTimeout(() => createJingle(659.25, 0.3), 100);
        },
        'assets/sounds/jingle2.mp3': () => {
            createJingle(261.63, 0.15, 'square');
            setTimeout(() => createJingle(329.63, 0.25, 'square'), 80);
        },
        'assets/sounds/jingle3.mp3': () => {
            createJingle(783.99, 0.15);
            setTimeout(() => createJingle(1046.50, 0.2), 100);
            setTimeout(() => createJingle(1318.51, 0.25), 200);
        },
        'assets/sounds/jingle4.mp3': () => {
            createJingle(440.00, 0.15, 'triangle');
            setTimeout(() => createJingle(554.37, 0.15, 'triangle'), 100);
            setTimeout(() => createJingle(659.25, 0.25, 'triangle'), 200);
        }
    };
    

    
    // Lägg till event listeners för varje fisk
    fishes.forEach(fish => {
        // Click effekt
        fish.addEventListener('click', function() {
            // Spela ljud
            const soundFile = this.dataset.sound;
            if (soundFile) {
                audioPlayer.src = soundFile;
                audioPlayer.play().catch(error => {
                    console.log('MP3-fil finns inte, använder genererat ljud');
                    // Om MP3-filen saknas, använd Web Audio API fallback
                    if (jingleFunctions[soundFile]) {
                        jingleFunctions[soundFile]();
                    }
                });
            }
        });
    });
    
    // Logga att sidan är redo
    console.log('Fiskdam är redo! Klicka på fiskarna för att interagera.');
    console.log('Tips: Lägg till riktiga MP3-filer i assets/sounds/ för bättre ljudkvalitet.');
});
