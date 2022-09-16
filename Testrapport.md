# Testrapport
Modulen har testats genom manuella tester vilket redovisas i den här rapporten. Ingra krav finns kopplade till testen.

# Översikt
## **Klass ElectricityRatesProvider - index.js**
| Metod | Status |
| ----------- | ----------- |
| getHourlyPricesAllBiddingZones() | ✅ |
| getHourlyPricesForOneBiddingZone() | ✅ |
| #extractStartTimeFromDate() | ✅ |
| sortHoursPerHighestPrice() | ✅ |
| sortHoursPerLowestPrice() | ✅ |
| calculateWattToKilowatt() | ✅ |
| calculateKilowattToMegawatt() | ✅ |
| calculateConsumedWattToWattHours() | ✅ |
| calculateCostPerDayForProduct() | ✅ |
| #removeDecimalsInNumber() | ✅ |

---

## **Klass SpotPriceApi - spotPriceApi.js**
| Metod | Status |
| ----------- | ----------- |
| #getTomorrowsElectricityData() | ✅ |
| #getTomorrowsDate() | ✅ |
| #convertToCorrectDateFormat() | ✅ |
| #getTomorrowsElectricityData() | ✅ |
| #extractElectricityPricesAndZones() | ✅ |
| #convertStringToNumber() | ✅ |
| #removeDecimalsInNumber() | ✅ |
| #divideNumberWithTen() | ✅ |

## **validateInputHander.js**
| Metod | Status |
| ----------- | ----------- |
| validateIfValidZone() | ✅ |
| validateIfNumber() | ✅ |

