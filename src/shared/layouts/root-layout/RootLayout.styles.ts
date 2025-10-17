import styled from 'styled-components';
import { spacing, containerWidths } from '@/shared/styles';

export const ContentContainer = styled.div`
    max-width: ${containerWidths.content};
    width: 100%;
    margin: 0 auto;
    padding: 0 ${spacing.md};
`;
