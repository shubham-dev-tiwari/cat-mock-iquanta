import { GraduationCap } from 'lucide-react'

export default function AppNameLogo() {
  return (
    <div className="flex items-center space-x-3">
      <div 
        className="p-2 rounded-lg border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <img
          src="https://media.iquanta.in/ui_images/iquanta-logo-white.png"
          alt="iQuanta CAT Mock Test"
          className="h-6 w-6 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <GraduationCap className="h-6 w-6 hidden" style={{ color: '#89b4fa' }} />
      </div>
      <div>
        <h1 
          className="text-xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          CAT Mock Test
        </h1>
        <p className="text-xs" style={{ color: '#a6adc8' }}>Powered by iQuanta</p>
      </div>
    </div>
  )
}
