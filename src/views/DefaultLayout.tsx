import '../assets/styles/common/global.scss';
import '../assets/styles/common/default_layout.scss';
export default function DefaultLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            {children}
        </>
    );
}