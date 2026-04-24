function SummaryBar({ foodList, getStatus }) {
  const fresh    = foodList.filter(f => getStatus(f.expiryDate) === "fresh").length;
  const expiring = foodList.filter(f => getStatus(f.expiryDate) === "expiring").length;
  const expired  = foodList.filter(f => getStatus(f.expiryDate) === "expired").length;
  const total    = foodList.length;

  
  const cx = 100, cy = 100, r = 70, stroke = 40;
  const circumference = 2 * Math.PI * r;

  function getSegments() {
    const segments = [
      { label: "Fresh",    value: fresh,    color: "#2d6a4f" },
      { label: "Expiring", value: expiring, color: "#e07b00" },
      { label: "Expired",  value: expired,  color: "#c0392b" },
    ].filter(s => s.value > 0);

    let offset = 0;
    return segments.map(s => {
      const dash = (s.value / total) * circumference;
      const gap  = circumference - dash;
      const seg = {
                    ...s,
                    dash,
                    gap,
                    offset,
                    percent: Math.round((s.value / total) * 100) 
                  };
      offset += dash;
      return seg;
    });
  }

  const segments = total > 0 ? getSegments() : [];

  return (
    <div className="summary-wrapper">

      {/* ── Stat Cards ── */}
      <div className="summary-bar">
        <div className="summary-card total">
          <span className="summary-num">{total}</span>
          <span className="summary-label">Total</span>
        </div>
        <div className="summary-card fresh">
          <span className="summary-num">{fresh}</span>
          <span className="summary-label">Fresh</span>
        </div>
        <div className="summary-card expiring">
          <span className="summary-num">{expiring}</span>
          <span className="summary-label">Expiring</span>
        </div>
        <div className="summary-card expired">
          <span className="summary-num">{expired}</span>
          <span className="summary-label">Expired</span>
        </div>
      </div>

      {/* ── Donut Chart ── */}
      <div className="chart-wrapper">
        <h3 className="chart-title">Food Status Overview</h3>

        {total > 0 ? (
          <div className="chart-container">
            {/* SVG Donut */}
            <div className="donut-wrap">
              <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx={cx} cy={cy} r={r}
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth={stroke}
                />
                {/* Colored segments */}
                {segments.map((s) => (
                  <circle
                    key={s.label}
                    cx={cx} cy={cy} r={r}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={stroke}
                    strokeDasharray={`${s.dash} ${s.gap}`}
                    strokeDashoffset={-s.offset}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                      transition: "stroke-dasharray 0.6s ease"
                    }}
                  >
                    <title>{s.label}: {s.value} ({s.percent}%)</title>
                  </circle>
                ))}
              </svg>
              {/* Center text */}
              <div className="donut-center">
                <span className="donut-num">{total}</span>
                <span className="donut-label">
                  {total > 0 ? "Total Items" : ""}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="chart-legend">
              {[
                { label: "Fresh",    value: fresh,    color: "#2d6a4f" },
                { label: "Expiring", value: expiring, color: "#e07b00" },
                { label: "Expired",  value: expired,  color: "#c0392b" },
              ].map(item => (
                <div key={item.label} className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: item.color }}
                  />
                  <span className="legend-text">{item.label}</span>
                  <span className="legend-count">
                    {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="chart-empty">
            Add items to see chart
          </div>
        )}
      </div>

    </div>
  );
}

export default SummaryBar;