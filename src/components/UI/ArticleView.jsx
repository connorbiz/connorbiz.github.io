import { useStore } from '../../store/useStore'
import { blogPosts } from '../../data/blogPosts'

export function ArticleView() {
    const currentNode = useStore(state => state.currentNode)
    const showArticle = useStore(state => state.showArticle)
    const setCurrentNode = useStore(state => state.setCurrentNode)
    const setActiveTerminal = useStore(state => state.setActiveTerminal)
    const setShowArticle = useStore(state => state.setShowArticle)

    // Don't render if no node selected
    if (!currentNode) return null

    // Find the full post data
    const post = blogPosts.find(p => p.id === currentNode.id) || currentNode

    // Get connected posts for links
    const connections = post.connections?.map(id =>
        blogPosts.find(p => p.id === id)
    ).filter(Boolean) || []

    const handleClose = () => {
        setShowArticle(false)
        setTimeout(() => {
            setCurrentNode(null)
            setActiveTerminal(null)
        }, 300)
    }

    const handleLinkClick = (linkedPost) => {
        // Trigger new navigation - BlogSpace will handle the animation
        setShowArticle(false)
        // The BlogNode click will handle the rest
    }

    const categoryColors = {
        'fundamentals': '#D4A574',
        'hardware': '#5B8FB9',
        'software': '#7AB97A',
        'networking': '#B97A9E',
        'memory': '#9E7AB9',
        'default': '#888888'
    }

    const accentColor = categoryColors[post.category] || categoryColors.default

    return (
        <div style={{
            ...styles.overlay,
            transform: showArticle ? 'translateX(0)' : 'translateX(100%)',
            opacity: showArticle ? 1 : 0,
        }}>
            <div style={styles.article}>
                {/* Header */}
                <div style={{...styles.header, borderColor: accentColor}}>
                    <span style={{...styles.category, color: accentColor}}>
                        {post.category?.toUpperCase()}
                    </span>
                    <button style={styles.closeBtn} onClick={handleClose}>
                        ✕
                    </button>
                </div>

                {/* Title */}
                <h1 style={styles.title}>{post.title}</h1>

                {/* Content */}
                <div style={styles.content}>
                    {post.content ? (
                        post.content.split('\n\n').map((para, i) => {
                            if (para.startsWith('## ')) {
                                return <h2 key={i} style={styles.h2}>{para.slice(3)}</h2>
                            }
                            if (para.startsWith('### ')) {
                                return <h3 key={i} style={styles.h3}>{para.slice(4)}</h3>
                            }
                            if (para.startsWith('- ')) {
                                const items = para.split('\n').filter(l => l.startsWith('- '))
                                return (
                                    <ul key={i} style={styles.ul}>
                                        {items.map((item, j) => (
                                            <li key={j} style={styles.li}>{item.slice(2)}</li>
                                        ))}
                                    </ul>
                                )
                            }
                            return <p key={i} style={styles.para}>{para}</p>
                        })
                    ) : (
                        <p style={styles.para}>{post.excerpt}</p>
                    )}
                </div>

                {/* Connected Articles */}
                {connections.length > 0 && (
                    <div style={styles.connections}>
                        <h3 style={styles.connectionsTitle}>Connected Concepts</h3>
                        <p style={styles.connectionsHint}>Click a node in the space to navigate</p>
                        <div style={styles.linkGrid}>
                            {connections.map(linked => (
                                <div
                                    key={linked.id}
                                    style={{
                                        ...styles.linkBtn,
                                        borderColor: categoryColors[linked.category] || '#ccc'
                                    }}
                                >
                                    <span style={styles.linkCategory}>
                                        {linked.category?.toUpperCase()}
                                    </span>
                                    <span style={styles.linkTitle}>{linked.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '420px',
        height: '100vh',
        backgroundColor: '#FAFAF8',
        boxShadow: '-4px 0 30px rgba(0,0,0,0.15)',
        overflowY: 'auto',
        zIndex: 1000,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
    },
    article: {
        padding: '32px 32px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '16px',
        marginBottom: '24px',
        borderBottom: '2px solid',
    },
    category: {
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.1em',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#999',
        padding: '4px 8px',
        transition: 'color 0.15s ease',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a',
        lineHeight: '1.15',
        marginBottom: '28px',
        letterSpacing: '-0.02em',
    },
    content: {
        color: '#333',
        lineHeight: '1.75',
    },
    para: {
        fontSize: '16px',
        marginBottom: '18px',
    },
    h2: {
        fontSize: '22px',
        fontWeight: '600',
        color: '#1a1a1a',
        marginTop: '36px',
        marginBottom: '14px',
    },
    h3: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        marginTop: '28px',
        marginBottom: '10px',
    },
    ul: {
        marginBottom: '18px',
        paddingLeft: '24px',
    },
    li: {
        fontSize: '16px',
        marginBottom: '10px',
    },
    connections: {
        marginTop: '48px',
        paddingTop: '28px',
        borderTop: '1px solid #e0e0e0',
    },
    connectionsTitle: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#666',
        letterSpacing: '0.05em',
        marginBottom: '8px',
    },
    connectionsHint: {
        fontSize: '12px',
        color: '#999',
        marginBottom: '16px',
    },
    linkGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    linkBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '14px 18px',
        background: '#fff',
        border: '1px solid',
        borderRadius: '8px',
        textAlign: 'left',
    },
    linkCategory: {
        fontSize: '10px',
        fontWeight: '600',
        color: '#888',
        letterSpacing: '0.08em',
        marginBottom: '4px',
    },
    linkTitle: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#1a1a1a',
    },
}
