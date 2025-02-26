import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const AuthLayout = () => {
  return (
    <Container>
      <LeftSection>
        <h1>Finance</h1>
      </LeftSection>

      <RightSection>
        <Outlet />
      </RightSection>
    </Container>
  );
};

export default AuthLayout;
