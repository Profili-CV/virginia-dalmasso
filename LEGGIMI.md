# Sito di Virginia Dalmasso

## Come metterlo online con GitHub Pages

Il sito sta nell'organizzazione GitHub **Profili-CV**.

1. Su github.com/Profili-CV clicca **New repository**, nome **virginia-dalmasso**, **Public**, poi **Create repository**.
2. Clicca **uploading an existing file** (o **Add file › Upload files**) e trascina tutto il CONTENUTO di questa cartella (index.html, style.css, script.js, il PDF del CV e la cartella img), non la cartella stessa. Poi **Commit changes**.
3. Vai in **Settings › Pages**: Source **Deploy from a branch**, branch **main**, cartella **/ (root)**, **Save**.
4. Dopo un paio di minuti il sito è online su https://profili-cv.github.io/virginia-dalmasso/

Per aggiornarlo in futuro: **Add file › Upload files** e carica i file modificati, con lo stesso nome; sostituiscono i vecchi.

## Immagini

Ogni riquadro rosa mostra il nome del file che aspetta. Salva l'immagine nella cartella `img` con quel nome esatto e compare al posto del riquadro.

| File | Dove compare |
|---|---|
| img/chicom.jpg | CHICOM (orizzontale, 16:10) |
| img/olivetti.jpg | Olivetti (4:3) |
| img/momento.jpg | Momento (4:3) |
| img/fts.jpg | Sito F.T.S. (4:3) |
| img/fluid.jpg | FLUID* con WOVO (orizzontale, 16:10) |
| img/ritratto.jpg | Chi sono |

Esporta le immagini a 1600 px di lato lungo, JPG qualità 80.

## Testi da completare

Per Olivetti e Momento, e per l'anno del sito F.T.S., ci sono dei testi tra parentesi quadre, in rosa: vanno sostituiti con tipo di progetto, anno e due righe di descrizione.
La traduzione inglese di ogni testo sta nell'attributo `data-en` dello stesso elemento: se cambi una frase, aggiorna anche quella.
