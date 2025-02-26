import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #1f2937;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  background: #f3f4f6;
  padding: 2rem;
  overflow-y: auto;
`;

const DashboardLayout = () => {
  return (
    <Container>
      {/* Sidebar for navigation */}
      <Sidebar>
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <a href="/dashboard/overview">Overview</a>
            </li>
            <li>
              <a href="/dashboard/transactions">Transactions</a>
            </li>
            <li>
              <a href="/dashboard/bills">Bills</a>
            </li>
            <li>
              <a href="/dashboard/budgets">Budgets</a>
            </li>
            <li>
              <a href="/dashboard/pots">Pots</a>
            </li>
          </ul>
        </nav>
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default DashboardLayout;
