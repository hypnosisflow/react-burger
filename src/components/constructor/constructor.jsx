import MainLayout from "../mainlayouts/mainLayout";
import ConstructorItem from "../constructorItem/constructorItem";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import './constructor.css'

const Constructor = () => {
    return (
        <> 
            <MainLayout>
                <div className="list-wrap">
                    <ul>
                        <ConstructorItem/>
                    </ul>
                </div>
            <div className="order">
                <Button>Оформить заказ</Button>
            </div>
            </MainLayout>
        
        </>
    
    )
}

// for commit 

export default Constructor; 