import { Menu } from "./menu/menu";

export function Layout(props) {
    return (
        <div className="row">
            <div className="col-2">
            <Menu />
            </div>
            <div className="col-10">
                {
                    props.children
                }
            </div>
        </div>
    )
}