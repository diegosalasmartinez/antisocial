import { colors } from './colors'

const loading = <div className='loading'>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>

const loadingFallback = <div style={{height: '100vh', backgroundColor: colors.PRIMARY}}></div>

export {
  loading,
  loadingFallback
}