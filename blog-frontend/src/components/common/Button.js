import React,{useState} from 'react'; 
import styles from './Button.module.css';
import palette from '../../lib/styles/palette';
import cn from 'classnames';

const Button = props => {
    const {cyan, fullwidth, children} = props;
    const [color, setColor] = useState(palette.gray[8]);
    const [fontcolor, setFontcolor] = useState(palette.cyan[5]);
    
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
        }}>
            {children}
        </button>
    )
}

export default Button; 