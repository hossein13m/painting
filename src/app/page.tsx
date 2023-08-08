import Footer from './components/footer';
import Painting from './components/painting';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Painting />
            <Footer />
        </div>
    );
}
