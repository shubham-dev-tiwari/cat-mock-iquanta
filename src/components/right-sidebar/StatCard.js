export default function StatCard({ value, label }) {
  return (
    <div 
      className="rounded-lg p-3 text-center border"
      style={{ 
        backgroundColor: '#45475a',
        borderColor: '#585b70'
      }}
    >
      <div className="text-lg font-bold mb-1" style={{ color: '#cdd6f4' }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: '#a6adc8' }}>
        {label}
      </div>
    </div>
  )
}
