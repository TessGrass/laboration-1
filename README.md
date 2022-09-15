# Energy Price Module

The main goal of this module is to extract the day ahead prices for Sweden's bidding zones, SE1 - SE4. The data being recieved comes from Nord Pool which runs the leading power market in Europe. The prices are available  from 1pm the day before.

---

## **Motivation**
With today's electricity market in mind, this module was created as a tool for users who want to get tomorrow's hourly electricity prices. Furthermore, data retrieved can be used to, for example, optimize the use of electricity in homes and/or present the data in various applications.

---

## **Code Style**
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

---

## **Dependencies**
```node-fetch```
 A light-weight module that brings Fetch API to node.js

---

## **Installation**
Use the package manager npm to install the module and it's dependencies.
```bash
npm install
```
---

## **Overview**

```
Laboration 1  
│
└───Energy-price-module/
│   │
│   └───src/
│       │   energyData.js
│       │   index.js
│       │   validateInputHandler.js
│   
│   package.json
│   package-lock.json
│   README.md
│   testModule.js
│   Testrapport.md
```
---

## **How To Use In Your Project**
* The file index.js is a public class which and contains all methods you can use.
* The energyData.js is a private class and handles the fetch.
* The validateInputHandler.js validates all inputs from a user and ensures that the entered value is correct.
* The testModule.js is a way for a developer to try out the module and it's methods right-away!


### **How to run the application**
To run the testModule.js just open the terminal and type
```
node testModule.js
```
or open package.json and add
```
"start": "node testModule.js",
```
and then run the command
```
npm start
```
---

### All available methods and what they return
```javascript
'# returns kilowatt'
dayAheadElectricityPrices.calculateWattToKilowatt(watt)

'# returns megawatt'
dayAheadElectricityPrices.calculateKiloWattToMegaWatt(kilowatt)

'# returns watt hours'
dayAheadElectricityPrices.calculateConsumedWattToWattHours(watt, hours)

'# returns the daily cost of running a device'
dayAheadElectricityPrices.calculateCostPerDayForProduct(watt, pricePerKilowatt, hoursRunning)

'# returns day ahead prices for all bidding zones'
dayAheadElectricityPrices.getHourlyPricesAllBiddingZones()

'# returns the prices for a specific zone, sorted from highest to lowest'
dayAheadElectricityPrices.sortHoursPerHighestPrice(zone)

'# returns the prices for a specific zone, sorted from lowest to highest'
dayAheadElectricityPrices.sortHoursPerLowestPrice(zone)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)