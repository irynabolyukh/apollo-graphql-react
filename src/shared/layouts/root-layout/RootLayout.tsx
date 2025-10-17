import { Outlet } from 'react-router-dom';
import { ContentContainer } from './RootLayout.styles';
import Header from '@/shared/ui/header';

export const RootLayout = () => {
    return (
        <>
            <Header />
            <main>
                <ContentContainer>
                    <Outlet />
                </ContentContainer>
            </main>
        </>
    );
};
