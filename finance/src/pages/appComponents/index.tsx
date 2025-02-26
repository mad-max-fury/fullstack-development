import styled from 'styled-components';

import { El, Logo, Typography } from '../../components/common';
import { theme } from '../../styles/theme';

const AppComponents = () => {
  return (
    <MainWrapper role="region" ariaLabel="Main Content" as="main">
      <El
        as="nav"
        color={'white'}
        backgroundColor="G900"
        h={'134px'}
        w={'100%'}
        flexCenter
      >
        <El
          as="div"
          w={'100%'}
          maxW={theme.container.maxWidthInner}
          flexBetween
        >
          <Logo />
          <Typography font={"publicSans"} variant='h-1'>Style Guide</Typography>
        </El>
      </El>
      <Typography
        p={'10px 8px'}
        backgroundColor={'OPurple'}
        color={'white'}
        variant="h-1"
      >
        AppComponents Guide
      </Typography>
    </MainWrapper>
  );
};

export default AppComponents;

const MainWrapper = styled(El)`
  width: 100vw;
`;
