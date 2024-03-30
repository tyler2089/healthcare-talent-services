import "../styles/about.css";
import Fade from "react-reveal/Fade";
import setHomePageOption from "../actions/homepageoption";
import { useDispatch } from "react-redux";
import animateHeader from "../components/animateheader";
function AboutUs() {
  const dispatch = useDispatch();
  return (
    <div className="about-container">
      <div className="about-header">
        {animateHeader("About Healthcare Talent Services")}
      </div>

      <Fade right cascade>
        <div className="about-section">
          <h1>Who we are</h1>
          <p>
            Healthcare Talent Services is your strategic partner in talent
            acquisition. Our expertise lies in understanding the unique demands
            of the financial services industry, allowing us to deliver
            unparalleled recruitment solutions.
          </p>
          <h2>Here&#39;s why we stand out</h2>
          <ul>
            <li>
              <span className="about-highlight">Industry Insight:</span> Our
              team comprises seasoned industry experts and recruitment
              specialists who posess in-depth knowledge of the financial
              services Industry. This expertise enables us to tailor our
              approach to meet the specific requirements of our clients.
            </li>
            <li>
              <span className="about-highlight">Personalized Approach:</span> We
              recognize that every client and candidate is unique. Our
              personalized approach involves understanding your
              organization&#39;s culture, values, and specific hiring needs.
              This ensures a perfect match between talent and opportunity.
            </li>
            <li>
              <span className="about-highlight">Extensive Network:</span>
              Leveraging our extensive network of professionals within the
              financial services realm, we can quickly connect you with
              qualified candidates who possess the skills and experience
              necessary to drive your business forward.
            </li>
            <li>
              <span className="about-highlight">Cutting-edge Technology:</span>
              Healthcare Talent Services utilizes cutting-edge recruitment
              technology to streamline the hiring process. Our efficient and
              effective solutions save you time and resources.
            </li>
            <li>
              <span className="about-highlight">Commitment to Excellence:</span>
              Unwavering commitment to excellence is reflected in maintaining
              the highest standards of professionalism, integrity, and
              confidentiality throughout the recruitment process. We take pride
              in maintaining the highest standards of professionalism,
              integrity, and confidentiality throughout the recruitment process.
            </li>
            <p>
              Whether you&#39;re seeking top talent or exploring new career
              opportunities, Healthcare Talent Services is here to support your
              success.
            </p>
          </ul>

          <div className="about-buttons">
            <h1 onClick={() => dispatch(setHomePageOption("jobsearch"))}>
              Search Jobs
            </h1>
            <h1 onClick={() => dispatch(setHomePageOption("employer"))}>
              Find talent
            </h1>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default AboutUs;
