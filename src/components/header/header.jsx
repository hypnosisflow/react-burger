import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Button from "../buttons/buttonheader";
import NavLayout from "../navigation/navlayout";
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './header.css'


const Header = () => {
    return (
        <header className="header">
            <div className="content">
            <NavLayout>
                    <Button className="button-header">
                        <BurgerIcon/> 
                        <span className="btn-text">Конструктор</span>
                    </Button>
                    <Button>
                        <BurgerIcon/>
                        <span className="btn-text">Лента заказов</span>
                        
                    </Button>
                </NavLayout>
                <Logo />
                <Button>
                    <BurgerIcon/>
                    <span className="btn-text">Личный кабинет</span>
                </Button>
            </div>
 
        </header>
     
        
    
    )
}

export default Header; 