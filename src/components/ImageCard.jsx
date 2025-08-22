import logo from '../assets/logo.png'
import styles from './ImageCard.module.css'
const ImageCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.block}>
        <img src={logo} alt='' className={styles.logo} />
      </div>
    </div>
  )
}

export default ImageCard
