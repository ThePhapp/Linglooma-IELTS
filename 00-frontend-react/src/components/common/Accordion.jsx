import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-[#b3b3b3] rounded-[12px] bg-[#fcfcfc] mb-4 overflow-hidden">
      <div 
        className="flex justify-between items-center p-6 cursor-pointer"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-black">{title}</h3>
        <img 
          src={isOpen ? "/images/img_icon_r.svg" : "/images/img_icon_r_28x28.svg"} 
          alt="Toggle" 
          className="w-7 h-7 transform transition-transform duration-200"
        />
      </div>
      {isOpen && (
        <div className="px-6 pb-6">
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(1); // Default open the second item (index 1)

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Accordion;