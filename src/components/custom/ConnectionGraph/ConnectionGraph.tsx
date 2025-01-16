"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!svgRef.current) return;

    const exhibitions = data.exhibitions.filter((e) => e.year === selectedYear);
    const exhibitionIds = new Set(exhibitions.map((e) => e.exhibitionId));
    const relevantConnections = data.connections.filter((c) =>
      exhibitionIds.has(c.exhibitionId)
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

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

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
        .translate(width / 2, height / 2)
        .scale(0.2)
        .translate(-width / 2, -height / 2)
    );

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr(
        "class",
        "absolute hidden bg-white p-2 rounded shadow-lg border border-gray-200 max-w-xs"
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
          .on("end", dragended) as any
      )
      .on("click", (event, d: Node) => {
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
          : `M-10,-10 L10,-10 L10,10 L-10,10 Z`
      )
      .style("fill", (d) =>
        d.type === "artist" ? "rgb(75, 57, 48)" : "rgb(245, 237, 220)"
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
      .attr("transform", "translate(20, 20)"); // Position in top-left

    legend
      .append("circle")
      .attr("r", 6)
      .attr("cx", 6)
      .attr("cy", 6)
      .style("fill", "rgb(75, 57, 48)");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text("Artist")
      .style("font-size", "12px")
      .style("fill", "#4b3930");

    legend
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("x", 0)
      .attr("y", 20)
      .style("fill", "rgb(245, 237, 220)")
      .style("stroke", "#4b3930");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 30)
      .text("Exhibition")
      .style("font-size", "12px")
      .style("fill", "#4b3930");

    legend
      .insert("rect", ":first-child")
      .attr("width", 85)
      .attr("height", 45)
      .attr("x", -5)
      .attr("y", -5)
      .style("fill", "white")
      .style("opacity", 0.8)
      .attr("rx", 5);

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [data, selectedYear]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ minHeight: "500px" }}
    />
  );
}

export default ConnectionGraph;
