import "./style.module.css"
import logo from "./image/logo.jpg"
export default function Header(){
   
    
    return(
    <>
     <nav>
        <ul>
            <li><a href="homepage.html"><img src={logo} height="90%" width="50%" alt="" srcset=""/></a></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">About Us</a></li>
        </ul>
    </nav>

    <header>
        <h1>Welcome to Our Verification System</h1>
        <p>Your trusted partner in document verification</p>
    </header>

    </>)
}