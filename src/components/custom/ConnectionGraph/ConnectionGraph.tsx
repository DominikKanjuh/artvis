"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ProcessedData } from "lib/data";

interface ConnectionGraphProps {
  data: ProcessedData;
  selectedYear: number;
}

interface Node {
  id: string;
  name: string;
  type: "artist" | "exhibition";
  details?: {
    // artist details
    gender?: string;
    nationality?: string;
    birthYear?: number;
    deathYear?: number;
    // exhibition details
    venue?: string;
    city?: string;
    country?: string;
  };
}

interface Link {
  source: string;
  target: string;
}

function ConnectionGraph({ data, selectedYear }: ConnectionGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial dimensions
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0)
      return;

    const exhibitions = data.exhibitions.filter((e) => e.year === selectedYear);
    const exhibitionIds = new Set(exhibitions.map((e) => e.exhibitionId));
    const relevantConnections = data.connections.filter((c) =>
      exhibitionIds.has(c.exhibitionId),
    );
    const artistIds = new Set(relevantConnections.map((c) => c.artistId));
    const artists = data.artists.filter((a) => artistIds.has(a.artistId));

    const nodes: Node[] = [
      ...artists.map((a) => ({
        id: a.artistId,
        name: a.name,
        type: "artist" as const,
        details: {
          gender: a.gender === "M" ? "Male" : "Female",
          nationality: a.nationality,
          birthYear: a.birthYear,
          deathYear: a.deathYear,
        },
      })),
      ...exhibitions.map((e) => ({
        id: e.exhibitionId,
        name: e.title,
        type: "exhibition" as const,
        details: {
          venue: e.venue,
          city: e.city,
          country: e.country,
        },
      })),
    ];

    const links: Link[] = relevantConnections.map((c) => ({
      source: c.artistId,
      target: c.exhibitionId,
    }));

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);
    svg.call(
      zoom.transform as any,
      d3.zoomIdentity
        .translate(dimensions.width / 2, dimensions.height / 2)
        .scale(0.2)
        .translate(-dimensions.width / 2, -dimensions.height / 2),
    );

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "center",
        d3.forceCenter(dimensions.width / 2, dimensions.height / 2),
      );

    const tooltip = d3
      .select("body")
      .append("div")
      .attr(
        "class",
        "absolute hidden bg-white p-2 rounded shadow-lg border border-gray-200 max-w-xs",
      );

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .style("stroke", "#4b3930")
      .style("stroke-opacity", 0.6);

    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(
        d3
          .drag<any, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any,
      )
      .on("mouseover", (event, d: Node) => {
        const details = d.details;
        let content = `<div class="font-bold">${d.name}</div>`;

        if (d.type === "artist") {
          content += `
            <div class="text-sm mt-1">
              <div>Gender: ${details?.gender}</div>
              <div>Nationality: ${details?.nationality}</div>
              <div>Lifespan: ${details?.birthYear} - ${
                details?.deathYear || "Present"
              }</div>
            </div>
          `;
        } else {
          content += `
            <div class="text-sm mt-1">
              <div>Venue: ${details?.venue}</div>
              <div>Location: ${details?.city}, ${details?.country}</div>
            </div>
          `;
        }

        tooltip
          .html(content)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
          .classed("hidden", false);
      })
      .on("mouseout", () => {
        tooltip.classed("hidden", true);
      });

    node
      .append("path")
      .attr("d", (d) =>
        d.type === "artist"
          ? d3.symbol().type(d3.symbolCircle).size(400)()
          : `M-10,-10 L10,-10 L10,10 L-10,10 Z`,
      )
      .style("fill", (d) =>
        d.type === "artist" ? "rgb(75, 57, 48)" : "rgb(245, 237, 220)",
      )
      .style("stroke", "#4b3930");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(30, 30)");

    legend
      .insert("rect", ":first-child")
      .attr("width", 120)
      .attr("height", 65)
      .attr("x", -10)
      .attr("y", -10)
      .style("fill", "white")
      .style("opacity", 0.95)
      .style("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))")
      .attr("rx", 8);

    legend
      .append("circle")
      .attr("r", 6)
      .attr("cx", 8)
      .attr("cy", 10)
      .style("fill", "rgb(75, 57, 48)");

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 15)
      .text("Artist")
      .style("font-size", "16px")
      .style("font-weight", "500")
      .style("fill", "#4b3930");

    legend
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("x", 2)
      .attr("y", 30)
      .style("fill", "rgb(245, 237, 220)")
      .style("stroke", "#4b3930");

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 40)
      .text("Exhibition")
      .style("font-size", "16px")
      .style("font-weight", "500")
      .style("fill", "#4b3930");

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [data, selectedYear, dimensions]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{ display: "block" }}
        />
      )}
    </div>
  );
}

export default ConnectionGraph;
