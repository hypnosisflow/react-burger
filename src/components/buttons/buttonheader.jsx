import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './button.css'

const Button = (props) => {
    return (
        <div className="button">
            <span className='text text_type_main-small'>
                {props.children}
            </span>
        </div>
    )
}

export default Button;