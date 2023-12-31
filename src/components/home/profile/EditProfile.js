import { Form, Link } from 'react-router-dom';

import profileIcon from '@assets/default/profileIcon.png';
import StyledDiv from '@styles/home/profile/EditProfile-styled';

const EditProfile = ({ id, user }) => {
  const {
    background_img: backgroundImg,
    profile_img: profileImg,
    nickname,
    bio,
  } = user;

  return (
    <StyledDiv>
      <div className='header'>
        <Link to='/'>
          <svg
            className='header__back'
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 55 55'
            fill='none'
          >
            <path
              d='M12.0312 25.7812H46.4062C46.8621 25.7812 47.2993 25.9623 47.6216 26.2847C47.9439 26.607 48.125 27.0442 48.125 27.5C48.125 27.9558 47.9439 28.393 47.6216 28.7153C47.2993 29.0377 46.8621 29.2188 46.4062 29.2188H12.0312C11.5754 29.2188 11.1382 29.0377 10.8159 28.7153C10.4936 28.393 10.3125 27.9558 10.3125 27.5C10.3125 27.0442 10.4936 26.607 10.8159 26.2847C11.1382 25.9623 11.5754 25.7812 12.0312 25.7812Z'
              fill='black'
            />
            <path
              d='M12.743 27.5L26.9983 41.7518C27.321 42.0746 27.5023 42.5123 27.5023 42.9687C27.5023 43.4251 27.321 43.8629 26.9983 44.1856C26.6755 44.5083 26.2378 44.6896 25.7814 44.6896C25.325 44.6896 24.8873 44.5083 24.5645 44.1856L9.09577 28.7168C8.93571 28.5572 8.80872 28.3675 8.72207 28.1587C8.63542 27.9499 8.59082 27.726 8.59082 27.5C8.59082 27.2739 8.63542 27.05 8.72207 26.8412C8.80872 26.6324 8.93571 26.4428 9.09577 26.2831L24.5645 10.8143C24.8873 10.4916 25.325 10.3103 25.7814 10.3103C26.2378 10.3103 26.6755 10.4916 26.9983 10.8143C27.321 11.1371 27.5023 11.5748 27.5023 12.0312C27.5023 12.4876 27.321 12.9254 26.9983 13.2481L12.743 27.5Z'
              fill='black'
            />
          </svg>
        </Link>
        <span className='header__title'>프로필 편집</span>
      </div>

      {/* 정보를 입력받는 폼 */}
      <Form method='PUT'>
        <input type='hidden' name='id' value={id} />
        <div className='profile'>
          <div className='profile__background'>
            {backgroundImg && (
              <img src={backgroundImg} alt={`${nickname}'s background image`} />
            )}
          </div>
          <div className='profile__image'>
            <img
              src={profileImg || profileIcon}
              alt={`${nickname}'s profile image`}
            />
          </div>
        </div>

        <div className='inputFormBox'>
          <div className='input-container'>
            <label htmlFor='nickname'>닉네임</label>
            <input
              id='nickname'
              type='text'
              name='nickname'
              placeholder='닉네임'
              defaultValue={nickname}
              required
            />
          </div>
          <div className='input-container'>
            <label htmlFor='bio'>소개</label>
            <textarea
              id='bio'
              type='text'
              name='bio'
              placeholder='소개 내용'
              defaultValue={bio}
              required
            />
          </div>
          <button type='submit' className='submitBtn'>
            프로필 편집
          </button>
        </div>
      </Form>
    </StyledDiv>
  );
};

export default EditProfile;
