import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuLink } from "../../atomic/menu-link/menu-link";

export function ServiceRequestItem() {
   
    const {id} = useParams();

    const [data , setData] = useState({})

        useEffect(()=> {
            getServiceRequestData()
        },[])

    function getServiceRequestData() {
        const url = "http://localhost:4000/serviceRequests/" + id;
        fetch(url).then(res => res.json()).then((item)=> {
          setData(item)
        })
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3>Service Request for <u>{data.name}</u> 
                <MenuLink linkTo="/service-requests" className="btn btn-link" name="Back" />
                </h3>
            </div>
            <div className="card-body">
                <div>{data.id}</div>
                <div>{data.name}</div>
                <div>{data.description}</div>
                <div>{data.startDate}</div>
                <div>{data.endDate}</div>
                <div>{data.active}</div>
            </div>
           
        </div>
    )
}