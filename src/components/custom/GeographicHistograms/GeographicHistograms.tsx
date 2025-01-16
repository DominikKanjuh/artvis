"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "components/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "components/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/components/ui/popover";
import { ProcessedData } from "lib/data";
import { cn } from "lib/utils";
import { BarChart } from "./BarChart";
import { getCityData, getCountryData, getExhibitionData } from "./utils";

interface GeographicHistogramsProps {
  data: ProcessedData;
  selectedYear: number;
}

function GeographicHistograms({
  data,
  selectedYear,
}: GeographicHistogramsProps) {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [continentOpen, setContinentOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const yearData = useMemo(() => {
    return data.exhibitions.filter((e) => e.year === selectedYear);
  }, [data?.exhibitions, selectedYear]);

  const continents = useMemo(() => {
    const uniqueContinents = [
      ...new Set(
        yearData
          .map((e) => e.continent)
          .filter((c) => c && c !== "-" && c !== "Unknown")
      ),
    ];
    return uniqueContinents
      .map((c) => ({ value: c, label: c }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [yearData]);

  const countries = useMemo(() => {
    const uniqueCountries = [
      ...new Set(
        yearData
          .filter((e) => e.continent === continent)
          .map((e) => e.country)
          .filter((c) => c && c !== "-" && c !== "Unknown")
      ),
    ];
    return uniqueCountries
      .map((c) => ({ value: c, label: c }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [yearData, continent]);

  const cities = useMemo(() => {
    const uniqueCities = [
      ...new Set(
        yearData
          .filter((e) => e.continent === continent)
          .filter((e) => e.country === country)
          .map((e) => e.city)
          .filter((c) => c && c !== "-" && c !== "Unknown")
      ),
    ];
    return uniqueCities
      .map((c) => ({ value: c, label: c }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [yearData, continent, country]);

  console.log("continent", continent);
  console.log("country", country);
  console.log("city", city);

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div>
          <h3 className="text-lg font-semibold mb-2">Exhibitions by Country</h3>
          <Popover open={continentOpen} onOpenChange={setContinentOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={continentOpen}
                className="w-[200px] justify-between"
              >
                {continent || "Select continent..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search continent..." />
                <CommandList>
                  <CommandEmpty>No continent found.</CommandEmpty>
                  <CommandGroup>
                    {continents.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setContinent(
                            currentValue === continent ? "" : currentValue
                          );
                          setCountry("");
                          setCity("");
                          setContinentOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            continent === item.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Exhibitions by City</h3>
          <Popover open={countryOpen} onOpenChange={setCountryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={countryOpen}
                className="w-[200px] justify-between"
                disabled={!continent}
              >
                {country || "Select country..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setCountry(
                            currentValue === country ? "" : currentValue
                          );
                          setCity("");
                          setCountryOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            country === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Exhibitions</h3>
          <Popover open={cityOpen} onOpenChange={setCityOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cityOpen}
                className="w-[200px] justify-between"
                disabled={!country}
              >
                {city || "Select city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {cities.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setCity(currentValue === city ? "" : currentValue);
                          setCityOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            city === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="h-full flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <BarChart data={getCountryData(yearData, continent)} />
        <BarChart data={getCityData(yearData, country)} />
        <BarChart data={getExhibitionData(yearData, city)} />
      </div>
    </div>
  );
}

export default GeographicHistograms;
