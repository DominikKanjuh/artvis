# ArtVis - Insight into Art

An interactive visualization platform for exploring art history through exhibitions, artist demographics and geographic trends. Built for the Information Visualization course (WS24/25) at TU Wien.

The project is accessible at [https://artvis.pages.dev](https://artvis.pages.dev).

## Authors

- **Paul Nitzke**
- **Georgios Papadopoulos**
- **Dominik Kanjuh**

## Features

- **Global Exhibitions Map**: Interactive map showing worldwide art exhibitions
- **Geographic Trends**: Histograms exploring exhibition patterns across continents and cities
- **Artist Demographics**: Visualizations of artists' lifespans, gender and nationality distributions
- **Artist-Exhibition Connections**: Network graph showing relationships between artists and exhibitions

## Data Source

The ArtVis dataset is derived from the [Database of Modern Exhibitions (DoME)](http://exhibitions.univie.ac.at/) from the University of Vienna. It contains approximately 14,000 modern painters and their exhibitions between 1905 and 1915. The dataset includes:

- Exhibition details (venue, location, type, date)
- Artist information (nationality, gender, birth/death dates)
- Exhibition-artist connections
- Number of paintings per exhibition

## Tech Stack

### Core

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

### Data Visualization

- D3.js
- Leaflet.js

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open the application in your browser:

```bash
http://localhost:3000
```

### Running the application using Docker

- Build the image: `docker build -t artvis .`
- Run the container: `docker run -p 3000:3000 artvis`
- Build and run with compose: `docker compose up`
- Stop and remove containers: `docker compose down`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Paul Nitzke, Georgios Papadopoulos, Dominik Kanjuh
