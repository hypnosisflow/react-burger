import React, {useState} from "react";
import styles from './burgerIngredients.module.css';
import IngredientsGroup from "../IngredientsGroup/ingredientsGroup";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'
import {dataType} from '../../utils/types'

BurgerIngredients.propTypes = {
    data: dataType.isRequired,
    openModal: PropTypes.func.isRequired
  }; 

function BurgerIngredients({ data, openModal }) {
    const [current, setCurrent] = useState('one');

    
    return (
        <section className={styles.ingredients}>
            <h3 className={styles.title}>
                Соберие бургер
            </h3>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинка
                </Tab>
            </div>
            <div className={styles.list}>
                <h3 className={styles.group}>Булки</h3>
                <IngredientsGroup data={data} group={"bun"} open={openModal}/>

                <h3 className={styles.group}>Начинка</h3>
                <IngredientsGroup data={data} group={"main"} open={openModal}/>

                <h3 className={styles.group}>Соусы</h3>
                <IngredientsGroup data={data} group={"sauce"} open={openModal}/>
            </div>
        </section>
    )
}

export default BurgerIngredients;