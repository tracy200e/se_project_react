import avatar from "../../images//avatar.svg";
import "./SideBar.css";

const SideBar = () => {
    return (
        <div>
            <div className="side-bar">
                <img src={avatar} alt="profile-pic" />
                <div>Tracy Chen</div>
            </div>
        </div>
    )
}

export default SideBar;