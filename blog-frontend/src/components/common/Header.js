import React from 'react'; 
import styles from './Header.module.css';
import Responsive from '../Responsive'; 
import Button from './Button';  
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <div>
            <div className={styles.HeaderBlock}>
                <Responsive className={styles.Wrapper}>
                    <Link to='/' className={styles.logo}>REACTERS</Link>
                    <div className={styles.right}>
                        <Button to='/login'>로그인</Button>
                    </div>
                </Responsive>
            </div>
            <div className={styles.Spaces}/>
        </div>
    );
};

export default Header; 