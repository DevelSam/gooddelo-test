import styles from './CarbonCard.module.css'
import emoji from './../assets/index-pointing-at-the-viewer_1faf5.png'
import { useEffect, useState } from 'react'
const CarbonCard = ({ aqi }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    if (aqi > 100 && aqi < 150) {
      setData({ text: 'Душнила предупреждает вас', subText: 'Co2 повышен', color: 'orange' })
    } else if (aqi > 150) {
      setData({ text: `Душнила недоволен вами`, subText: 'Co2 Превышает норму', color: 'rgba(255, 138, 122, 1)' })
    } else {
      setData({ text: 'Душнила доволен вами', subText: 'Все показатели в норме', color: 'rgba(122, 255, 167, 1)' })
    }
  }, [aqi])

  return (
    <div style={{ backgroundColor: data.color }} className={styles.Card}>
      <span className={styles.text}>
        {data.text}
        {aqi > 100 && <img className={styles.emoji} src={emoji}></img>}
      </span>
      <p className={styles.subText}>{data.subText} </p>
    </div>
  )
}

export default CarbonCard
