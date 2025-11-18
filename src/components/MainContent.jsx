"use client";

import React, { useState } from 'react'
import Copy from './animations/copy.jsx'
import ImageReveal from './animations/imageReveal.jsx'
import VideoReveal from './animations/videoReveal.jsx'
import Rolling from './animations/rolling.jsx'
import FadeInW from './animations/fadeinw.jsx'
import ReportForm from './ReportForm.jsx';
import TrailingCursor from './TrailingCursor.jsx';
import { ReactLenis } from "lenis/react";
import { mockSubmissions } from './mockdata.jsx';
import { Link } from 'react-router-dom';

function MainContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const openForm = () => {
    console.log('Opening form...');
    setIsFormOpen(true);
  };
  
  const closeForm = () => {
    console.log('Closing form...');
    setIsFormOpen(false);
  };

  const mostUrgentIssues = mockSubmissions
    .filter(issue => issue.urgency === "Critical")
    .slice(0, 3);

  if (mostUrgentIssues.length < 3) {
    const highUrgencyIssues = mockSubmissions
      .filter(issue => issue.urgency === "High" && !mostUrgentIssues.includes(issue))
      .slice(0, 3 - mostUrgentIssues.length);
    mostUrgentIssues.push(...highUrgencyIssues);
  }

  const recentComments = mockSubmissions.slice(0, 2);

  return (
    <ReactLenis root>
      <TrailingCursor/>
      <main className="main-section">
        <div className="gif-box"> 
          <ImageReveal 
            src="/images/angry.gif" 
            alt="Introductory animation about the service"
            className="video"
            animateOnScroll={true}
            delay={0}
            duration={0.4}
          />
        </div>
        
        <section className="hero">
            <div className="line-above">
              <Copy><span className="line-text">BC</span></Copy>
              <Copy><span className="line-text">YOUR</span></Copy>
              <Copy><span className="line-text">SILENCE</span></Copy>
            </div>
            <Copy delay={0.01}>
            <h1 className="title">MAKE CHANGE.</h1>
            </Copy>
            <div className="line-under">
              <Copy><span className="line-text">WONT</span></Copy>
              <Copy><span className="line-text"><span className="fix-text">FIX</span> IT</span></Copy>
            </div>
        </section>

        <div className="report-now">
          <div className="report-frame" aria-hidden="true"></div>
          <div className="submit-icon" onClick={openForm} style={{ cursor: 'pointer' }}>
          <ImageReveal 
            src="/images/arrow.png" 
            alt="Submit report"
            className="submit-image"
            animateOnScroll={true}
            delay={0}
            duration={0.5}
          />
        </div>
          <div className="submit-animation" aria-hidden="true">
            <video className="memoji" autoPlay loop muted playsInline>
              <source src="/images/memoji-animation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
            <div className="Submit-issue-text">REPORT &nbsp; YOUR &nbsp; ISSUE &nbsp; NOW &nbsp; !</div>
          
          <div className="rolling-text" aria-hidden="true"> 
            <ul>
              <li className="dot-item">✆</li>
              <li className="dot-item">REPORT</li> 
              <li className="dot-item">✆</li>
              <li className="dot-item">TRACK</li>
              <li className="dot-item">✆</li>
              <li className="dot-item">RESOLVE</li>
              <li className="dot-item">✆</li>
              <li className="dot-item">ENHANCE</li>
            </ul>
            <ul aria-hidden="true">
              <li className="dot-item">✆</li>
              <li className="dot-item">REPORT</li> 
              <li className="dot-item">✆</li>
              <li className="dot-item">TRACK</li>
              <li className="dot-item">✆</li>
              <li className="dot-item">RESOLVE</li>
              <li className="dot-item">✆</li>
              <li className="dot-item">ENHANCE</li>
            </ul>
          </div>
        </div>
        <ReportForm isOpen={isFormOpen} onClose={closeForm} />
        
        <section className="intro" aria-labelledby="about-heading">
          <div className="line-intro" aria-hidden="true">
            <Copy>
              <h2 className="about" id="about-heading">ABOUT</h2>
            </Copy>
            
            <FadeInW>
              You know the story, things break, people complain, and nothing happens. We got tired of that. This space was built so students can finally be heard. No more chasing admins or waiting weeks for small fixes. Here, your words matter. You report, we listen, and things get done. Dorm life doesn't have to be perfect — just fair, functional, and yours.
            </FadeInW>

          </div>
          <div className="video-container" aria-hidden="true">
          <VideoReveal 
              src="/images/intro.mp4" 
              alt="Introductory video"
              className="video-2"
              animateOnScroll={true}
              delay={0}
              scrub={false}
              autoPlay={true}
              muted={true}
              loop={true}
              controls={false}
            />
          </div>
        </section>

        <section className="recent-comments" aria-label="Recent comments">
          <div className="Comments-title">
            <Copy delay={0.2}> <span className="Comments-title-text">SOME</span> </Copy>
            <Copy delay={0.2}> <span className="Comments-title-text">!!s</span> </Copy>
          </div>

          <div className="comments-container">
            {recentComments.map((comment, index) => (
              <article key={comment.id} className="comment-card">
                <div className="comment-bg-wrapper">
                  <ImageReveal 
                    src={comment.problemImage} 
                    alt={comment.title}
                    className="comment-bg"
                    animateOnScroll={true}
                    delay={0}
                    duration={0.5}
                  />
                  <div className="test"> <span className='test-text'> </span> </div>
                  <div className="test">
                    <span className="test-text">{comment.problemType}</span>
                  </div>
                </div>
                <ImageReveal 
                  src={comment.user.profilePicture} 
                  alt={`Photo of ${comment.user.name}`}
                  className="user-photo"
                  animateOnScroll={true}
                  delay={0}
                  duration={0.5}
                />
                <Copy>
                  <span className="comment-month">
                    {new Date(comment.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                  </span>
                </Copy>
                <Copy delay={0.1}>
                  <span className="comment-year">{comment.year}</span>
                </Copy>
                <div className="comment-text-box">
                  <Copy delay={0.2}>
                    <p className="comment-text">{comment.description}</p>
                  </Copy>
                </div>
                <Copy delay={0.3}>
                  <span className="comment-author">
                    {comment.user.isAnonymous ? 'Anonymous' : comment.user.name}
                  </span>
                </Copy>
              </article>
            ))}
          </div>


          <Link to="/all-comments" className="see-all-link">
            <Copy>
              <span className="see-all-text">See all</span>
            </Copy>
            <div className="arrow-down" aria-hidden="true">
              <ImageReveal 
                src="/images/down-arrow.png" 
                alt=""
                className="arrow-head"
                animateOnScroll={true}
                delay={0}
                duration={0.5}
              />
            </div>
          </Link>
        </section>

        <section className="emergencies-section" aria-labelledby="emergencies-heading">
          <header className="emergencies-header">
            <Copy>
              <h2 className="emergencies-title" id="emergencies-heading">
                <span className="title-label">emergencies<br /></span>
                <span className="title-main"> Our top three issues that </span>
                <span className="title-accent">can't</span>
                <span className="title-main">&nbsp;wait. These are the problems we tackle first — because safety and comfort come before everything else</span>
              </h2>
            </Copy>
          </header>

          {mostUrgentIssues.map((issue, index) => (
            <article key={issue.id} className="emergency-card">
              <Copy>
                <span className="card-number">{(index + 1).toString().padStart(2, '0')}</span>
              </Copy>
              <Copy delay={0.1}>
                <h3 className="card-title">{issue.title}</h3>
              </Copy>
              <ImageReveal 
                src={issue.problemImage} 
                alt={issue.title}
                className="card-image"
                animateOnScroll={true}
                delay={0}
                duration={0.5}
              />
              <div className="card-description-box">
                <Copy delay={0.2}>
                  <div className="card-description">
                    {issue.description}
                  </div>
                </Copy>
                <div className="card-tags" aria-label="Tags">
                  <span className={`tag urgency-tag ${issue.urgency.toLowerCase()}`}>
                    {issue.urgency}
                  </span>
                  <span className="tag">{issue.location}</span>
                  <span className="tag">{issue.problemType}</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="emergency-cta-section" aria-labelledby="emergency-cta">
          <Copy>
            <h2 className="emergency-cta-heading" id="emergency-cta">
              <span className="cta-text-regular">EMERGENCY?</span>
              <br />
            </h2>
          </Copy>
          <h2 className="emergency-cta-heading" id="emergency-cta">
              <span className="cta-text-large">MAKE CHANGE</span>
              <br />
            </h2>
          
          <Rolling 
            className="cta-rolling-container" 
            repeat={3} 
            duration={5}
            start="top 80%"
            end="top 30%"
            scrub={true}
          >
            <div onClick={openForm} style={{ cursor: 'pointer' }}>
            <h1>
              <span className="char">
                  <div className="original-text">H</div>
                  <div className="clone-text">H</div>
              </span>
              <span className="char">
                  <div className="original-text">A</div>
                  <div className="clone-text">A</div>
              </span>
              <span className="char">
                  <div className="original-text">PP</div>
                  <div className="clone-text">PP</div>
              </span>
              <span className="char">
                  <div className="original-text">E</div>
                  <div className="clone-text">E</div>
              </span>
              <span className="char">
                  <div className="original-text">N</div>
                  <div className="clone-text">N</div>
              </span>
            </h1>
            </div>
          </Rolling>
        
            <h3 className="emergency-cta-footer">
              <span className="cta-text-large">REPORT NOW !</span>
            </h3>
          
        </section>
      </main>
    </ReactLenis>
  )
}

export default MainContent