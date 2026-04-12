'use client';

import { useState, useActionState, useEffect } from 'react';
import Image from 'next/image';
import { submitContactForm } from './actions';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dobValue, setDobValue] = useState('');
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // On mobile only 2 images render (mobile-view), on desktop all 4 render
  const requiredImages = isMobile ? 2 : 4;

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

        {/* Header */}
        <div className="form-logo-box" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem', width: '100%', paddingRight: '0.5rem' }}>
          <Image src="/logonew.png" alt="Business Logo" width={400} height={120} style={{ objectFit: 'contain' }} className="responsive-form-logo" />
        </div>
        <h1 className="form-header">
          <strong>Fill</strong> <span>your Details</span>
        </h1>
        <p className="form-subheader">Fill in your details below and we&apos;ll get back to you shortly.</p>

        <form action={formAction} className="form-card">

          {/* Section: Personal Info */}
          <div className="form-section-label">Personal Information</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-field-label">Full Name <span className="required-star">*</span></label>
              <input type="text" name="fullName" className="form-input" placeholder="e.g. John Smith" required />
            </div>
            <div className="form-group">
              <label className="form-field-label">Ref Name</label>
              <input type="text" name="refName" className="form-input" placeholder="Referred by.." />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-field-label">Date of Birth <span className="required-star">*</span></label>
              {/* Overlay: transparent date input sits on top; visible div shows placeholder/value */}
              <div className="date-field-wrapper">
                <span className={`date-placeholder-text${dobValue ? ' has-value' : ''}`}>
                  {dobValue
                    ? new Date(dobValue + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : 'DD / MM / YYYY'}
                </span>
                <input
                  type="date"
                  name="dob"
                  className="date-overlay-input"
                  required
                  onClick={(e) => {
                    try {
                      if ('showPicker' in HTMLInputElement.prototype) {
                        (e.target as HTMLInputElement).showPicker();
                      }
                    } catch (err) {
                      // ignore err
                    }
                  }}
                  onChange={(e) => setDobValue(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-field-label">Place <span className="required-star">*</span></label>
              <input type="text" name="place" className="form-input" placeholder="City / Country" required />
            </div>
          </div>

          <div className="form-divider" />

          {/* Section: Professional Info */}
          <div className="form-section-label">Professional Details</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-field-label">Position <span className="required-star">*</span></label>
              <input type="text" name="position" className="form-input" placeholder="e.g. Marine Engineer" required />
            </div>
            <div className="form-group">
              <label className="form-field-label">Experience <span className="required-star">*</span></label>
              <input type="text" name="experience" className="form-input" placeholder="e.g. 3 years" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-field-label">Resume ID <span className="form-label-hint">(if applicable)</span></label>
              <input type="text" name="resumeId" className="form-input" placeholder="Resume ID" />
            </div>
            <div className="form-group">
              <label className="form-field-label">Mobile Number</label>
              <input type="tel" name="mobileNumber" className="form-input" placeholder="+91 00000 00000" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-field-label">Email Address <span className="required-star">*</span></label>
              <input type="email" name="emailAddress" className="form-input" placeholder="you@email.com" required />
            </div>
          </div>

          <div className="form-divider" />

          {/* Section: Documents */}
          <div className="form-section-label">Documents</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-field-label">Documents (Single PDF)</label>
              <label className="file-upload-box">
                <span className="file-upload-icon">📎</span>
                <span className="file-upload-text">Choose PDF</span>
                <input type="file" name="documentsPdf" className="form-file-hidden" accept=".pdf" />
              </label>
            </div>
            <div className="form-group">
              <label className="form-field-label">Passport Size Photo</label>
              <label className="file-upload-box">
                <span className="file-upload-icon">🖼️</span>
                <span className="file-upload-text">Choose Image</span>
                <input type="file" name="passportPhoto" className="form-file-hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div className="form-divider" />

          {/* Section: Message */}
          <div className="form-section-label">Your Message</div>

          <div className="form-row">
            <div className="form-group full-width" style={{ position: 'relative' }}>
              <label className="form-field-label">Regarding</label>
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
              <label className="form-field-label">Message <span className="required-star">*</span></label>
              <textarea name="message" className="form-textarea" placeholder="Type your message here..." required></textarea>
            </div>
          </div>

          <p className="recaptcha-text">
            This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
          </p>

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? 'Sending...' : 'Submit'}
          </button>

          {state?.message && (
            <p style={{ marginTop: '1rem', color: state.success ? '#2d6a4f' : '#c0392b', fontWeight: 600, fontSize: '0.95rem' }}>{state.message}</p>
          )}
        </form>
      </div>


      {/* Envelope Illusion Container */}
      <div 
        className={`envelope-container ${isOpen ? 'open' : ''}`}
        onClick={handleEnvelopeClick}
        style={{
          opacity: imagesLoaded >= requiredImages ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out'
        }}
      >
        <div className="tap-to-open" style={{ opacity: isOpen ? 0 : 1 }}>
          Tap to Open
        </div>
        <div className="envelope-part envelope-top">
          <div className="envelope-logo-container" style={{ position: 'absolute', top: '5%', right: '3%', zIndex: 20 }}>
            <Image src="/logonew.png" alt="Business Logo" width={300} height={120} className="envelope-logo" style={{ objectFit: 'contain' }} />
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
