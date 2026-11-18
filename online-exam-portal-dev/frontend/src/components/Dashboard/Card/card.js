import React from "react";
import "../Main/dashboard.css";

// Thẻ thống kê: số đang hoạt động / tổng, thanh tỉ lệ, và khu vực nút bấm (children)
export const MainCard = ({ title, value = 0, total = 0, icon, selected, children }) => {
  const active = Number(value) || 0;
  const all = Number(total) || 0;
  const blocked = Math.max(all - active, 0);
  const percent = all > 0 ? Math.round((active / all) * 100) : 0;

  return (
    <section className={"dash-card" + (selected ? " dash-card--selected" : "")}>
      <div className="dash-card__top">
        <div>
          <h2 className="dash-card__title">{title}</h2>
          <div className="dash-card__count">
            <span className="dash-card__value">{active}</span>
            <span className="dash-card__total">/ {all}</span>
          </div>
        </div>
        <div className="dash-card__icon" aria-hidden="true">{icon}</div>
      </div>

      <div
        className="dash-card__bar"
        role="img"
        aria-label={`${active} active of ${all}`}
      >
        <div className="dash-card__bar-fill" style={{ width: percent + "%" }} />
      </div>
      <p className="dash-card__note">
        {active} active · {blocked} blocked
      </p>

      <div className="dash-card__actions">{children}</div>
    </section>
  );
};
