import React from 'react';
import styles from './ingredientsDetails.module.css';
import {dataObject} from '../../utils/types';
import PropTypes from 'prop-types'

IngredientsDetails.propTypes = {
    item: dataObject.isRequired,
  }; 


function IngredientsDetails({ item }) {

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>
                <span className={styles.info}>Детали ингредиента</span>
            </div>
            <img src={item.image_large} alt="" />
            <span className={styles.name}>{item.name}</span>
            <div className={styles.nutrients}>
                <div className={styles.details}>
                    <span className={styles.nutrient} >Калории,ккал</span>
                    <span className={styles.detail}>{item.calories}</span>
                </div>
                <div className={styles.details}>
                    <span className={styles.nutrient}>Белки,г</span>
                    <span className={styles.detail}>{item.proteins}</span>
                </div>
                <div className={styles.details}>
                    <span className={styles.nutrient}>Жиры,г</span>
                    <span className={styles.detail}>{item.fat}</span>
                </div>
                <div className={styles.details}>
                    <span className={styles.nutrient}>Углеводы,г</span>
                    <span className={styles.detail}>{item.carbohydrates}</span>
                </div>
             
            </div>
        </div>
    )
}

export default IngredientsDetails;