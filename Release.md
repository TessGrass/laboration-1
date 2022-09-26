# Mall för inlämning laboration 1, 1dv610
​
## Checklista
  - [x] Jag har skrivit all kod och reflektioner själv. Jag har inte använt mig av andras kod för att lösa uppgiften.
  - [x] Mina testresultat är skrivna utifrån utförd testning ( och inte teoretiskt: "det bör fungera" :) )
  - [x] Koden är objektorienterad
  - [x] Jag har skrivit en modul som riktar sig till programmerare
​
## Egenskattning och mål
  - [ ] Jag är inte klar eftersom jag vet att jag saknar något. (Då skall du inte lämna in! Lämna då istället in på restlaboration.)
  - [x] Jag eftersträvar med denna inlämning godkänt betyg (E-D)
    - [x] De flesta testfall fungerar
    - [x] Koden är förberedd på Återanvändning
    - [x] All kod samt historik finns i git 
    - [x] Kodkvaliterskraven är ifyllda
    - [x] Reflektion är skriven utifrån bokens kapitel 
  - [ ] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta. 
    - [x] Samtliga testfall är skrivna    
    - [ ] Testfall är automatiserade
    - [x] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
    - [x] Kodkvalitetskraven är varierade 
  - [ ] Jag eftersträvar med denna inlämning högsta betyg (A) 
​
Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser. 
​
## Återanvändning
<i>Beskriv hur du anpassat din kod och instruktioner för att någon annan programmerare skall kunna använda din modul. Om du skrivit instruktioner för din användare, länka till dessa. Om inte, beskriv här hur någon skall göra för att använda din modul.</i>

Grundtanken är att användaren ska använda sig av filen index.js som innehåller de publika metoder som jag har valt att göra tillgängliga, dock hänvisar jag
till min [README.md](README.md) där jag detaljerat specificerar hur en annan användare ska använda sig av min modul och hur den fungerar.
​
## Beskrivning av min kod
<i>Beskriv din kod på en hög abstraktionsnivå. En kort beskrivning av dina viktigaste klasser och metoder. Skapa gärna ett klassdiagram som bild. Använd det ni lärt er så här långt i 1dv607. Kommunicera så att jag kan förstå.</i>

![Klassdiagram](./images/Klassdiagram%20-%20Labb1.jpg)

Det är svårt att pinpointa vilka specifika metoder eller klasser som är de viktigaste. Givetvis så är klassen SpotPriceApi spindeln i nätet med sitt API anrop eftersom responsen är kärnan i min modul. Därför kan man med enkelhet argumentera för att den är den allra viktigaste klassen. Dock så ser jag metoderna och klasserna som ett lagspel, även den minsta metoden har betydelse för helheten. Alla metoder bidrar med något som just där och då gör den till den viktigaste kuggen i hjulet. (Jag reflekterar ganska mycket kring min modul i [Reflektion.md](Reflektion.md) så läs gärna där) 
​
## Hur jag testat
<i>Beskriv hur du kommit fram till om din kod fungerar.</i>

Se [Testrapport.md](./test-rapport/Testrapport.md) för att ta del av testresultatet.
​
### Testfall
<i>Lista de enskilda testfallen. **Fetmarkera** sådant som du själv fyllt i. En rad per testfall. Om ni använder vertyg för testning kan ni ha en bild här med testrapporten. Tänk på att kommunicera till mig. Vad fungerar?, vad fungerar inte? Hur är det testat? Vilka delar testas inte? </i>

Se [Testrapport.md](./test-rapport/Testrapport.md) för att ta del av testresultatet.

​
## Kodkvalitetskrav
​
<i>**Fetmarkera** de "regler" som används ur CC. Ni kan frångå tabellformat om ni vill. Skapa direktlänkar till er kod där det är lämpligt. Skriv så att jag kan förstå.</i>

Se [Reflektion.md](Reflektion.md) för reflektioner och kodkvalitékrav.
​

## Laborationsreflektion
<i>Reflektera över uppgiften utifrån ett kodkvalitetsperspektiv. Använd begrepp ifrån boken. </i>

Se [Reflektion.md](Reflektion.md) för reflektioner och kodkvalitékrav.