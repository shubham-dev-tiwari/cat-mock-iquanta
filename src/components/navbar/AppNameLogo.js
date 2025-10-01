import { GraduationCap } from 'lucide-react'

export default function AppNameLogo({ isMobile = false }) {
  return (
    <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
      <div 
        className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-lg border`}
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <img
          src="https://media.iquanta.in/ui_images/iquanta-logo-white.png"
          alt="iQuanta CAT Mock Test"
          className={`object-contain ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <GraduationCap className={`hidden ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} style={{ color: '#89b4fa' }} />
      </div>
      <div>
        <h1 
          className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}
          style={{
            background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {isMobile ? 'CAT Mock' : 'CAT Mock Test'}
        </h1>
        {!isMobile && (
          <p className="text-xs" style={{ color: '#a6adc8' }}>Powered by iQuanta</p>
        )}
      </div>
    </div>
  )
}
