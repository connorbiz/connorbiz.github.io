import { create } from 'zustand'
import * as THREE from 'three'

export const useStore = create((set) => ({
  collectedFiles: new Set(),
  inventory: [null, null, null],
  selectedSlot: 0,
  activeTerminalId: null,

  // Hyperbolic Navigation State
  currentOrigin: new THREE.Vector3(0, 0, 0),

  // Inspection State
  currentNode: null,

  // World Data (The Tree)
  treeData: { nodes: [], links: [] },

  // Input State
  isTerminalFocused: false,

  // Camera Animation State
  isCameraAnimating: false,
  showArticle: false,

  addFile: (file) => set((state) => {
    const newCollected = new Set(state.collectedFiles)
    newCollected.add(file.name)
    const newInventory = [...state.inventory]
    const emptyIndex = newInventory.findIndex(slot => slot === null)
    if (emptyIndex !== -1) {
      newInventory[emptyIndex] = file
    }
    return { collectedFiles: newCollected, inventory: newInventory }
  }),

  selectSlot: (index) => set({ selectedSlot: index }),
  setActiveTerminal: (id) => set({ activeTerminalId: id }),

  // Navigation Actions
  setCurrentOrigin: (vector) => set({ currentOrigin: vector }),
  setCurrentNode: (nodeData) => set({ currentNode: nodeData }),
  setTreeData: (data) => set({ treeData: data }),

  // Input Actions
  setTerminalFocus: (focused) => set({ isTerminalFocused: focused }),

  // Camera Animation Actions
  setCameraAnimating: (animating) => set({ isCameraAnimating: animating }),
  setShowArticle: (show) => set({ showArticle: show }),
}))
