# Testspecifikation
## **BESKRIVNING**
Modulen har testats genom manuella tester vilket redovisas i den här rapporten. Inga krav finns kopplade till testen. Samtliga tester som genomförts avser modulversion 1.0.0. Vid eventuella frågor kring installationen eller hur modulen fungerar så hänvisas läsaren till i README.md. Varje metod har testats manuellt och metoderna har körts via testModule.js och utfallet har dokumenterats nedan. <br>
## **FÖRKRAV**
En förutsättning för att nedanstående testfall ska kunnat genomförats korrekt och ge ett korrekt utfall är att samtliga privata metoder som återfinns i spotPriceApi.js är korrekta. Därav finns inga egna testfall över de metoder utan deras status ingår i TF 1.


## **ÖVERSIKT**

### **Klass ElectricityRatesProvider - index.js**
| Metod | Status | Testfall |
| ----------- | ----------- | ----------- |
| getHourlyPricesAllBiddingZones() | ✅ | TF 1 |
| getHourlyPricesForOneBiddingZone() | ✅ | TF 2 |
| #extractStartTimeFromDate() | ✅ | TF 2 |
| sortHoursPerHighestPrice() | ✅ | TF 3 |
| sortHoursPerLowestPrice() | ✅ | TF 4 |
| calculatePropaneKilowattPrice() | ✅ | TF 5 |
| getHoursWhenPropaneIsCheaper() | ✅ | TF 5 |
| #dividePropanePriceWithKilogram() | ✅ | TF 5 |
| #convertCrownsToPennies() | ✅ | TF 5 |
| calculateWattToKilowatt() | ✅ | TF 6 |
| calculateKilowattToMegawatt() | ✅ | TF 7 |
| calculateConsumedWattToWattHours() | ✅ | TF 8 |
| calculateCostPerDayForProduct() | ✅ | TF 9 |
| #roundDecimalsInNumber() | ✅ | TF 10 |

---

### **Klass SpotPriceApi - spotPriceApi.js**
| Metod | Status | Testfall |
| ----------- | ----------- | ----------- |
| getTomorrowsElectricityData() | ✅ | TF 1 |
| #getTomorrowsDate() | ✅ | TF 1 |
| #convertToCorrectDateFormat() | ✅ | TF 1 |
| #getDayAheadData() | ✅ | TF 1 |
| #extractElectricityPricesAndZones() | ✅ | TF 1 |
| #convertStringToNumber() | ✅ | TF 1
| #divideNumberWithTen() | ✅ | TF 1

---

### **Klass ValidateInputHandler - validateInputHander.js**
| Metod | Status | Testfall |
| ----------- | ----------- | ----------- |
| validateIfValidZone() | ✅ | TF 11 |
| validateIfNumber() | ✅ | TF 12 |

<br>

# Testfall
Öppna upp ett test för att ta del av utfallet
<details>
<summary>
<b>TF 1. Hämta timpriser för alla zoner</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 2 ST.</b>
<br>

1) Morgondagens timpriser för alla zoner kan hämtas efter kl 13 dagen innan. Del av utfall: <br>

![Testutfall](./images/spotPricesZones.png)

<br>
2) Hämtas morgondagens timpriser innan kl 13 dagen innan så sätts priset till 0. Del av utfall:<br>

![Testutfall](./images/AllZonesPriceZero.png)

---

</details>
<details>
<summary>
<b>TF 2. Hämta timpriser för en specifik zon</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 2 ST.</b>
<br>
1) Morgondagens timpriser för en specifik zon kan hämtas efter kl 13 dagen innan. Klockslaget ska även vara extraherat ur datumet och presenteras för användaren. <br>

![Testutfall](./images/spotPricesOneZone.png)
<br>
2. Hämtas morgondagens timpriser innan kl 13 dagen innan så sätts priset till 0. Bilden visar ett utdrag av utfallet.<br>

![Testutfall](./images/OneZonePriceZero.png)

---
</details>
<details>
<summary>
<b>TF 3. Sortera timpriset från högt till lågt</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 1 ST.</b>
<br>
1) Efter att morgondagens timpriser har hämtats så kan en specifik zon sorteras från högsta pris till lägsta. Utfall:<br>

![Testutfall](./images/SortHighest.png)

---
</details>
<details>
<summary>
<b>TF 4. Sortera timpriset från lågt till högt</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 1 ST.</b>
<br>
1) Efter att morgondagens timpriser har hämtats så kan en specifik zon sorteras från lägsta pris till högsta. Utfall:<br>

![Testutfall](./images/SortLowest.png)

---
</details>
<details>
<summary>
<b>TF 5. Räkna ut vilka timmar det är mer fördelaktigt att använda gasol</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 2 ST.</b>
<br>
1) Först räknas gasolens kilowattpris fram. Detta fås fram genom att ta gasolpriset delat på x-antal kg gasol vilket då ger ett kilopris. 
Ett kg gasol genererar 12.8 kwh och genom att ta det framräknade kilopriset delat på 12.8 så får vi fram priset per kilowatt. Priset omvandlas sedan till svenska ören. I testet sätts gasolpriset till 225:- och vikten till 11 kg. Detta ger ett kilowattpris, i ören, på 159.8. <br><br>

Kilopriset uträknat<br>
![Testutfall](./images/DividedPriceWithKg.png)<br>
Omvandlar kronor till ören.<br>
![Testutfall](./images/CrownsToPennies.png)<br>
Beräknat kilowatt pris<br>
![Testutfall](./images/PropanePricePerKwh.png)

2) Vidare används ovanstående kilowattpris till att jämföra under vilka timmar i en specifik zon det är mest fördelaktigt att använda gasol jämfört mot elektricitet. De timmar då elpriset per kilowatt är högre än gasolens pris per kilwatt filtreras ut och presenteras.

![Testutfall](./images/HoursPropaneIsCheaper.png)

---
</details>
<details>
<summary>
<b>TF 6. Konvertera watt till kilowatt</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 1 ST.</b>
<br>
1) För att konvertera watt till kilowatt så används formeln P(kW) = P(W) / 1000. Således så ska värdet 100 som skickas in till metoden resultera i värdet 0.1. 
Utfall:

![Testutfall](./images/wattToKilowatt.png)
</details>
<details>
<summary>
<b>TF 7. Konvertera kilowatt till megawatt</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 1 ST.</b>
<br>
1) För att konvertera kilowatt till megawatt så används formeln P(MW) = P(kW) / 1000. Således så ska värdet 5 som skickas in till metoden resultera i värdet 0.005. 
Utfall:

![Testutfall](./images/kilowattToMegawatt.png)
</details>
<details>
<summary>
<b>TF 8. Konvertera watt till wattimmar</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 1 ST.</b>
<br>
1) För att konvertera watt till wattimmar så används formeln W X h = Wh. Således så ska värdet (100, 24) som skickas in resultera i värdet 2400.<br>Utfall:

![Testutfall](./images/covertedWatt.png)
</details>
<details>
<summary>
<b>TF 9. Kalkylera kostnad per dag för en produkt</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 1 ST.</b>
<br>
1) För att räkna ut hur mycket en apparat kostar per dag så används formeln (kwh * timmar * pris). Således så ska värdet (100, 24, 125.00) som skickas in resultera i värdet 300, värdet avser ören.<br>Utfall:

![Testutfall](./images/DailyDeviceUsageCost.png)
<br>
</details>
<details>
<summary>
<b>TF 10. Avrunda decimaler i ett värde</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 1 ST.</b>
<br>
1) Ett värde som innehåller decimaler ska returneras med maximalt två decimaler.
<br>Utfall:

![Testutfall](./images/removedDecimal.png)
</details>
<details>
<summary>
<b>TF 11. Validera vald zon</b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 2 ST.</b><br>
Valideringen sker mot ett enum/objekt som består av Sveriges fyra elområden.<br>

![Testutfall](./images/EnumZone.png)<br>
1) Kontroll görs att korrekt zon, oavsett om den matas in med gemener eller versaler, hanteras som true.
<br>Utfall:

![Testutfall](./images/ValidZone.png)<br>
2) Kontroll görs att en felaktig zon kastar ett fel.
<br>Utfall:

![Testutfall](./images/ZonedoesntExists.png)<br>
</details>
<details>
<summary>
<b>TF 12. Validera datatyp Number </b>
</summary>
<br>
<b>TESTADE SCENARION, TOTAL 2 ST.</b><br>

1) Kontroll görs att en array som enbart består av datatyp Number returneras som true. 
<br>Utfall:

![Testutfall](./images/ValidateNumbers.png)<br>
![Testutfall](./images/ArrayContainsOnlyNumbers.png)<br>
2) Kontroll görs att en array som inte innehåller enbart datatyp Number kastar ett fel
<br>Utfall:

![Testutfall](./images/ValidateNumbersWithString.png)<br>
![Testutfall](./images/ErrorNumbers.png)<br>
</details>
<br>

---