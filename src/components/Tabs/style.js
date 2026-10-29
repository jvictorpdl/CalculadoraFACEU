import styled from 'styled-components';

export const TabsContainer = styled.div`
  background-color: #ffffff00;
  margin: 150 100px 50px
  height: 100%;
`;

export const TabsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #dce3eb;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`;

export const TabButtonStyled = styled.button`
  background: none;
  border: none;
  padding: 1rem 0;
  font-size: 16px;
  color: ${(props) => (props.active ? '#17737A' : '#4B5563')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  border-bottom: 2px solid ${(props) => (props.active ? '#17737A' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #17737A;
  }
`;

export const TabContentContainer = styled.div`
  margin: 24px 0px 0px 0px;
  height: 100%;
`;


export const Card = styled.div`
  width: 100%;
  height: 100%;
  min-height: 650px;
  border-radius: 6px;
  background: #FFF;
  padding: 24px;
  box-shadow: 0 0 24px 0 rgba(46, 60, 88, 0.10);

  @media (max-width: 768px) {
    padding: 16px;
  }
`
