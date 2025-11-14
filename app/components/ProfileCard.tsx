'use client';

import React from 'react';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';
import './ProfileCard.css';

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'dribbble' | 'behance';
  url: string;
}

interface ProfileCardProps {
  avatarUrl?: string;
  name?: string;
  title?: string;
  description?: string;
  socialLinks?: SocialLink[];
  contactText?: string;
  contactLink?: string;
  onContactClick?: () => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl = '',
  name = 'Name',
  title = 'Title',
  description = 'Building beautiful and intuitive digital experiences. Passionate about design systems and web animation.',
  socialLinks = [],
  contactText = 'Contact Me',
  contactLink,
  onContactClick,
  className = ''
}) => {
  const handleContactClick = () => {
    if (contactLink) {
      window.location.href = contactLink;
    } else {
      onContactClick?.();
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'dribbble':
      case 'behance':
        // Using a simple circle with "D" or "B" as placeholder
        return (
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[10px] font-bold">{platform === 'dribbble' ? 'D' : 'B'}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`simple-profile-card ${className}`}>
      {/* Profile Picture */}
      <div className="profile-picture-container">
        <img
          src={avatarUrl}
          alt={name}
          className="profile-picture"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Name */}
      <h3 className="profile-name">{name}</h3>

      {/* Title */}
      {title && <p className="profile-title">{title}</p>}

      {/* Description */}
      <p className="profile-description">{description}</p>

      {/* Divider */}
      <div className="profile-divider"></div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="profile-social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-social-link"
              aria-label={link.platform}
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>
      )}

      {/* Contact Button */}
      <button
        className="profile-contact-btn"
        onClick={handleContactClick}
        type="button"
      >
        {contactText}
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ProfileCard;
