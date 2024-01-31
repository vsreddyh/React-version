import React, { useEffect } from 'react';
import './frontpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate=useNavigate()
  useEffect(() => {

    let lastScrollTop = 0;

    const handleScroll = () => {
      const st = window.scrollY;
      const body = document.body;

      if (st > lastScrollTop && st > 0) {
        // Scrolling down, apply transitions
        body.classList.remove('scrolling-up');
      } else {
        // Scrolling up, remove transitions
        body.classList.add('scrolling-up');
      }

      lastScrollTop = st <= 0 ? 0 : st;
    };

    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const isVisible = entry.isIntersecting;

        if (isVisible) {
          // Exclude jdet and jdetimage elements from adding the active class
          if (!target.classList.contains('jdet') && !target.classList.contains('jdetimage')) {
            target.classList.add('active');
          }
        } else {
          target.classList.remove('active');
        }
      });
    }, { threshold: 0.3 });

    sections.forEach((section) => {
      observer.observe(section);
    });



    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  return (
    <div className="fpage1">
      <div className="fheader">
        <header className="fheaderset">
          <div className="fheaderset1">
            <div className="flogo">
              <div className="fflogo">
                {/* <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8"}} /> */}
                <img src='../Plogo.png' style={{ width: '35px', height: 'auto', paddingTop: '17px' }}/>
              </div>
              <div className="ftitle">
                <p>project</p>
              </div>
            </div>
            <div className="fbuttons">
              <button className="fsignup" onClick={()=>navigate('/wru')} name='signup'><p>Sign Up</p></button>
              <button className="fsignup" onClick={()=>navigate('/SignIn')} name='signin'><p>Sign In</p></button>
            </div>
          </div>
        </header>
      </div>
      <div className="fbodyy">
        <main>
          <div className="section" id="section4">
            <div className="video-container">
              <video autoPlay muted loop id="background-video">
                <source src="../Frontpage.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-overlay">
              <div>
                JOIN THE COMMUNITY OF 2500+ STUDENTS
              </div>
              <div className="aaaaa" onClick={()=>navigate('/wru')}>
                <p>Create</p>
              </div>
            </div>
          </div>
          <div className="section" id="section1">
            <div className="jdet">
              <div className="jdetimage">
                <img src="https://miro.medium.com/v2/resize:fit:1100/1*YExY4y9dZvm_ZNH4QiRCgg.png" alt="coding-journey" />
              </div>
              <div id="jdetdetail" className="jdetimage">
                <div className="jjjjj">
                  <p>Embark on your coding journey and unleash your creativity by diving into project creation</p>
                  <p>Starting coding is the key to turning your innovative ideas into tangible, real-world projects</p>
                  <p> Embrace the world of programming to bring your imagination to life and make a meaningful impact through your coding endeavors</p>
                </div>
              </div>
            </div>
          </div>
          <div className="section" id="section2">
            <div className="jdet">
              <div id="jdetdetail" className="jdetimage">
                <div className="jjjjj">
                  <p>DEPLOY YOUR PROJECTS</p>
                </div>
                <div className="aaaaa">
                  <p>Create</p>
                </div>
              </div>
              <div className="jdetimage">
                <img src="../Deploying.jpg" alt="community-students" />
              </div>
            </div>
          </div>
          <div className="section" id="section3">
            <div className="jdet">
              <div className="jdetimage">
                <img src="../Project-Management.jpg" alt="community-students" />
              </div>
              <div id="jdetdetail" className="jdetimage">
                <div className="jjjjj">
                  <p>LET OTHERS KNOW ABOUT YOUR PROJECTS</p>
                </div>
                <div className="aaaaa">
                  <p>Create</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="ffooter">
        <footer className="footer-container">
          <div className="ffele" id="fcreate">
            START DOING YOUR OWN PROJECTS NOW
          </div>
          <div className="ffele" id="ficons">
            <div className="fonline">
              <p>project</p>
              <i className="fab fa-twitter">Twitter</i>
              <i className="fab fa-facebook-f">Facebook</i>
              <i className="fab fa-instagram">Instagram</i>
              <i className="fab fa-envelope-f">Mail</i>
            </div>
            <div>
              <p>Students Registered</p>
            </div>
            <div>
              <p>Colleges Registered</p>
            </div>
            <div>
              <p>Companies Registered</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FrontPage;
