import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AsideLink = ({ icon, title, activeLink, setActiveLink, chevron, showMobileMenu, setShowMobileMenu, to, addStyles }) => {

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    setActiveLink(title);
    navigate(to)

    if(showMobileMenu) {
      setShowMobileMenu(false)
    }
    
  }
  return (
    
    <Link className={`flex items-center gap-2 w-full p-2 mt-2 ${addStyles}`} onClick={ handleClick }>
        <div className="text-xs font-gray-400">
          {icon}
        </div>
        <div className={''}>{title}</div>
        <div className="text-xs">
          {activeLink === title ? chevron : ''}
        </div>
    </Link>
     
  )
}

export default AsideLink