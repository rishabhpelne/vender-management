import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuLink } from "../atomic/menu-link/menu-link";

 function ServiceRequest() {
    const [data , setData] = useState([])

        useEffect(()=> {
            getServiceRequestData()
        },[])

        function getServiceRequestData() {
            const url = "http://localhost:4000/serviceRequests/";
            fetch(url).then(res => res.json()).then((item)=> {
              setData(item)
            })
        }
    return (
        <div>
            <h3>Requested Service</h3>
            <table className="table table-stripped table-bordered table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Active</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(bindData)
                    }
                </tbody>
            </table>
        </div>
    )

    function bindData(item , index ,arr) {
                    return    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.type}</td>
                        <td>{item.name}</td>
                        <td style={{width: "400px"}}>{item.description}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.active}</td>
                        <td>
                            {/* <Link to={"/service-request/" + item.id} >View Details</Link> */}
                            <MenuLink linkTo={"/service-request/" + item.id} className="btn btn-link" 
                            name="view Details" />
                        </td>
                    </tr>
    }

}

export default ServiceRequest;