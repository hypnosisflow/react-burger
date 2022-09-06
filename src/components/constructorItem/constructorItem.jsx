import { data } from "../../utils/data";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import './constructorItem.css';

const ConstructorItem = () => {
    const products = data;
    return (
        <div className="list-item" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map((product) => (
                <ConstructorElement
                    key={product.id}
                    text={product.name}
                    price={product.price}
                    thumbnail={product.image_mobile}
                />
            ))}      
        </div>
    )
}

export default ConstructorItem; 