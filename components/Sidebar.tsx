'use client'

interface SidebarProps {
  searchType: string
  onSearchTypeChange: (type: string) => void
}

export default function Sidebar({ searchType, onSearchTypeChange }: SidebarProps) {
  const searchTypes = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'web', label: 'Web', icon: '📄' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'audio', label: 'Audio', icon: '🎵' },
    { id: 'image', label: 'Image', icon: '🖼️' },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-strong z-50 p-6">
      <div className="text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">Aula</h2>
        <p className="text-sm text-white/70">Choose search type</p>
      </div>

      <div className="space-y-2">
        {searchTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSearchTypeChange(type.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              searchType === type.id
                ? 'glass-strong bg-white/20'
                : 'glass hover:bg-white/10'
            }`}
          >
            <span className="text-2xl">{type.icon}</span>
            <span className="text-white font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/20">
        <p className="text-xs text-white/50">
          Powered by Aula Search Technology
        </p>
      </div>
    </div>
  )
}

