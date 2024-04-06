import React, { useState } from "react";
import { GermanySVGPath } from "./GermanyPath";
import { GermanyOutline } from "./GermanyOutline";
import { AnimatePresence, motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Text } from "recharts";

const xLabels = ["Ausbildung", "Bachelor", "Master", "Doctor", "Professor"];

interface TooltipState {
  show: boolean;
  data: { name: string | undefined; value: number | undefined }[];
  x: number;
  y: number;
}

export const GeoVis: React.FC<{ width: string }> = ({ width }) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    show: false,
    data: [],
    x: 0,
    y: 0,
  });

  const [hoveredBundesland, setHoveredBundesland] = useState("");

  const { data: occupationStats, isSuccess } =
    trpc.internal.getStudentOccupationStats.useQuery(
      {
        bundesland: hoveredBundesland,
      },
      { enabled: !!hoveredBundesland },
    );

  useEffect(() => {
    if (hoveredBundesland && isSuccess && occupationStats) {
      const tooltipContent = [
        {
          name: xLabels[0],
          value: occupationStats[0],
        },
        {
          name: xLabels[1],
          value: occupationStats[1],
        },
        {
          name: xLabels[2],
          value: occupationStats[2],
        },
        {
          name: xLabels[3],
          value: occupationStats[3],
        },
        {
          name: xLabels[4],
          value: occupationStats[4],
        },
      ];

      setTooltip((prev) => ({ ...prev, show: true, data: tooltipContent }));
    }
  }, [hoveredBundesland, isSuccess, occupationStats]);

  const handleMouseOver = async (
    e: React.MouseEvent<SVGPathElement, MouseEvent>,
    bundesland: string,
  ) => {
    const { clientX: x, clientY: y } = e;
    setHoveredBundesland(bundesland);
    setTooltip((prev) => ({ ...prev, x, y }));
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Bundesrepublik_Deutschland"
        width={width}
        viewBox="0 0 591.504 800.504"
        overflow="visible"
        enableBackground="new 0 0 591.504 800.504"
      >
        <g>
          {GermanySVGPath.map((path, id) => (
            <path
              key={id}
              id={path.id}
              d={path.d}
              className="duration-3000 fill-blue-400
          stroke-white stroke-[1px] transition hover:fill-red-200"
              onMouseOver={(e) => handleMouseOver(e, path.id)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </g>

        <path id="path3789" d={GermanyOutline.d} className="fill-none" />
      </svg>
      <AnimatePresence>
        {tooltip.show && (
          <motion.div
            initial={{ opacity: 0 }} // Start from transparent and slightly scaled down
            animate={{ opacity: 1 }} // Animate to fully visible and scaled normally
            exit={{ opacity: 0 }} // Fade out when removed (if you're using conditional rendering)
            transition={{ duration: 0.3 }} // Duration of the animation
            className="pointer-events-none fixed rounded-md bg-white p-2 shadow-md"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <BarChart
              data={tooltip.data}
              width={400}
              height={300}
              margin={{ left: 0 }}
              barGap={1}
              barCategoryGap={1}
              barSize={5}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Text scaleToFit textAnchor="middle" width={20} angle={45} />
              <Bar dataKey="value" barSize={50} fill="#8CB9BD" />
            </BarChart>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
