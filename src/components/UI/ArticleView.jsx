import { useStore } from '../../store/useStore'
import { blogPosts } from '../../data/blogPosts'

export function ArticleView() {
    const currentNode = useStore(state => state.currentNode)
    const setCurrentNode = useStore(state => state.setCurrentNode)
    const setActiveTerminal = useStore(state => state.setActiveTerminal)

    if (!currentNode) return null

    // Find the full post data
    const post = blogPosts.find(p => p.id === currentNode.id) || currentNode

    // Get connected posts for links
    const connections = post.connections?.map(id =>
        blogPosts.find(p => p.id === id)
    ).filter(Boolean) || []

    const handleClose = () => {
        setCurrentNode(null)
        setActiveTerminal(null)
    }

    const handleLinkClick = (linkedPost) => {
        setCurrentNode(linkedPost)
        setActiveTerminal(linkedPost.id)
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
        <div style={styles.overlay}>
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
                        <div style={styles.linkGrid}>
                            {connections.map(linked => (
                                <button
                                    key={linked.id}
                                    style={{
                                        ...styles.linkBtn,
                                        borderColor: categoryColors[linked.category] || '#ccc'
                                    }}
                                    onClick={() => handleLinkClick(linked)}
                                >
                                    <span style={styles.linkCategory}>
                                        {linked.category?.toUpperCase()}
                                    </span>
                                    <span style={styles.linkTitle}>{linked.title}</span>
                                </button>
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
        boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        zIndex: 1000,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    article: {
        padding: '24px 28px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '16px',
        marginBottom: '20px',
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
        fontSize: '18px',
        cursor: 'pointer',
        color: '#999',
        padding: '4px 8px',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1a1a1a',
        lineHeight: '1.2',
        marginBottom: '24px',
        letterSpacing: '-0.02em',
    },
    content: {
        color: '#333',
        lineHeight: '1.7',
    },
    para: {
        fontSize: '16px',
        marginBottom: '16px',
    },
    h2: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#1a1a1a',
        marginTop: '32px',
        marginBottom: '12px',
    },
    h3: {
        fontSize: '17px',
        fontWeight: '600',
        color: '#333',
        marginTop: '24px',
        marginBottom: '8px',
    },
    ul: {
        marginBottom: '16px',
        paddingLeft: '20px',
    },
    li: {
        fontSize: '16px',
        marginBottom: '8px',
    },
    connections: {
        marginTop: '40px',
        paddingTop: '24px',
        borderTop: '1px solid #e0e0e0',
    },
    connectionsTitle: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#666',
        letterSpacing: '0.05em',
        marginBottom: '16px',
    },
    linkGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    linkBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '12px 16px',
        background: '#fff',
        border: '1px solid',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s ease',
    },
    linkCategory: {
        fontSize: '10px',
        fontWeight: '600',
        color: '#888',
        letterSpacing: '0.08em',
        marginBottom: '4px',
    },
    linkTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#1a1a1a',
    },
}
