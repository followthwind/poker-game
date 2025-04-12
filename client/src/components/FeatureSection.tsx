import {motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  '♠ Online Multiplayer',
  '♥ Smart Poker AI',
  '♦ Leaderboard & Profile',
  '♣ History Match',
]

export default function FeatureSection () {
  const { ref, inView} = useInView({ triggerOnce:true});

  return (
    <div ref={ref} className='flex justify-between items-center px-10 py-20 h-screen'>
      {/*placeholder menggeser kartu ke kiri */}
      <motion.div 
        initial={{ x:0}}
        animate={inView ? {x: -200} : {}}
        transition={{ duration: 1}}
        className="w-1/2"
      >
        <div className='w-48 h-64 bg-white rounded-xl shadow-lg flex items-center justify-center text-black'>
          <span className='text-2xl font-bold'>♠ A</span>
        </div>
      </motion.div>
    </div>
  )
}