import './navLayout.css';

const NavLayout = (props) => {
    return (
        <div className="nav">
            {props.children}
        </div>
    )
}

export default NavLayout