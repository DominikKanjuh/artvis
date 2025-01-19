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
import { BarChart } from "../GeographicHistograms/BarChart";
import {
  getGenderDistribution,
  getLifespanDistribution,
  getNationalityData,
} from "./utils";

interface DemographicHistogramsProps {
  data: ProcessedData;
  selectedYear: number;
}

function DemographicHistograms({
  data,
  selectedYear,
}: DemographicHistogramsProps) {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [exhibition, setExhibition] = useState("");

  const [continentOpen, setContinentOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [exhibitionOpen, setExhibitionOpen] = useState(false);

  const exhibitionsByYear = useMemo(() => {
    return data.exhibitions.filter((e) => e.year === selectedYear);
  }, [data.exhibitions, selectedYear]);

  const continents = useMemo(() => {
    const uniqueContinents = [
      ...new Set(
        exhibitionsByYear
          .map((e) => e.continent)
          .filter((c) => c && c !== "-" && c !== "Unknown"),
      ),
    ];
    return uniqueContinents
      .map((c) => ({ value: c, label: c }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [exhibitionsByYear]);

  const countries = useMemo(() => {
    const uniqueCountries = [
      ...new Set(
        exhibitionsByYear
          .filter((e) => !continent || e.continent === continent)
          .map((e) => e.country)
          .filter((c) => c && c !== "-" && c !== "Unknown"),
      ),
    ];
    return uniqueCountries
      .map((c) => ({ value: c, label: c }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [exhibitionsByYear, continent]);

  const cities = useMemo(() => {
    const uniqueCities = [
      ...new Set(
        exhibitionsByYear
          .filter((e) => !continent || e.continent === continent)
          .filter((e) => !country || e.country === country)
          .map((e) => e.city)
          .filter((c) => c && c !== "-" && c !== "Unknown"),
      ),
    ];
    return uniqueCities
      .map((c) => ({ value: c, label: c }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [exhibitionsByYear, continent, country]);

  const exhibitions = useMemo(() => {
    const filteredExhibitions = exhibitionsByYear
      .filter((e) => !continent || e.continent === continent)
      .filter((e) => !country || e.country === country)
      .filter((e) => !city || e.city === city);

    return filteredExhibitions
      .map((e) => ({ value: e.exhibitionId, label: e.title }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [exhibitionsByYear, continent, country, city]);

  const filteredArtists = useMemo(() => {
    const noFiltersSelected = !continent && !country && !city && !exhibition;
    if (noFiltersSelected) {
      return [];
    }

    const finalExhibitions = exhibitionsByYear
      .filter((e) => !continent || e.continent === continent)
      .filter((e) => !country || e.country === country)
      .filter((e) => !city || e.city === city)
      .filter((e) => !exhibition || e.exhibitionId === exhibition);

    const validExhibitionIds = new Set(
      finalExhibitions.map((e) => e.exhibitionId),
    );
    const finalConnections = data.connections.filter((c) =>
      validExhibitionIds.has(c.exhibitionId),
    );
    const validArtistIds = new Set(finalConnections.map((c) => c.artistId));

    return data.artists.filter((artist) => validArtistIds.has(artist.artistId));
  }, [
    exhibitionsByYear,
    continent,
    country,
    city,
    exhibition,
    data.connections,
    data.artists,
  ]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Continent */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Filter by Continent</h3>
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
                          setContinent((prev) =>
                            prev === currentValue ? "" : currentValue,
                          );
                          setCountry("");
                          setCity("");
                          setExhibition("");
                          setContinentOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            continent === item.value
                              ? "opacity-100"
                              : "opacity-0",
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

        {/* Country */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Filter by Country</h3>
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
                          setCountry((prev) =>
                            prev === currentValue ? "" : currentValue,
                          );
                          setCity("");
                          setExhibition("");
                          setCountryOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            country === item.value
                              ? "opacity-100"
                              : "opacity-0",
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

        {/* City */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Filter by City</h3>
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
                          setCity((prev) =>
                            prev === currentValue ? "" : currentValue,
                          );
                          setExhibition("");
                          setCityOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            city === item.value ? "opacity-100" : "opacity-0",
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

        {/* Exhibition */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Filter by Exhibition</h3>
          <Popover open={exhibitionOpen} onOpenChange={setExhibitionOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={exhibitionOpen}
                className="flex w-[200px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap"
                disabled={!city}
              >
                <span className="flex-1 overflow-hidden text-ellipsis">
                  {exhibitions.find((e) => e.value === exhibition)?.label ||
                    "Select exhibition..."}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search exhibition..." />
                <CommandList>
                  <CommandEmpty>No exhibition found.</CommandEmpty>
                  <CommandGroup>
                    {exhibitions.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setExhibition((prev) =>
                            prev === currentValue ? "" : currentValue,
                          );
                          setExhibitionOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            exhibition === item.value
                              ? "opacity-100"
                              : "opacity-0",
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

      {/* Bar Charts */}
      <div className="grid h-full flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-3">
        <BarChart data={getNationalityData(filteredArtists)} />
        <BarChart
          data={getGenderDistribution(filteredArtists)}
          horizontal={false}
          customColors={{
            Male: "rgb(75, 57, 48)",
            Female: "rgb(245, 237, 220)",
          }}
        />
        <BarChart data={getLifespanDistribution(filteredArtists)} />
      </div>
    </div>
  );
}

export default DemographicHistograms;
