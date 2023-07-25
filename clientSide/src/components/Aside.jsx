import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { CreateOutlined, ChevronRightOutlined, LogoutOutlined, AttachMoneyOutlined,BackupTableOutlined, SettingsOutlined, DashboardOutlined } from '@mui/icons-material';

import { AsideLink } from '../components';
import { logout } from '../actions/auth';

const Aside = ({ activeLink, setActiveLink }) => {

    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const location = useLocation();

    const [ profile ] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const handleClick = (e) => {
      e.preventDefault();
        dispatch(logout( navigate ));
    }

  //   const openExpenseForm = (e) => {
  //     e.preventDefault();
  //     navigate('/form');
  // }

    useEffect(()=> {
        const token = profile && profile.token;

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        // eslint-disable-next-line 
    },[ location ]);


  return (
    <div className='hidden md:flex flex-col content-between h-screen p-8 min-w-[200px] bg-gray-900 text-white'>
        <div className=" flex flex-col content-start h-full">
          <div className="flex ">
            <Link className='flex gap-2 w-full p-1 mt-2 items-center justify-center' onClick={''}>
                <div className="w-10">
                    <img src="https://llamdodu.sirv.com/ontime/favicon.ico.ico" alt="tms"/>
                </div>
                <div className="">Ontime TMS</div>
            </Link>
          </div>
          <div className="block">
            <AsideLink icon={<DashboardOutlined />} title='Overview' activeLink={activeLink} setActiveLink={setActiveLink} to={'/dashboard'} chevron={<ChevronRightOutlined />} />
            <AsideLink icon={<BackupTableOutlined />} title='Pickings' activeLink={activeLink} setActiveLink={setActiveLink} to={'/pickings'} chevron={<ChevronRightOutlined />} />
            <AsideLink icon={<AttachMoneyOutlined />} title='Expenses' activeLink={activeLink} setActiveLink={setActiveLink} to={'/expenses'} chevron={<ChevronRightOutlined />} />
            <AsideLink icon={<SettingsOutlined />} title='Settings' activeLink={activeLink} setActiveLink={setActiveLink} to={'/settings'} chevron={<ChevronRightOutlined />} />
            <AsideLink icon={<CreateOutlined />} title='Picking Form' activeLink={activeLink} setActiveLink={setActiveLink} to={'/pickingsForm'} chevron={<ChevronRightOutlined />} />
            <AsideLink icon={<CreateOutlined />} title='Expense Form' activeLink={activeLink} setActiveLink={setActiveLink} to={'/form'} chevron={<ChevronRightOutlined />} />
            
          </div>
        </div>
        <div className="flex flex-col content-between">
          {/* <button className='px-4 mt-2 w-full text-right' onClick = { openExpenseForm }>  Expense</button> */}
          <button onClick={ handleClick } > <LogoutOutlined /> Logout</button>
        </div>
    </div>
  )
}

export default Aside