'use client';

import { useState, useActionState, useEffect } from 'react';
import Image from 'next/image';
import { submitContactForm } from './actions';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const handleEnvelopeClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  // Toggle body/container scroll on mobile when form opens
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('form-open');
    } else {
      document.body.classList.remove('form-open');
    }
    return () => document.body.classList.remove('form-open');
  }, [isOpen]);

  return (
    <main className={`container ${isOpen ? 'form-open' : ''}`}>
      <div className={`form-wrapper ${isOpen ? 'visible' : ''}`}>
        <div className="form-logo-box" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem', width: '100%', paddingRight: '0.5rem' }}>
          <Image src="/logonew.png" alt="Business Logo" width={400} height={120} style={{ objectFit: 'contain' }} className="responsive-form-logo" />
        </div>
        <h1 className="form-header">
          <strong>Fill</strong> <span>your Information</span>
        </h1>
        
        <form action={formAction}>
          <div className="form-row">
            <div className="form-group full-width">
              <input type="text" name="fullName" className="form-input" placeholder="Full Name" required />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <span className="form-label">if applicable</span>
              <input type="text" name="resumeId" className="form-input" placeholder="Resume ID" />
            </div>
            <div className="form-group">
              <input type="tel" name="mobileNumber" className="form-input" placeholder="Mobile Number" style={{ marginTop: 'auto' }} />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group full-width">
              <input type="email" name="emailAddress" className="form-input" placeholder="Email Address" required />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group full-width">
              <span className="form-label">Upload Resume</span>
              <input type="file" name="resumeFile" className="form-file-input" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group full-width" style={{ position: 'relative' }}>
              <select name="regarding" className="form-select" defaultValue="application-status">
                <option value="application-status">Application Status</option>
                <option value="technical-support">Technical Support</option>
                <option value="business-enquiry">Business Enquiry</option>
                <option value="feedback">Feedback</option>
                <option value="job-enquiry">Job Enquiry</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group full-width">
              <textarea name="message" className="form-textarea" placeholder="Type your Message Here" required></textarea>
            </div>
          </div>

          <p className="recaptcha-text">
            This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
          </p>

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? 'Sending...' : 'Submit'}
          </button>

          {state?.message && (
            <p style={{ marginTop: '1rem', color: state.success ? 'green' : 'red', fontWeight: 600 }}>{state.message}</p>
          )}
        </form>
      </div>

      {/* Envelope Illusion Container */}
      <div 
        className={`envelope-container ${isOpen ? 'open' : ''}`}
        onClick={handleEnvelopeClick}
        style={{
          opacity: imagesLoaded >= 4 ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out'
        }}
      >
        <div style={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          opacity: isOpen ? 0 : 1,
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease-in-out',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#f9f8f6',
          background: '#4a3f39',
          padding: '10px 24px',
          borderRadius: '30px',
          animation: 'pulse 2.5s infinite ease-in-out',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(74, 63, 57, 0.3)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          Tap to Open
        </div>
        <div className="envelope-part envelope-top">
          <div style={{ position: 'absolute', top: '5%', right: '3%', zIndex: 20 }}>
            <Image src="/logonew.png" alt="Business Logo" width={300} height={120} style={{ objectFit: 'contain' }} />
          </div>
          <div className="hq-overlay"></div>
          <div className="mobile-view" style={{position: 'absolute', width: '100%', height: '100%'}}>
            <Image 
              src="/card-mobile/uppart.jpg" 
              alt="Envelope Top Flap Mobile" 
              fill 
              sizes="100vw"
              quality={100}
              unoptimized
              style={{ objectFit: 'fill', objectPosition: 'bottom', filter: 'contrast(1.05)', imageRendering: '-webkit-optimize-contrast' }}
              priority
              onLoad={handleImageLoad}
            />
          </div>
          <div className="pc-view" style={{position: 'absolute', width: '100%', height: '100%'}}>
            <Image 
              src="/card-pc/uppart.jpg" 
              alt="Envelope Top Flap PC" 
              fill
              sizes="100vw"
              quality={100}
              unoptimized
              style={{ objectFit: 'fill', objectPosition: 'bottom', filter: 'contrast(1.05)', imageRendering: '-webkit-optimize-contrast' }}
              priority
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="envelope-part envelope-bottom">
          <div className="hq-overlay"></div>
          <div className="mobile-view" style={{position: 'absolute', width: '100%', height: '100%'}}>
            <Image 
              src="/card-mobile/down part-new.png" 
              alt="Envelope Bottom Body Mobile" 
              fill
              sizes="100vw"
              quality={100}
              unoptimized
              style={{ objectFit: 'fill', objectPosition: 'top', filter: 'contrast(1.05)', imageRendering: '-webkit-optimize-contrast' }}
              priority
              onLoad={handleImageLoad}
            />
          </div>
          <div className="pc-view" style={{position: 'absolute', width: '100%', height: '100%'}}>
            <Image 
              src="/card-pc/down part-new.png" 
              alt="Envelope Bottom Body PC" 
              fill
              sizes="100vw"
              quality={100}
              unoptimized
              style={{ objectFit: 'fill', objectPosition: 'top', filter: 'contrast(1.05)', imageRendering: '-webkit-optimize-contrast' }}
              priority
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
