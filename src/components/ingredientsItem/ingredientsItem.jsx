import { data } from '../../utils/data';
import './ingredientsItem.css'

const IngredientsItem = () => {
   const products = data;
    return (
        <div className="list-item text text_type_main-default">
            {products.map((product) =>  (
                <div className='items' key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <span>{product.price}</span>
                  <span>{product.name}</span>
                </div>
            ))}
          
        </div>
    )
}

export default IngredientsItem; 