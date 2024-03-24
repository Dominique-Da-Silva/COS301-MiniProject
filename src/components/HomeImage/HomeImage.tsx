
import { twitter } from '@assets/index';

const HomeImage = () => {
  return (
    <div className='image-container'>
        <img src={twitter} alt="Twitter home/splash page" className='full-image' />
    </div>
  );
};

export default HomeImage;