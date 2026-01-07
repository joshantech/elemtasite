"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"

const previewData = {
  customSoftware: {
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=560&h=320&fit=crop",
    title: "Custom Software",
    subtitle: "Tailored solutions for your business needs",
    route: "/services/softwares",
  },
  aiAutomation: {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=560&h=320&fit=crop",
    title: "AI Automation",
    subtitle: "Streamline workflows with intelligent automation",
    route: "/services/ai",
  },
  webExperiences: {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=560&h=320&fit=crop",
    title: "Modern Web Experiences",
    subtitle: "Engaging digital experiences that convert",
    route: "/services/website",
  },
}

const styles = `
  .hover-preview-wrapper {
    width: 100%;
    position: relative;
  }

  .text-block {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #fff;
    font-weight: 400;
    letter-spacing: normal;
    font-family: 'CaviarDreams', Arial, Helvetica, sans-serif;
  }

  @media (min-width: 640px) {
    .text-block {
      font-size: 1.375rem;
    }
  }

  @media (min-width: 768px) {
    .text-block {
      font-size: 1.5rem;
    }
  }

  .text-block p {
    margin-bottom: 1.5em;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }
  
  @media (min-width: 768px) {
    .text-block p {
      margin-bottom: 1em;
    }
  }

  .text-block p:nth-child(1) { animation-delay: 0.2s; }
  .text-block p:nth-child(2) { animation-delay: 0.4s; }
  .text-block p:nth-child(3) { animation-delay: 0.6s; }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hover-link {
    color: #fff;
    font-weight: 700;
    font-family: 'CaviarDreams', Arial, Helvetica, sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
    text-decoration: none;
  }
  
  .hover-link:hover {
    color: #fff;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  
  .preview-card-link {
    text-decoration: none;
    display: block;
    cursor: pointer;
  }
  
  .preview-card-link:hover .preview-card-inner {
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(255, 255, 255, 0.15),
      0 0 80px rgba(255, 107, 107, 0.15);
    transform: scale(1.02);
  }
  
  .preview-card-inner {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .preview-card-inner {
    background: #1a1a1a;
    border-radius: 16px;
    padding: 8px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 60px rgba(255, 107, 107, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .preview-card img {
    width: 280px;
    height: auto;
    border-radius: 10px;
    display: block;
  }

  .preview-card-title {
    padding: 12px 8px 8px;
    font-size: 0.85rem;
    color: #fff;
    font-weight: 600;
    font-family: 'CaviarDreams', Arial, Helvetica, sans-serif;
  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.75rem;
    color: #666;
    font-family: 'CaviarDreams', Arial, Helvetica, sans-serif;
  }
`

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: {
  previewKey: string
  children: React.ReactNode
  onHoverStart: (key: string, e: React.MouseEvent) => void
  onHoverMove: (e: React.MouseEvent) => void
  onHoverEnd: () => void
}) => {
  const route = previewData[previewKey as keyof typeof previewData]?.route || "#"
  
  return (
    <Link
      href={route}
      className="hover-link"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </Link>
  )
}

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: (typeof previewData)[keyof typeof previewData] | null
  position: { x: number; y: number }
  isVisible: boolean
  cardRef: React.RefObject<HTMLDivElement | null>
}) => {
  if (!data) return null

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <Link href={data.route || "#"} className="preview-card-link">
        <div className="preview-card-inner">
          <img
            src={data.image || "/placeholder.svg"}
            alt={data.title || ""}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className="preview-card-title">{data.title}</div>
          <div className="preview-card-subtitle">{data.subtitle}</div>
        </div>
      </Link>
    </div>
  )
}

export function HoverPreview() {
  const [activePreview, setActivePreview] = useState<(typeof previewData)[keyof typeof previewData] | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Preload all images on mount
  useEffect(() => {
    Object.entries(previewData).forEach(([, data]) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = data.image
    })
  }, [])

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300
    const cardHeight = 280 // Approximate card height
    const offsetY = 15 // Small gap between cursor and card

    // Position card centered horizontally on cursor, directly above it
    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY

    // Boundary checks - keep card on screen horizontally
    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) {
      x = 20
    }

    // If card would go above viewport, position below cursor instead
    if (y < 20) {
      y = e.clientY + offsetY
    }

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key as keyof typeof previewData])
      setIsVisible(true)
      updatePosition(e)
    },
    [updatePosition],
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition],
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <style>{styles}</style>
      <div className="hover-preview-wrapper">
        <div className="text-block">
          <p>
            Elemta is a technology company focused on building practical, scalable{" "}
            <HoverLink
              previewKey="customSoftware"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              custom software
            </HoverLink>{" "}
            solutions for modern businesses.
          </p>

          <p>
            We specialize in{" "}
            <HoverLink
              previewKey="aiAutomation"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              AI automation
            </HoverLink>
            , and{" "}
            <HoverLink
              previewKey="webExperiences"
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
            >
              modern web experiences
            </HoverLink>{" "}
            designed to improve efficiency and support sustainable growth. 
          </p>
        </div>

        <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
      </div>
    </>
  )
}