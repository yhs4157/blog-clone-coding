import React from 'react'; 
import styles from './AuthTemplate.module.css';
import palette from '../../lib/styles/palette';
import {Link} from 'react-router-dom';

const AuthTemplate = props => {
    const {children} = props
    return (
        <div className={styles.template} style={{background: palette.gray[2]}}>
            <div className={styles.whiteBox}>
                <div className={styles.logoArea}>
                    <Link to="/">REACTERS</Link>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthTemplate; 