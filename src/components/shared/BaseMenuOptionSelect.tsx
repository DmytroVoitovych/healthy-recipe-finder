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
  checkedValue: string;
  updateField: (filterName: string, value: string) => void;
  clearField: (filterName: string) => void;
}

export const BaseMenuOptionSelect = ({
  placeholder,
  optionList,
  legend,
  popoverId,
  radioName,
  containerClass,
  clearField,
  updateField,
  checkedValue,
}: BaseMenuOptionSelectProps) => {
  const elementRef = useRef<HTMLButtonElement>(null);
  const {
    setElementRect,
    bottom = 0,
    left = 0,
    isOpen = false,
  } = useGetCoordinateForPopup(elementRef);

  const coordinateProperty = {
    "--bottom-coordinate": `${bottom ?? 0}px`,
    "--left-coordinate": `${left ?? 0}px`,
  } as React.CSSProperties;

  const selectPlaceholder = checkedValue
    ? `${placeholder}: ${parseInt(checkedValue)}`
    : placeholder;

  return (
    <>
      <button
        ref={elementRef}
        type="button"
        popoverTarget={popoverId}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={popoverId}
        className="text-preset-7"
      >
        {selectPlaceholder} <ArrowDownIco />
      </button>
      <div
        onBeforeToggle={setElementRect}
        id={popoverId}
        popover="manual"
        role="menu"
        className={containerClass}
        style={coordinateProperty}
      >
        <fieldset>
          <legend className="visually-hidden">{legend}</legend>
          {optionList.map((value) => (
            <label key={value} className="text-preset-7">
              <input
                type="radio"
                name={radioName}
                value={value}
                checked={checkedValue === value}
                onChange={(e) => updateField(radioName, e.target.value)}
              />
              {value}
            </label>
          ))}
          <button
            type="button"
            aria-label={`Clear ${placeholder.toLowerCase()} selection`}
            onClick={() => clearField(radioName)}
            className="text-preset-9"
          >
            Clear
          </button>
        </fieldset>
      </div>
    </>
  );
};
