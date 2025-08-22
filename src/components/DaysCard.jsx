import Button from './Button'
import styles from './DaysCard.module.css'
const DaysCard = () => {
  return (
    <div className={styles.card}>
      <p className={styles.counter}>Дней без душноты 0</p>
      <div className={styles.buttonWrapper}>
        <Button>История</Button>
      </div>
    </div>
  )
}

export default DaysCard
