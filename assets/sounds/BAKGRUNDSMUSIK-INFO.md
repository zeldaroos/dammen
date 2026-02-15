# Bakgrundsmusik för Fiskdam

## Nuvarande lösning
Jag har skapat ambient vattenljud med Web Audio API som spelar:
- Låg grundton för vattenljud
- Mjuka bubbelljud
- Subtila högfrekventa "glitter" effekter
- Ploppljud när bubblor skapas

## För att lägga till riktig bakgrundsmusik

### Alternativ 1: Gratis bakgrundsmusik
Ladda ner royalty-free musik från dessa källor:

1. **Pixabay Music** (https://pixabay.com/music/)
   - Helt gratis, ingen attribution krävs
   - Sök efter "ambient", "relaxing", "water", "underwater"
   - Ladda ner MP3 format

2. **Incompetech** (https://incompetech.com/music/royalty-free/)
   - Gratis med attribution
   - Stor samling ambient musik
   - Bra för bakgrundsmusik

3. **FreePD** (https://freepd.com/)
   - Public domain musik
   - Ingen attribution krävs

4. **YouTube Audio Library**
   - Gratis musik för kreativt innehåll
   - Filtrera på "Ambient" genre

### Rekommenderade sökord:
- "underwater ambient"
- "aquarium music"
- "peaceful water sounds"
- "ocean ambient"
- "relaxing bubbles"

### Hur man lägger till riktig MP3-fil:

1. Ladda ner en MP3-fil
2. Döp om den till `background-music.mp3`
3. Placera den i `assets/sounds/` mappen
4. Uppdatera `main.js` för att använda filen istället för Web Audio API

### Kodexempel för att använda MP3-fil:
```javascript
const backgroundMusic = new Audio('assets/sounds/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = '🎵 Musik På';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '🎵 Starta Musik';
    }
});
```

### Tips:
- Håll volymen låg (0.2-0.4) så musiken inte överröstar fiskljuden
- Välj lugn, ambient musik som loopar bra
- Filstorlek: försök hålla under 5MB för snabbare laddning
- Längd: 2-5 minuter är bra för looped musik
