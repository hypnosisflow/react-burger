import IngredientsItem from "../ingredientsItem/ingredientsItem";
import './ingredientGroup.css';
import { data } from "../../utils/data";

const IngredientsGroup = ({title}) => {
    return (
        <>
            <div className="ingredients-wrap">
            <h3 className="text text_type_main-default"> {title} </h3>
                <ul>
                    <IngredientsItem key={data.id} />
                </ul>
            </div>  
        </>
    )
}

export default IngredientsGroup;