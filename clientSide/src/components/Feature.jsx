import React from 'react';
import { Link } from 'react-router-dom';

const Feature = ({ title, value, icon, subsValue, percentage, to, addStyles }) => {
  return (
    <Link to={to} className={`flex md:flex-col p-3 items-center justify-around cursor-pointer bg-gray-100 rounded-lg ${addStyles}`}>
            <div className="text-center w-full text-sm ">{title}</div>
            <div className="flex items-center justify-evenly w-full py-1">
                <div className="text-2xl font-bold"><p> {value}</p></div>
                <div className="flex flex-col gap-1">
                  <p className='text-xs text-lime-900'>{percentage}</p>
                  {icon}
                </div>
            </div>
            <div className="text-center font-semibold"><p>{subsValue}</p></div>
    </Link>
  )
}

export default Feature