import ArrowIcon from 'public/assets/icons/icon_arrow.svg';
import React, { useState } from 'react';

type SortDropDownProps = {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
};

function SortDropDown({
  label,
  options,
  onSelect,
  className = '',
}: SortDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative inline-block text-left"
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div>
        <button
          type="button"
          className="btn-outline inline-flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <ArrowIcon className="h-[7.33px] w-[12.87px]" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[90px] origin-top-right rounded-[6px] border border-kv-primary-blue-light bg-white shadow-lg pc:w-[127px] tablet:w-[120px]">
          <div>
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`sort-dropdown-menu ${index === 0 ? 'rounded-t-[6px]' : ''} ${index === options.length - 1 ? 'rounded-b-[6px]' : ''} ${index > 0 ? 'border-t' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SortDropDown;
