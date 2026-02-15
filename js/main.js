// Vänta tills DOM:en är laddad
document.addEventListener('DOMContentLoaded', function() {
    const fishes = document.querySelectorAll('.fish');
    const audioPlayer = document.getElementById('audioPlayer');
    const pond = document.querySelector('.pond');
    const musicToggle = document.getElementById('musicToggle');
    
    // Web Audio API för fallback-ljud
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Bakgrundsmusik och ljud
    let backgroundMusicPlaying = false;
    let ambientOscillators = [];
    
    // Skapa ambient vattenljud
    function createAmbientSound() {
        // Låg grundton för vatten
        const bass = audioContext.createOscillator();
        const bassGain = audioContext.createGain();
        bass.connect(bassGain);
        bassGain.connect(audioContext.destination);
        bass.frequency.value = 80 + Math.random() * 20;
        bass.type = 'sine';
        bassGain.gain.value = 0.03;
        
        // Mjuka bubbelljud
        const bubble = audioContext.createOscillator();
        const bubbleGain = audioContext.createGain();
        bubble.connect(bubbleGain);
        bubbleGain.connect(audioContext.destination);
        bubble.frequency.value = 200 + Math.random() * 400;
        bubble.type = 'sine';
        bubbleGain.gain.value = 0.01;
        
        // Högfrekvent "glitter" ljud
        const shimmer = audioContext.createOscillator();
        const shimmerGain = audioContext.createGain();
        shimmer.connect(shimmerGain);
        shimmerGain.connect(audioContext.destination);
        shimmer.frequency.value = 1000 + Math.random() * 1000;
        shimmer.type = 'triangle';
        shimmerGain.gain.value = 0.005;
        
        return [
            { osc: bass, gain: bassGain },
            { osc: bubble, gain: bubbleGain },
            { osc: shimmer, gain: shimmerGain }
        ];
    }
    
    // Starta bakgrundsmusik
    function startBackgroundMusic() {
        if (backgroundMusicPlaying) return;
        
        // Skapa flera lager av ambient ljud
        for (let i = 0; i < 3; i++) {
            const sounds = createAmbientSound();
            sounds.forEach(({ osc, gain }) => {
                osc.start();
                ambientOscillators.push({ osc, gain });
                
                // Variera volymen över tid
                setInterval(() => {
                    const targetVolume = gain.gain.value * (0.8 + Math.random() * 0.4);
                    gain.gain.linearRampToValueAtTime(targetVolume, audioContext.currentTime + 2);
                }, 3000 + Math.random() * 2000);
            });
        }
        
        backgroundMusicPlaying = true;
        musicToggle.textContent = '🎵 Musik På';
        musicToggle.classList.add('playing');
    }
    
    // Stoppa bakgrundsmusik
    function stopBackgroundMusic() {
        ambientOscillators.forEach(({ osc, gain }) => {
            gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
            setTimeout(() => osc.stop(), 500);
        });
        ambientOscillators = [];
        backgroundMusicPlaying = false;
        musicToggle.textContent = '🎵 Starta Musik';
        musicToggle.classList.remove('playing');
    }
    
    // Toggle musik
    musicToggle.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        if (backgroundMusicPlaying) {
            stopBackgroundMusic();
        } else {
            startBackgroundMusic();
        }
    });
    
    // Ploppljud för bubblor
    function playBubbleSound() {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = 300 + Math.random() * 200;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.02, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.3);
    }
    
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
    
    // Funktion för att skapa bubblor
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 2 + 2) + 's';
        bubble.style.width = bubble.style.height = (Math.random() * 15 + 10) + 'px';
        pond.appendChild(bubble);
        
        // Spela ploppljud ibland
        if (Math.random() > 0.7 && backgroundMusicPlaying) {
            playBubbleSound();
        }
        
        // Ta bort bubblan efter animationen
        setTimeout(() => {
            bubble.remove();
        }, 4000);
    }
    
    // Skapa bubblor med jämna mellanrum
    setInterval(createBubble, 1500);
    
    // Lägg till event listeners för varje fisk
    fishes.forEach(fish => {
        // Hover effekt
        fish.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            
            // Ta bort klassen efter animationen
            setTimeout(() => {
                this.classList.remove('hovered');
            }, 500);
        });
        
        // Click effekt
        fish.addEventListener('click', function() {
            // Lägg till animation klass
            this.classList.add('clicked');
            
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
            
            // Skapa extra bubblor vid klick
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createBubble(), i * 200);
            }
            
            // Ta bort animation klass efter den är klar
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
        });
    });
    
    // Logga att sidan är redo
    console.log('Fiskdam är redo! Klicka på fiskarna för att interagera.');
    console.log('Tips: Lägg till riktiga MP3-filer i assets/sounds/ för bättre ljudkvalitet.');
});
