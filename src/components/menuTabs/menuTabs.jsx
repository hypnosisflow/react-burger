import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const MenuTabs = () => {
    const [current, setCurrent] = React.useState('one')

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    БУЛКИ
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    СОУСЫ
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    НАЧИНКА
                </Tab>
            </div>
        </>
    )
}

export default MenuTabs;