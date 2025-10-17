import styled from 'styled-components';
import { containerWidths } from '@/shared/styles';

interface ContainerProps {
    $maxWidth?: keyof typeof containerWidths;
}

export const Container = styled.div<ContainerProps>`
    max-width: ${({ $maxWidth = 'content' }) => containerWidths[$maxWidth]};
    margin: 0 auto;
    width: 100%;
`;

