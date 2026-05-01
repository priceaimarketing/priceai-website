'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const PRESETS = [
  {
    key: 'book',
    label: '📅 Book a call with Padraig',
    response:
      'Great choice! You can book a free discovery call with Padraig directly here 👇\nhttps://calendly.com/padraigrice\nNo pressure, no jargon — just an honest conversation about how we can help your business grow.',
  },
  {
    key: 'services',
    label: '🚀 Our services',
    response:
      'We offer three core services:\n\n🎯 Content Creation and Social Media Management\nProfessional content that converts and strategic social media management delivered through your vision.\n\n💻 Web Design and Development\nModern websites deployed instantly. Clean design and built to convert.\n\n📈 SEO and Lead Generation\nAI-driven SEO strategies and automated lead generation systems that never clock off.\n\nWant to find out which service is right for you? Book a free call with Padraig 👉\nhttps://calendly.com/padraigrice',
  },
  {
    key: 'testimonials',
    label: '⭐ Our testimonials',
    response:
      "Here's what our clients say about us ⭐\n\n'Padraig delivered huge growth and efficiency with how we approach content at Annora. Our YouTube series and LinkedIn strategy he built alongside us has been directly responsible for bringing in multiple five-figure deals every month. If you are looking to actually convert through content, he is the person to call.'\n— Patrick Byrne, CEO, Annora AI\n\nWant results like these for your business?\nBook a free call with Padraig 👉\nhttps://calendly.com/padraigrice",
  },
]

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    content:
      "👋 Hi there! I'm Peach, PRice AI Marketing's digital assistant. How can I help you today?",
  },
  {
    role: 'assistant',
    content: 'Ask me anything or select an option below.',
  },
]

function MessageContent({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, lineIdx) => (
        <span key={lineIdx}>
          {lineIdx > 0 && <br />}
          {line.split(/(https?:\/\/[^\s]+)/).map((part, partIdx) =>
            /^https?:\/\//.test(part) ? (
              <a
                key={partIdx}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#3FB700',
                  textDecoration: 'underline',
                  wordBreak: 'break-all',
                }}
              >
                {part}
              </a>
            ) : (
              <span key={partIdx}>{part}</span>
            )
          )}
        </span>
      ))}
    </>
  )
}

function PresetButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? '#3FB700' : '#E5E5E5'}`,
        borderRadius: '10px',
        padding: '12px 16px',
        textAlign: 'left',
        cursor: 'pointer',
        color: '#1a1a1a',
        fontSize: '13px',
        fontWeight: 500,
        transition: 'border-color 0.15s',
        width: '100%',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [showPresets, setShowPresets] = useState(true)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipFading, setTooltipFading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Tooltip: show after 1.5s, hold 5s, fade 0.5s — stop if chat opened
  useEffect(() => {
    if (hasOpened) return

    const showTimer = setTimeout(() => setTooltipVisible(true), 1500)
    const fadeTimer = setTimeout(() => setTooltipFading(true), 8000) // 1.5 + 5 + 1.5 grace
    const removeTimer = setTimeout(() => {
      setTooltipVisible(false)
      setTooltipFading(false)
    }, 8500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [hasOpened])

  // Scroll to bottom on new messages / loading state
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen, messages, isLoading])

  // Focus input after presets dismissed
  useEffect(() => {
    if (isOpen && !showPresets) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [isOpen, showPresets])

  const openChat = () => {
    setIsOpen(true)
    setHasOpened(true)
    setTooltipVisible(false)
    setTooltipFading(false)
  }

  const toggleChat = () => {
    if (isOpen) setIsOpen(false)
    else openChat()
  }

  const handlePreset = (preset: (typeof PRESETS)[0]) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: preset.label },
      { role: 'assistant', content: preset.response },
    ])
    setShowPresets(false)
  }

  // Only send messages starting from the first user message to the API
  const getApiMessages = (msgs: Message[]) => {
    const firstUserIdx = msgs.findIndex((m) => m.role === 'user')
    if (firstUserIdx === -1) return []
    return msgs.slice(firstUserIdx).map((m) => ({ role: m.role, content: m.content }))
  }

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setShowPresets(false)
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: getApiMessages(updatedMessages) }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting right now. Please try again shortly.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* ── Tooltip ── */}
      {tooltipVisible && !isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '16px',
            zIndex: 9998,
            opacity: tooltipFading ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              maxWidth: '218px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              border: '1px solid #EFEFEF',
              color: '#1a1a1a',
              fontSize: '13px',
              lineHeight: '1.5',
              fontWeight: 500,
            }}
          >
            Chat with our digital assistant to help you find your way.
          </div>
          {/* Downward arrow pointing toward bubble */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '28px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #fff',
            }}
          />
        </div>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '380px',
            height: '560px',
            background: '#FFFFFF',
            border: '1px solid #E5E5E5',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#fff',
              borderBottom: '1px solid #F0F0F0',
              padding: '13px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#F0F9E8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                ✨
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#1a1a1a',
                    lineHeight: 1.2,
                  }}
                >
                  Peach
                </div>
                <div style={{ fontSize: '11.5px', color: '#999', marginTop: '2px' }}>
                  PRice AI Marketing Assistant
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: '#3FB700',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px',
                lineHeight: 1,
                flexShrink: 0,
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              background: '#FAFAFA',
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '10px 14px',
                      borderRadius:
                        msg.role === 'user'
                          ? '16px 16px 4px 16px'
                          : '4px 16px 16px 16px',
                      background: msg.role === 'user' ? '#3FB700' : '#F5F5F5',
                      color: msg.role === 'user' ? '#fff' : '#1a1a1a',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      wordBreak: 'break-word',
                    }}
                  >
                    <MessageContent text={msg.content} />
                  </div>
                </div>
                {msg.role === 'assistant' && (
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#bbb',
                      marginTop: '3px',
                      paddingLeft: '2px',
                    }}
                  >
                    Peach
                  </div>
                )}
              </div>
            ))}

            {/* Preset quick-reply buttons */}
            {showPresets && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: '4px',
                  marginBottom: '6px',
                }}
              >
                {PRESETS.map((preset) => (
                  <PresetButton
                    key={preset.key}
                    label={preset.label}
                    onClick={() => handlePreset(preset)}
                  />
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      background: '#F5F5F5',
                      borderRadius: '4px 16px 16px 16px',
                      padding: '12px 16px',
                      display: 'flex',
                      gap: '5px',
                      alignItems: 'center',
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#3FB700',
                          animation: `peachPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#bbb',
                    marginTop: '3px',
                    paddingLeft: '2px',
                  }}
                >
                  Peach
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid #F0F0F0',
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
              background: '#fff',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: '#F7F7F7',
                border: '1.5px solid #E5E5E5',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#1a1a1a',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                background: '#3FB700',
                border: 'none',
                borderRadius: '10px',
                width: '40px',
                height: '40px',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.45 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'opacity 0.2s',
              }}
              aria-label="Send message"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Bubble Button ── */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#3FB700',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(63,183,0,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(63,183,0,0.55)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(63,183,0,0.4)'
        }}
        aria-label={isOpen ? 'Close chat' : 'Open Peach chat assistant'}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes peachPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1);   }
        }
      `}</style>
    </>
  )
}
