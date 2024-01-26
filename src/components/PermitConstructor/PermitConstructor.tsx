import "./PermitConstructor.sass"
import {usePermit} from "../../hooks/permits/usePermit";
import {Link} from "react-router-dom";

const PermitConstructor = () => {

    const {permit_id} = usePermit()

    if (permit_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новый пропуск</span>
            </div>
        )
    }

    return (
        <Link to={`/permits/${permit_id}`} className="constructor-container">
            <span className="title">Новый пропуск</span>
        </Link>
    )
}

export default PermitConstructor