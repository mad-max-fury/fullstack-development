import styled from 'styled-components';

import { LogoIcon, LogoText } from '../../../assets/icons';
import { media } from '../../../styles/breakpoints';
import { El } from '../tag';

export const Logo = ({ type = 'text' }: { type?: 'icon' | 'text' }) => {
  return (
    <LogoWrapper>
      {type === 'text' ? (
        <>
          <LogoIcon className="mobile-icon" />
          <LogoText className="desktop-text" />
        </>
      ) : (
        <LogoIcon className="mobile-icon" />
      )}
    </LogoWrapper>
  );
};

const LogoWrapper = styled(El)`
  display: flex;
  align-items: center;

  .mobile-icon {
    display: block;

    ${media.medium`
      display: none;
    `}
  }

  .desktop-text {
    display: none;

    ${media.medium`
      display: block; 
    `}
  }
`;
