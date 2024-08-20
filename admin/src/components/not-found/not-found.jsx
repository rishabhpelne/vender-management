import notFound from "../../assets/images/notFound.png";


export function NotFound() {
    return (
        <div className="text-center mt-4">
            <h3 className="my-4">Page Not Found</h3>
            <img src={notFound} />
        </div>
    )
}