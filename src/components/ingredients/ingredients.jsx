import React from "react";
import MainLayout from "../mainlayouts/mainLayout";
import './ingredients.css';
import IngredientsGroup from "../ingredientsGroup/ingredientsGroup";
import MenuTabs from "../menuTabs/menuTabs";

const Ingredients = () => {
    return (
        <MainLayout>
            <span className="text text_type_main-large title">Соберите бургер</span>
        <MenuTabs />
        <IngredientsGroup title="БУЛКИ" />
        </MainLayout>
    )
}

export default Ingredients; 