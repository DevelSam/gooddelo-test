import priorityMetrics from '../constants/priorityMetrics'
import styles from './MethricsCard.module.css'
const MethricsCard = ({ data }) => {
  let Color = 'white'

  if (data.aqi > 100 && data.aqi < 150) {
    Color = 'orange'
  } else if (data.aqi >= 150) {
    Color = 'rgba(255, 138, 122, 0.6)'
  } else if (data.aqi >= 0 && data.aqi <= 100) {
    Color = 'rgba(0, 255, 87, 0.6)'
  }
  const values = priorityMetrics
    .map((el) => ({ ...el, value: data.metrics?.[el.key] }))
    .filter((el) => el.value !== null)
    .slice(0, 2)

  const updateAt = data?.updateAt ? new Date(data.updateAt) : null

  const minutesAgo = updateAt ? Math.floor((Date.now() - updateAt.getTime()) / 60000) : null

  return (
    <div style={{ background: `linear-gradient(135deg, white, ${Color} 150%)` }} className={styles.card}>
      {values.length > 0 ? (
        values.map((el) => (
          <div key={el.key} className={styles.methricsBlock}>
            <p className={styles.title}>
              {' '}
              {el.value !== undefined && !isNaN(Number(el.value)) ? Number(el.value).toFixed(1) : '—'} {el.unit}
            </p>
            <p className={styles.text}>{el.label}</p>
          </div>
        ))
      ) : (
        <p className={styles.title}>Нету данных</p>
      )}
      {minutesAgo !== null && (
        <p>Последние обновление данных {minutesAgo === 0 ? 'только что' : `${minutesAgo} мин назад`} </p>
      )}
    </div>
  )
}

export default MethricsCard
