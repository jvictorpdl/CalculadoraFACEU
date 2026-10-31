import styled from 'styled-components';

export const Title = styled.h3`
    color: #374151;
    font-family: var(--Font-Family-title, 'Inter', sans-serif);
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: var(--Font-Line-height-line-height-28, 28px); /* 155.556% */
    letter-spacing: var(--Font-Letter-spacing-letter-spacing, 0);
    margin-bottom: 16px;

    @media (max-width: 768px) {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 8px;
    }
`;