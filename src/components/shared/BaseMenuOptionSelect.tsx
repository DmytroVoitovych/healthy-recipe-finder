"use client";
import { useGetCoordinateForPopup } from "@/utils/customHook/useGetCoordinateForPopup";
import { ArrowDownIco } from "@/utils/svgimports";
import { useRef } from "react";

interface BaseMenuOptionSelectProps {
  placeholder: string;
  optionList: string[];
  legend: string;
  popoverId: string;
  radioName: string;
  containerClass: string;
}

export const BaseMenuOptionSelect = ({
  placeholder,
  optionList,
  legend,
  popoverId,
  radioName,
  containerClass,
}: BaseMenuOptionSelectProps) => {
  const elementRef = useRef<HTMLButtonElement>(null);
  const { setElementRect, bottom = 0, left = 0 } = useGetCoordinateForPopup(elementRef);
  

  return (
    <>
      <button
        ref={elementRef}
        onClick={()=>setElementRect()}
        type="button"
        popoverTarget={popoverId}
        aria-haspopup="true"
        className="text-preset-7"
      >
        {placeholder} <ArrowDownIco />
      </button>
      <div
        id={popoverId}
        popover="auto"
        role="menu"
        className={containerClass}
        style={
          {
            "--bottom-coordinate": `${bottom}px`,
            "--left-coordinate": `${left}px`,
          } as React.CSSProperties
        }
      >
        <fieldset>
          <legend className="visually-hidden">{legend}</legend>
          {optionList.map((value) => (
            <label key={value} className="text-preset-7">
              <input type="radio" name={radioName} value={value} />
              {value}
            </label>
          ))}
        </fieldset>
      </div>
    </>
  );
};
