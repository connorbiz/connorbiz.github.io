import { useStore } from '../store/useStore'
import * as THREE from 'three'

export function useCommandSystem() {
    const treeData = useStore(state => state.treeData)
    const currentNode = useStore(state => state.currentNode)
    const setCurrentNode = useStore(state => state.setCurrentNode)
    const setCurrentOrigin = useStore(state => state.setCurrentOrigin)

    const execute = (commandStr, terminal) => {
        const args = commandStr.trim().split(' ')
        const cmd = args[0].toLowerCase()

        switch (cmd) {
            case 'help':
                terminal.addLine('AVAILABLE COMMANDS:', '#ffff00')
                terminal.addLine('  ls          List connected nodes and files', '#ffffff')
                terminal.addLine('  ssh <id>    Connect/Travel to a node ID', '#ffffff')
                terminal.addLine('  cat <file>  Read a file', '#ffffff')
                terminal.addLine('  clear       Clear terminal', '#ffffff')
                break

            case 'clear':
                terminal.clearContent()
                break

            case 'ls':
                if (!currentNode) {
                    terminal.addLine('ERROR: Not connected to any node.', '#ff0000')
                    terminal.addLine('Use "ssh <id>" to connect to a root node.', '#aaaaaa')
                    // List root nodes as a hint
                    const roots = treeData.nodes.filter(n => n.level === 0)
                    if (roots.length > 0) {
                        terminal.addLine('Visible Networks:', '#00ffff')
                        roots.forEach(r => terminal.addLine(`  ${r.id} (${r.label})`, '#00ffff'))
                    }
                    return
                }

                terminal.addLine(`CONTENTS OF ${currentNode.id}:`, '#00ff00')

                // Find children/neighbors
                const connectedLinks = treeData.links.filter(l => l.source === currentNode.id || l.target === currentNode.id)
                const neighbors = connectedLinks.map(l => {
                    const otherId = l.source === currentNode.id ? l.target : l.source
                    return treeData.nodes.find(n => n.id === otherId)
                }).filter(Boolean)

                if (neighbors.length > 0) {
                    terminal.addLine('CONNECTIONS (NODES):', '#00ffff')
                    neighbors.forEach(n => {
                        terminal.addLine(`  ${n.id}  [${n.label}]`, '#00aaaa')
                    })
                }

                // Mock files
                terminal.addLine('FILES:', '#ff00ff')
                terminal.addLine(`  manifest_${currentNode.id}.dat`, '#ffffff')
                terminal.addLine(`  protocol.exe`, '#ffffff')
                break

            case 'ssh':
                if (args.length < 2) {
                    terminal.addLine('Usage: ssh <node_id>', '#ff0000')
                    return
                }
                const targetId = args[1]
                const targetNode = treeData.nodes.find(n => n.id === targetId)

                if (targetNode) {
                    terminal.addLine(`ESTABLISHING CONNECTION TO ${targetId}...`, '#00ff00')
                    // Trigger Navigation
                    setCurrentNode(targetNode)
                    setCurrentOrigin(targetNode.pos) // Mobius Warp

                    // Terminal will update via TabletHUD effect, but we can add a message here too
                    setTimeout(() => {
                        terminal.clearContent()
                        terminal.addLine(`ACCESS GRANTED: ${targetNode.label}`, '#00ff00')
                    }, 500)
                } else {
                    terminal.addLine(`ERROR: Host '${targetId}' not found.`, '#ff0000')
                }
                break

            case 'cat':
                terminal.addLine('Access Denied: Encrypted content.', '#ff0000')
                break

            default:
                terminal.addLine(`Command not found: ${cmd}`, '#ff0000')
        }
    }

    return { execute }
}
