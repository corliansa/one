import React, { useState } from "react";
import { GermanySVGPath } from "./GermanyPath";
import { GermanyOutline } from "./GermanyOutline";
import { AnimatePresence, motion } from "framer-motion";

export const GeoVis: React.FC<{ width: string }> = ({ width }) => {
  const [tooltip, setTooltip] = useState({
    show: false,
    data: "",
    x: 0,
    y: 0,
  });

  const handleMouseOver = (
    e: React.MouseEvent<SVGPathElement, MouseEvent>,
    id: string,
  ) => {
    const { clientX: x, clientY: y } = e;
    setTooltip({ show: true, data: id, x, y });
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
            <div>
              <strong>State:</strong> {tooltip.data}
            </div>
            <div>
              <strong>Population:</strong> {tooltip.data}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
