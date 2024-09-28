import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css"
import img1 from "./image/images1.jpeg"
import img2 from "./image/Image2.jpg"
import img3 from "./image/Image3.jpeg"
import img4 from "./image/student-alumni.jpg"
import img5 from "./image/educational-institue.jpg"
import img6 from "./image/e-verify.jpg"
import img7 from "./image/screening-agency.jpg"
export default function Admin(){
    const navi = useNavigate()
    return(
        <>
        <Header/>
        <main>
        <div className={styles.buttoncontainer}>
            <button onClick={()=>navi('/admin-auth')} className={styles.btnadmin} >Admin Authentication</button>
        </div>
        <section className={styles.features}>
            <div className={styles.feature}>
                <img src={img1} alt="Feature 1"/>
                <h3>Secure Verification</h3>
                <p>Experience the highest level of security in document verification.</p>
            </div>
            <div className={styles.feature}>
                <img src={img2} alt="Feature 2"/>
                <h3>Global Access</h3>
                <p>Access our services from anywhere in the world, anytime.</p>
            </div>
            <div className={styles.feature}>
                <img src={img3} alt="Feature 3"/>
                <h3>Efficient Processing</h3>
                <p>Get your documents verified quickly and efficiently.</p>
            </div>
        </section>
    </main>

    <section className={styles.servicessection}>
        <h2>Our Services</h2>
        <div className={styles.servicescontainer}>
            <div className={styles.servicecard}>
                <div className={styles.serviceoverlay}></div>
                <img src={img4} alt="Students/Alumni"/>
                <div className={styles.servicecontent}>
                    
                    <p>Students/Alumni</p>
                </div>
            </div>
            <div className={styles.servicecard}>
                <div className={styles.serviceoverlay}></div>
                <img src={img5}alt="Educational Institutions"/>
                <div className={styles.servicecontent}>
                  
                    <p>Educational Institutions</p>
                </div>
            </div>
            <div className={styles.servicecard}>
                <div className={styles.serviceoverlay}></div>
                <img src={img6} alt=""/>
                <div className={styles.serviceoverlay}>
                    
                    <p>E-Verify for Secretariat/HRD Attestation</p>
                </div>
            </div>
            <div className={styles.servicecard}>
                <div className={styles.serviceoverlay}></div>
                <img src={img7} alt="Background Screeners"/>
                <div className={styles.servicecontent}>
                   
                    <p>Background Screeners</p>
                </div>
            </div>
        </div>
    </section>

        
        <Footer/>
        </>
    )
}
