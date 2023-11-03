import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const confirmation = window.confirm("Are you sure you want to logout?");
        
        if (confirmation) {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("customer_id");
            localStorage.removeItem("username");

            navigate('/')            
        } else {
            navigate(-1);
        }

    }, []);
}
export default Logout;