import './index.css'
import Card3D from './components/Card3d'
import './App.css'
import FeatureSection from './components/FeatureSection';

function App() {
  return(
    <div className = "bg-black text-white min-h-screen font-sans">
      <header className='text-center pt-12'>
        <h1 className='text-4xl font-bold'>Welcome to Poker</h1>
        <p className='text-lg mt-2'>Play Texas Hold'em like never before</p>
      </header>
      <section className='mt-8 flex justify-center'>
        <Card3D/>
      </section>

      <FeatureSection/>
    </div>
  );
};

export default App;