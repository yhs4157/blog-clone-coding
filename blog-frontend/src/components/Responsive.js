import React from 'react'; 
import styles from './Responsive.module.css'; 

const Responsive = ({children, ...rest}) => {
    return <div className={styles.ResponsiveBlock} {...rest}>{children}</div>
}

export default Responsive; 