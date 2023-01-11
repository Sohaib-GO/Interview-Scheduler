import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function () {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };
    return (
      <li onClick={() => props.setDay(props.name)}>
        <h2 className={dayClass}>{props.name}</h2>
        <h3 className={dayClass}>{formatSpots()}</h3> 
      </li>
    );
  };

