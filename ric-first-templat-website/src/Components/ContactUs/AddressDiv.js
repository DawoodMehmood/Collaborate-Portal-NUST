import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function AddressDiv({icon, text}) {
    return (
        <div className={"address-div"}>
            <h3><FontAwesomeIcon icon={icon} className={"address-icon"}/></h3>
            <h5>{text}</h5>
        </div>
    )
}