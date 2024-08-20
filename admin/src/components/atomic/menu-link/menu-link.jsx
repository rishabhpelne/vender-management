import { Link } from "react-router-dom";

export function MenuLink({linkTo, className, name}) {
  return (
    <Link to={linkTo} className={className}>
      {name}
    </Link>
  );
}
