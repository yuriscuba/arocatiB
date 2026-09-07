import { UnitSystem } from '../types';

/**
 * Diving Unit Conversion Utilities
 * Handles metric (m, °C, kg, bar) and imperial (ft, °F, lbs, psi) transformations.
 */

export const M_TO_FT = 3.28084;
export const KG_TO_LBS = 2.20462;
export const BAR_TO_PSI = 14.5038;

// Depth conversions
export function metersToFeet(meters: number): number {
  return Math.round(meters * M_TO_FT * 10) / 10;
}

export function feetToMeters(feet: number): number {
  return Math.round((feet / M_TO_FT) * 10) / 10;
}

// Temperature conversions
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round((((fahrenheit - 32) * 5) / 9) * 10) / 10;
}

// Weight (ballast) conversions
export function kgToLbs(kg: number): number {
  return Math.round(kg * KG_TO_LBS * 10) / 10;
}

export function lbsToKg(lbs: number): number {
  return Math.round((lbs / KG_TO_LBS) * 10) / 10;
}

// Tank pressure conversions
export function barToPsi(bar: number): number {
  return Math.round(bar * BAR_TO_PSI);
}

export function psiToBar(psi: number): number {
  return Math.round(psi / BAR_TO_PSI);
}

// Formatter Helpers
export function formatDepth(meters: number, system: UnitSystem): { value: number; display: string; unit: string } {
  if (system === 'imperial') {
    const ft = metersToFeet(meters);
    return {
      value: ft,
      display: `${ft}`,
      unit: 'ft',
    };
  }
  return {
    value: meters,
    display: `${meters}`,
    unit: 'm',
  };
}

export function formatTemperature(celsius: number, system: UnitSystem): { value: number; display: string; unit: string } {
  if (system === 'imperial') {
    const f = celsiusToFahrenheit(celsius);
    return {
      value: f,
      display: `${f}`,
      unit: '°F',
    };
  }
  return {
    value: celsius,
    display: `${Math.round(celsius)}`,
    unit: '°C',
  };
}

export function formatWeight(kg: number, system: UnitSystem): { value: number; display: string; unit: string } {
  if (system === 'imperial') {
    const lbs = kgToLbs(kg);
    return {
      value: lbs,
      display: `${lbs}`,
      unit: 'lbs',
    };
  }
  return {
    value: kg,
    display: `${kg}`,
    unit: 'kg',
  };
}

export function formatVisibility(meters: number, system: UnitSystem): { value: number; display: string; unit: string } {
  if (system === 'imperial') {
    const ft = Math.round(meters * M_TO_FT);
    return {
      value: ft,
      display: `${ft}`,
      unit: 'ft',
    };
  }
  return {
    value: meters,
    display: `${meters}`,
    unit: 'm',
  };
}

export function formatPressure(bar: number | undefined | null, system: UnitSystem = 'metric'): { value: number; display: string; unit: string } {
  if (bar === undefined || bar === null) {
    return { value: 0, display: '-', unit: system === 'imperial' ? 'psi' : 'bar' };
  }
  if (system === 'imperial') {
    const psi = barToPsi(bar);
    return {
      value: psi,
      display: `${psi}`,
      unit: 'psi',
    };
  }
  return {
    value: bar,
    display: `${bar}`,
    unit: 'bar',
  };
}

// Storage helpers: all base records are stored in canonical metric (meters, °C, kg, bar)
export function depthToStorage(val: number, system: UnitSystem): number {
  return system === 'imperial' ? feetToMeters(val) : val;
}

export function depthFromStorage(meters: number, system: UnitSystem): number {
  return system === 'imperial' ? metersToFeet(meters) : meters;
}

export function tempToStorage(val: number, system: UnitSystem): number {
  return system === 'imperial' ? fahrenheitToCelsius(val) : val;
}

export function tempFromStorage(celsius: number, system: UnitSystem): number {
  return system === 'imperial' ? celsiusToFahrenheit(celsius) : celsius;
}

export function weightToStorage(val: number, system: UnitSystem): number {
  return system === 'imperial' ? lbsToKg(val) : val;
}

export function weightFromStorage(kg: number, system: UnitSystem): number {
  return system === 'imperial' ? kgToLbs(kg) : kg;
}

export function visToStorage(val: number, system: UnitSystem): number {
  return system === 'imperial' ? feetToMeters(val) : val;
}

export function visFromStorage(meters: number, system: UnitSystem): number {
  return system === 'imperial' ? Math.round(meters * M_TO_FT) : meters;
}

export function pressureToStorage(val: number, system: UnitSystem): number {
  return system === 'imperial' ? psiToBar(val) : val;
}

export function pressureFromStorage(bar: number, system: UnitSystem): number {
  return system === 'imperial' ? barToPsi(bar) : bar;
}
