import { useEffect, useState } from "react"
import { getUsers } from "../../services/user.service"

export function Users(props) {

    const [data , setData] = useState([])
    useEffect(()=> {
        getUsersList()
    })

    function Click(user) {
       props.getUserId(user)
    }

    function getUsersList() {
        getUsers().then(res=> res.json()).then(res=> {
            setData(res)
        })
    }
    return (
        <div>
            <table className="table table-striped table-hover table-bordered">
            <thead className="table-primary">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role ID</th>
                <th>Update</th>
            </tr>
            </thead>
            <tbody>
                {
                    data && data.map((item,index)=>
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.roleId}</td>
                            <td>
                                <input type="button" onClick={()=> Click(item)}
                                className="btn btn-link" value="Update" />
                            </td>
                        </tr>
                    )
                }
            </tbody>
            </table>
        </div>
    )
}