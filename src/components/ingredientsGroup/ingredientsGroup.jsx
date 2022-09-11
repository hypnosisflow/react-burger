import React, { useState } from "react";
import styles from './ingredientsGroup.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
import {dataType} from '../../utils/types'

IngredientsGroup.propTypes = {
    data: dataType.isRequired,
    open: PropTypes.func.isRequired,
    group: PropTypes.string.isRequired
  }; 

function IngredientsGroup({ data, group, open }) {
    const filteredItems = data.filter((item) => {
        return item.type === group;
    })
    return (
        <>     
            <ul className={styles.group}>
                {filteredItems.map((item) => (
                     <li 
                        key={item._id} 
                        onClick={() => open({ item, name: 'ingredient'})} 
                        className={styles.item}
                     >
                     <Counter count={1} size="default" />
                     <img src={item.image} alt="" />
                     <div className={styles.price}>
                         <span className="text text_type_digits-default">{item.price}</span>
                         <CurrencyIcon className={styles.icon} type="primary" />    
                     </div>
                         <span className={styles.name}>{item.name}</span> 
                    </li>
                ))}
            </ul>
        </>
    )
}
export default IngredientsGroup;

