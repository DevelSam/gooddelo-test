import styles from './Button.module.css'
const Button = ({ children, className, ...attributes }) => {
  return (
    <button {...attributes} className={`${styles.button} ${className ? className : ''}`}>
      {children}
      <svg width='28' height='29' viewBox='0 0 28 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          className={styles.arrow}
          d='M24.5 14.8252L18.6667 8.99188M24.5 14.8252L18.6667 20.6585M24.5 14.8252H3.5'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  )
}

export default Button
