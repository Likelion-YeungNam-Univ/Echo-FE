import { NavLink } from 'react-router-dom';

import echoLogo from '@assets/util/echoLogo.png';
import profileIcon from '@assets/default/profileIcon.png';
import homeIcon from '@assets/navigation/homeIcon.png';
import StyledMainNavigation from '@styles/home/MainNavigation-styled';
import { useSelector } from 'react-redux';

const MainNavigation = () => {
  const { id, nickname } = useSelector((state) => state.user);

  return (
    <StyledMainNavigation>
      <div className='item'>
        <div className='logo'>
          <img src={echoLogo} alt='echo logo' />
        </div>
      </div>
      <div className='item'>
        <NavLink
          to={`/profile/${id}`}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <img src={profileIcon} alt='user profile' width='32' />
          <span>{nickname}</span>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : undefined)}
          end
        >
          <img src={homeIcon} alt='home navigation' width='32' />
          <span>홈</span>
        </NavLink>
      </div>
      <div className='item'>
        <NavLink to='/logout'>
          <span>로그아웃</span>
        </NavLink>
      </div>
    </StyledMainNavigation>
  );
};

export default MainNavigation;
