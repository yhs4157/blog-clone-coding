import React,{useState} from 'react'; 
import styles from './Button.module.css';
import palette from '../../lib/styles/palette';
import cn from 'classnames';
import {useNavigate} from 'react-router-dom'; 

const Button = props => {
    const {cyan, fullwidth, children, to} = props;
    const [color, setColor] = useState(palette.gray[8]);
    const [fontcolor, setFontcolor] = useState(palette.cyan[5]);
    
    const navigate = useNavigate(); 

    const onClick = e => {
        e.preventDefault(); 
        if(to) {
            navigate(to);
        }
    }

    return (
        <button 
        className={cn({[styles.Button]: !fullwidth, [styles.fullwidth]: fullwidth})} 
        style={{
            background: cyan ? fontcolor : color
        }}
        onMouseOver={() => {
            setColor(palette.gray[6])
            setFontcolor(palette.cyan[4])
        }}
        onMouseOut={() => {
            setColor(palette.gray[8])
            setFontcolor(palette.cyan[5])
        }}
        onClick = {onClick}>
            {children}
        </button>
    )
}

export default Button; 