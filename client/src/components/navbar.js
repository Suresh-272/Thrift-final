import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/auth");
    }
    return (
        <div className = "nav">
            <Link to="/" className="site-title"> Thrift <span> Shopping</span> </Link>

            <ul>
                <li><Link className="navlink" to='/'>Thrift Collections</Link></li>
            

                
                {!cookies.access_token ? (
                    <li><Link className="navlink"to='/auth'>Login/Register</Link></li>
                ) : (   
                    <>
                    <li><Link className="navlink"to='/saved-recipes'>Cart</Link></li>
                    <button className="login-btn" onClick={logout}>Logout</button>
                    
                    </>
                )}
            </ul>

        </div>
    )
}