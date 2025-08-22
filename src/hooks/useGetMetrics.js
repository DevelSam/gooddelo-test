import { useCallback, useEffect, useState } from 'react'
import ConverterPm25ToAqi from '../utils/ConverterPm25ToAqi'

const useGetMetrics = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [refresh, setRefresh] = useState(false)
  const FetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefresh(true)
    } else {
      setLoading(true)
    }

    try {
      const waqiRes = await fetch(
        `${import.meta.env.VITE_WAQI_BASE_URL}/feed/A472336/?token=${import.meta.env.VITE_WAQI_TOKEN}`,
      )

      const waqiJson = await waqiRes.json()

      if (waqiRes.ok && waqiJson.status === 'ok') {
        let aqi = waqiJson.data.aqi

        if (aqi === '-' || aqi == null) {
          const pm25 = waqiJson.data.iaqi?.pm25?.v ?? null
          aqi = ConverterPm25ToAqi(pm25)
        }
        setData({
          aqi: aqi,
          metrics: {
            pm25: waqiJson.data.iaqi?.pm25?.v ?? null,
            temperature: waqiJson.data.iaqi?.t?.v ?? null,
            pm10: waqiJson.data.iaqi?.pm10?.v ?? null,
            humidity: waqiJson.data.iaqi?.h?.v ?? null,
          },
          updateAt: waqiJson.data.time?.s ?? new Date().toISOString(),
        })
        setLoading(false)
        return
      }
      throw new Error('WAQI error')
    } catch (e1) {
      setData(null)
      console.error(e1)
      try {
        const sensorRes = await fetch(`${import.meta.env.VITE_SENSOR_COMMUNITY_BASE_URL}`)

        const sensorJson = await sensorRes.json()

        const samaraSensor = sensorJson.find(
          (s) => Math.hypot(s.location.latitude - 53.1959, s.location.longitude - 50.1) < 0.1,
        )

        const pm25 = samaraSensor.sensordatavalues.find((v) => v.value_type === 'P2')?.value

        const pm10 = samaraSensor.sensordatavalues.find((v) => v.value_type === 'P1')?.value

        const temperature = samaraSensor.sensordatavalues.find((v) => v.value_type === 'temperature')?.value

        const humidity = samaraSensor.sensordatavalues.find((v) => v.value_type === 'humidity')?.value
        if (samaraSensor) {
          setData({
            aqi: ConverterPm25ToAqi(pm25),
            metrics: {
              pm25: pm25 ?? null,
              temperature: temperature ?? null,
              pm10: pm10 ?? null,
              humidity: humidity ?? null,
            },
            updateAt: samaraSensor.timestamp,
          })
        } else {
          setError('Нету доступных данных')
        }
      } catch (e2) {
        console.error(e2)
        setData(null)
        setError('Ошибка загрузки данных')
      }
    } finally {
      if (isRefresh) {
        setRefresh(false)
      } else {
        setLoading(false)
      }
    }
  }, [])
  useEffect(() => {
    FetchData()
    const Interval = setInterval(() => FetchData(true), 60000)
    return () => clearInterval(Interval)
  }, [FetchData])

  return { data, loading, error, refresh, retry: FetchData }
}

export default useGetMetrics
