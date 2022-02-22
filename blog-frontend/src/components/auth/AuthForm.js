import React, {useState} from 'react'; 
import styles from './AuthForm.module.css';
import palette from '../../lib/styles/palette';
import {Link} from 'react-router-dom';
import Button from '../common/Button';

const textMap = {
    login: "로그인",
    register: "회원가입"
};

const AuthForm = props => {
    const {type, form, onChange, onSubmit} = props;
    const text = textMap[type]; 

    const boxcolor = palette.gray[8];
    const [idcolor, setIdcolor] = useState(palette.gray[5]);
    const [passwordcolor, setPasswordcolor] = useState(palette.gray[5]);
    const [footercolor, setFootercolor] = useState(palette.gray[6]);

    return (
        <div className={styles.block}>
            <h3 style={{color: boxcolor}}>{text}</h3>
            <form onSubmit={onSubmit}>
                <input
                 className={styles.Input} 
                 autoComplete="username" 
                 name="username" 
                 placeholder="아이디"
                 style={{borderBottomColor: idcolor}}
                 onFocus={() => {setIdcolor(palette.gray[7])}}
                 onBlur={() => {setIdcolor(palette.gray[5])}}
                 onChange={onChange}
                 value={form.username}
                 />
                <input 
                 className={styles.Input} 
                 autoComplete="new-password" 
                 name="password" 
                 placeholder="비밀번호"
                 type="password"
                 style={{borderBottomColor: passwordcolor}}
                 onFocus={() => {setPasswordcolor(palette.gray[7])}}
                 onBlur={() => {setPasswordcolor(palette.gray[5])}}
                 onChange={onChange}
                 value={form.password}
                 />
                {type === "register" && (
                    <input 
                     className={styles.Input} 
                     autoComplete="new-password" 
                     name="passwordConfirm" 
                     placeholder="비밀번호 확인"
                     type="password"
                     style={{borderBottomColor: passwordcolor}}
                     onFocus={() => {setPasswordcolor(palette.gray[7])}}
                     onBlur={() => {setPasswordcolor(palette.gray[5])}}
                     onChange={onChange}
                     value={form.passwordConfirm}
                    />
                )}
                <Button cyan fullwidth>{text}</Button>
            </form>
            <footer>
                {type === "login" ? (
                 <Link
                  className={styles.link}
                  onMouseOver={()=>setFootercolor(palette.gray[9])}
                  onMouseOut={()=>setFootercolor(palette.gray[6])}
                  to="/register"
                  style={{color: footercolor}}
                 >
                    회원가입
                 </Link>
                 ) : (
                 <Link
                  className={styles.link}
                  onMouseOver={()=>setFootercolor(palette.gray[9])}
                  onMouseOut={()=>setFootercolor(palette.gray[6])}
                  to="/login"
                  style={{color: footercolor}}
                 >
                     로그인
                 </Link>
                )}
            </footer>
        </div>
    );
};

export default AuthForm; 