
import styles from './App.module.css'
import Button from './components/Button.jsx'
import CarbonCard from './components/CarbonCard'
import DaysCard from './components/DaysCard.jsx'
import ImageCard from './components/ImageCard.jsx'
import MethricsCard from './components/MethricsCard.jsx'
import useGetMetrics from './hooks/useGetMetrics.js'
function App() {
  const {data, loading, error, refresh, retry} = useGetMetrics()

  return (
    <main>
      <section className={styles.section}>
        <h1 className={styles.title}>Душнила</h1>
        { loading && <p className={styles.loading}>Загрузка...</p>}
        {!loading && error && (
         
              <div className={styles.errorBlock}>
            <p  className={styles.errorText}>Ошибка, попробуйте повторить</p>
            <Button onClick={retry} >Повторить запрос</Button>
          </div>
          
        
        )}
        {!loading && !error  && data && (
          <>
          <div className={styles.wrapper}>
       
          <div className={styles.leftWrapper}>
            <CarbonCard aqi={data}/>
            <div className={styles.CardWrappers}>
              <DaysCard />
              <ImageCard />
            </div>
          </div>
        <div className={styles.rightWrapper}>
            <div className={styles.rightBlock}>
            <MethricsCard data={data} />
            
            </div>
          </div> 
          
        </div>   
          <Button onClick={retry}>{refresh ? "Обновление..." : "Обновить данные"}</Button>
           </>
            )
        }
         
      </section>
    </main>
  )
}

export default App
